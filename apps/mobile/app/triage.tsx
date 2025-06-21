import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { usePendingTasks, useApproveTask, useRejectTask, useApproveAndCompleteTask } from '../hooks/useApi';
import { Task } from '../lib/api';
import { format, parseISO } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

export default function Triage() {
  const { data: pendingTasks, isLoading, error, refetch } = usePendingTasks();
  const approveTaskMutation = useApproveTask();
  const rejectTaskMutation = useRejectTask();
  const approveAndCompleteMutation = useApproveAndCompleteTask();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const position = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const forceSwipe = (direction: 'right' | 'left' | 'up') => {
    const x = direction === 'right' ? screenWidth : direction === 'left' ? -screenWidth : 0;
    const y = direction === 'up' ? -screenWidth : 0;
    
    Animated.timing(position, {
      toValue: { x, y },
      duration: 250,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = async (direction: 'right' | 'left' | 'up') => {
    const currentTask = pendingTasks?.[currentIndex];
    if (!currentTask) return;

    try {
      switch (direction) {
        case 'right':
          await approveTaskMutation.mutateAsync(currentTask.id);
          break;
        case 'left':
          await rejectTaskMutation.mutateAsync(currentTask.id);
          break;
        case 'up':
          await approveAndCompleteMutation.mutateAsync(currentTask.id);
          break;
      }
      
      // Move to next card
      setCurrentIndex(prev => prev + 1);
      position.setValue({ x: 0, y: 0 });
      opacity.setValue(1);
      
      // If this was the last card, navigate back
      if (currentIndex + 1 >= (pendingTasks?.length ?? 0)) {
        setTimeout(() => router.back(), 500);
      }
    } catch (error) {
      console.error('Swipe action failed:', error);
      Alert.alert('Error', 'Failed to process task. Please try again.');
      resetPosition();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        
        // Opacity effect based on distance
        const distance = Math.sqrt(gesture.dx * gesture.dx + gesture.dy * gesture.dy);
        const newOpacity = Math.max(0.6, 1 - distance / 300);
        opacity.setValue(newOpacity);
      },
      onPanResponderRelease: (_, gesture) => {
        const { dx, dy } = gesture;
        
        // Reset opacity
        Animated.spring(opacity, { toValue: 1, useNativeDriver: false }).start();
        
        // Determine swipe direction
        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal swipe
          if (dx > SWIPE_THRESHOLD) {
            forceSwipe('right');
          } else if (dx < -SWIPE_THRESHOLD) {
            forceSwipe('left');
          } else {
            resetPosition();
          }
        } else {
          // Vertical swipe
          if (dy < -SWIPE_THRESHOLD) {
            forceSwipe('up');
          } else {
            resetPosition();
          }
        }
      },
    })
  ).current;

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-screenWidth, 0, screenWidth],
      outputRange: ['-10deg', '0deg', '10deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
      opacity,
    };
  };

  const currentTask = pendingTasks?.[currentIndex];

  const formatTaskDue = (dueDate: string) => {
    try {
      return format(parseISO(dueDate), 'MMM d, yyyy');
    } catch {
      return dueDate;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load tasks</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!pendingTasks?.length || currentIndex >= pendingTasks.length) {
    return (
      <View style={styles.completedContainer}>
        <Ionicons name="checkmark-circle" size={80} color="#34C759" />
        <Text style={styles.completedTitle}>All caught up!</Text>
        <Text style={styles.completedSubtitle}>
          No pending tasks to triage
        </Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Triage</Text>
        <Text style={styles.progressText}>
          {currentIndex + 1} of {pendingTasks?.length}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <Animated.View
          style={[styles.card, getCardStyle()]}
          {...panResponder.panHandlers}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.emailSubject}>
              {currentTask?.emailId ? 'From Email' : 'New Task'}
            </Text>
          </View>

          <ScrollView style={styles.cardContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.taskTitle}>{currentTask?.title}</Text>
            
            {currentTask?.description && (
              <Text style={styles.taskDescription}>{currentTask.description}</Text>
            )}
            
            {currentTask?.dueDate && (
              <View style={styles.dueDateContainer}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.dueDate}>
                  Due: {formatTaskDue(currentTask.dueDate)}
                </Text>
              </View>
            )}
            
            <View style={[
              styles.urgencyBadge,
              currentTask?.urgency === 'high' ? styles.highUrgency :
              currentTask?.urgency === 'medium' ? styles.mediumUrgency :
              styles.lowUrgency
            ]}>
              <Text style={styles.urgencyText}>
                {currentTask?.urgency.toUpperCase()}
              </Text>
            </View>
          </ScrollView>

          {/* Swipe Instructions */}
          <View style={styles.swipeInstructions}>
            <View style={styles.swipeInstruction}>
              <View style={[styles.swipeIcon, { backgroundColor: '#FF3B30' }]}>
                <Ionicons name="close" size={16} color="white" />
              </View>
              <Text style={styles.swipeText}>Swipe left to reject</Text>
            </View>
            <View style={styles.swipeInstruction}>
              <View style={[styles.swipeIcon, { backgroundColor: '#007AFF' }]}>
                <Ionicons name="checkmark-done" size={16} color="white" />
              </View>
              <Text style={styles.swipeText}>Swipe up to complete</Text>
            </View>
            <View style={styles.swipeInstruction}>
              <View style={[styles.swipeIcon, { backgroundColor: '#34C759' }]}>
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <Text style={styles.swipeText}>Swipe right to approve</Text>
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={styles.actionButtons}>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => forceSwipe('left')}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => forceSwipe('up')}
          >
            <Ionicons name="checkmark-done" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => forceSwipe('right')}
          >
            <Ionicons name="checkmark" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  completedSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: screenWidth - 32,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '70%',
  },
  cardHeader: {
    marginBottom: 16,
  },
  emailSubject: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  cardContent: {
    flex: 1,
    marginBottom: 16,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    lineHeight: 26,
  },
  taskDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  urgencyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  highUrgency: {
    backgroundColor: '#FF3B30',
  },
  mediumUrgency: {
    backgroundColor: '#FF9500',
  },
  lowUrgency: {
    backgroundColor: '#34C759',
  },
  urgencyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  swipeInstructions: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  swipeInstruction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  swipeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  swipeText: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rejectButton: {
    backgroundColor: '#FF3B30',
  },
  completeButton: {
    backgroundColor: '#007AFF',
  },
  approveButton: {
    backgroundColor: '#34C759',
  },
});