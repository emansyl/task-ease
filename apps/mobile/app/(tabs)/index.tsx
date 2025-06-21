import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useDashboard, usePendingTasks, useCompleteTask } from '../../hooks/useApi';
import { router } from 'expo-router';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

export default function Dashboard() {
  const [session, setSession] = useState<Session | null>(null);
  
  const { 
    data: dashboardData, 
    isLoading: dashboardLoading, 
    error: dashboardError,
    refetch: refetchDashboard 
  } = useDashboard();
  
  const { 
    data: pendingTasks,
    isLoading: triageLoading 
  } = usePendingTasks();
  
  const completeTaskMutation = useCompleteTask();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  const formatEventTime = (startTime: string, endTime: string) => {
    const start = parseISO(startTime);
    const end = parseISO(endTime);
    
    if (isToday(start)) {
      return `Today, ${format(start, 'h:mm a')}`;
    } else if (isTomorrow(start)) {
      return `Tomorrow, ${format(start, 'h:mm a')}`;
    } else {
      return format(start, 'MMM d, h:mm a');
    }
  };

  const formatTaskDue = (dueDate: string) => {
    const due = parseISO(dueDate);
    
    if (isToday(due)) {
      return 'Due: Today';
    } else if (isTomorrow(due)) {
      return 'Due: Tomorrow';
    } else {
      return `Due: ${format(due, 'MMM d, yyyy')}`;
    }
  };

  const isRefreshing = dashboardLoading || triageLoading;

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={isRefreshing} 
          onRefresh={refetchDashboard} 
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          Welcome back, {session?.user?.email?.split('@')[0]}
        </Text>
      </View>

      {dashboardError && (
        <View style={styles.errorWidget}>
          <Text style={styles.errorText}>Failed to load dashboard data</Text>
          <TouchableOpacity onPress={() => refetchDashboard()}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Triage Widget */}
      {(pendingTasks?.length ?? 0) > 0 && (
        <View style={styles.widget}>
          <View style={styles.widgetHeader}>
            <Text style={styles.widgetTitle}>Triage Required</Text>
          </View>
          <TouchableOpacity 
            style={styles.triageButton}
            onPress={() => router.push('/triage')}
          >
            <Text style={styles.triageButtonText}>
              You have {pendingTasks?.length} new items to triage
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Upcoming Events Widget */}
      <View style={styles.widget}>
        <View style={styles.widgetHeader}>
          <Text style={styles.widgetTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/events')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {dashboardLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" />
          </View>
        ) : dashboardData?.upcomingEvents?.length ? (
          <View style={styles.eventsList}>
            {dashboardData.upcomingEvents.slice(0, 3).map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>
                  {formatEventTime(event.startTime, event.endTime)}
                </Text>
                {event.location && (
                  <Text style={styles.eventLocation}>{event.location}</Text>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No upcoming events</Text>
          </View>
        )}
      </View>

      {/* Tasks Due Soon Widget */}
      <View style={styles.widget}>
        <View style={styles.widgetHeader}>
          <Text style={styles.widgetTitle}>Tasks Due Soon</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/tasks')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {dashboardLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" />
          </View>
        ) : dashboardData?.tasksDueSoon?.length ? (
          <View style={styles.tasksList}>
            {dashboardData.tasksDueSoon.slice(0, 3).map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <TouchableOpacity 
                  style={styles.checkbox} 
                  onPress={() => handleCompleteTask(task.id)}
                  disabled={completeTaskMutation.isPending}
                >
                  {completeTaskMutation.isPending && completeTaskMutation.variables === task.id ? (
                    <ActivityIndicator size="small" />
                  ) : null}
                </TouchableOpacity>
                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  {task.dueDate && (
                    <Text style={styles.taskDue}>
                      {formatTaskDue(task.dueDate)}
                    </Text>
                  )}
                </View>
                <View style={[
                  styles.urgencyBadge, 
                  task.urgency === 'high' ? styles.highUrgency : 
                  task.urgency === 'medium' ? styles.mediumUrgency : 
                  styles.lowUrgency
                ]}>
                  <Text style={styles.urgencyText}>
                    {task.urgency.toUpperCase()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks due soon</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  widget: {
    backgroundColor: 'white',
    margin: 16,
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
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
  },
  triageButton: {
    backgroundColor: '#FF9500',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  triageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  eventsList: {
    gap: 12,
  },
  eventItem: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  tasksList: {
    gap: 12,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  taskDue: {
    fontSize: 14,
    color: '#666',
  },
  urgencyBadge: {
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
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  errorWidget: {
    backgroundColor: '#FFE6E6',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFB3B3',
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    marginBottom: 8,
  },
  retryText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
  },
});