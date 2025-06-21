import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import { useEvents } from '../../hooks/useApi';
import { Event } from '../../lib/api';
import { format, parseISO, isToday, isTomorrow, addDays, startOfDay, endOfDay } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

type DateFilter = 'today' | 'week' | 'month' | 'all';

export default function Events() {
  const [dateFilter, setDateFilter] = useState<DateFilter>('week');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const getDateRange = () => {
    const now = new Date();
    
    switch (dateFilter) {
      case 'today':
        return {
          startDate: startOfDay(now).toISOString(),
          endDate: endOfDay(now).toISOString(),
        };
      case 'week':
        return {
          startDate: startOfDay(now).toISOString(),
          endDate: endOfDay(addDays(now, 7)).toISOString(),
        };
      case 'month':
        return {
          startDate: startOfDay(now).toISOString(),
          endDate: endOfDay(addDays(now, 30)).toISOString(),
        };
      default:
        return {};
    }
  };

  const { 
    data: events, 
    isLoading, 
    error, 
    refetch 
  } = useEvents(getDateRange());

  const formatEventDate = (startTime: string, endTime: string) => {
    try {
      const start = parseISO(startTime);
      const end = parseISO(endTime);
      
      if (isToday(start)) {
        return `Today, ${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
      } else if (isTomorrow(start)) {
        return `Tomorrow, ${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
      } else {
        const isSameDay = start.toDateString() === end.toDateString();
        if (isSameDay) {
          return `${format(start, 'MMM d, h:mm a')} - ${format(end, 'h:mm a')}`;
        } else {
          return `${format(start, 'MMM d, h:mm a')} - ${format(end, 'MMM d, h:mm a')}`;
        }
      }
    } catch {
      return `${startTime} - ${endTime}`;
    }
  };

  const generateICSFile = (event: Event): string => {
    const startDate = parseISO(event.startTime);
    const endDate = parseISO(event.endTime);
    
    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TaskEase//TaskEase Mobile//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${event.title}`,
      ...(event.description ? [`DESCRIPTION:${event.description}`] : []),
      ...(event.location ? [`LOCATION:${event.location}`] : []),
      `UID:${event.id}@taskease.ai`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    return icsContent;
  };

  const handleDownloadICS = (event: Event) => {
    try {
      const icsContent = generateICSFile(event);
      // For mobile, we'll create a Google Calendar link instead
      handleAddToGoogleCalendar(event);
    } catch (error) {
      Alert.alert('Error', 'Failed to create calendar file');
    }
  };

  const handleAddToGoogleCalendar = (event: Event) => {
    try {
      const startDate = parseISO(event.startTime);
      const endDate = parseISO(event.endTime);
      
      const formatGoogleDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
        ...(event.description && { details: event.description }),
        ...(event.location && { location: event.location }),
      });

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?${params.toString()}`;
      
      Linking.openURL(googleCalendarUrl).catch(() => {
        Alert.alert('Error', 'Could not open Google Calendar');
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to create calendar link');
    }
  };

  const filteredEvents = events?.filter(event => {
    const eventStart = parseISO(event.startTime);
    const now = new Date();
    
    // Only show upcoming events by default
    return eventStart >= now;
  }) || [];

  const getFilterLabel = () => {
    switch (dateFilter) {
      case 'today': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'all': return 'All Events';
      default: return 'This Week';
    }
  };

  const renderEventItem = (event: Event) => (
    <TouchableOpacity
      key={event.id}
      style={styles.eventItem}
      onPress={() => setSelectedEvent(event)}
    >
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        
        <View style={styles.eventMeta}>
          <View style={styles.eventTime}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.eventTimeText}>
              {formatEventDate(event.startTime, event.endTime)}
            </Text>
          </View>
          
          {event.location && (
            <View style={styles.eventLocation}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.eventLocationText} numberOfLines={1}>
                {event.location}
              </Text>
            </View>
          )}
        </View>
        
        {event.description && (
          <Text style={styles.eventDescription} numberOfLines={2}>
            {event.description}
          </Text>
        )}
        
        {event.isRecurringHint && (
          <View style={styles.recurringBadge}>
            <Ionicons name="repeat" size={12} color="#007AFF" />
            <Text style={styles.recurringText}>Recurring</Text>
          </View>
        )}
      </View>
      
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  const renderEventModal = () => (
    <Modal
      visible={!!selectedEvent}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {selectedEvent && (
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Event Details</Text>
            <TouchableOpacity onPress={() => setSelectedEvent(null)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalEventTitle}>{selectedEvent.title}</Text>
            
            <View style={styles.modalEventMeta}>
              <View style={styles.modalEventTime}>
                <Ionicons name="time-outline" size={20} color="#007AFF" />
                <Text style={styles.modalEventTimeText}>
                  {formatEventDate(selectedEvent.startTime, selectedEvent.endTime)}
                </Text>
              </View>
              
              {selectedEvent.location && (
                <View style={styles.modalEventLocation}>
                  <Ionicons name="location-outline" size={20} color="#007AFF" />
                  <Text style={styles.modalEventLocationText}>
                    {selectedEvent.location}
                  </Text>
                </View>
              )}
              
              {selectedEvent.isRecurringHint && (
                <View style={styles.modalEventRecurring}>
                  <Ionicons name="repeat" size={20} color="#007AFF" />
                  <Text style={styles.modalEventRecurringText}>
                    This may be a recurring event
                  </Text>
                </View>
              )}
            </View>
            
            {selectedEvent.description && (
              <View style={styles.modalEventDescription}>
                <Text style={styles.modalDescriptionLabel}>Description</Text>
                <Text style={styles.modalDescriptionText}>
                  {selectedEvent.description}
                </Text>
              </View>
            )}
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.calendarButton}
              onPress={() => handleDownloadICS(selectedEvent)}
            >
              <Ionicons name="download-outline" size={20} color="#007AFF" />
              <Text style={styles.calendarButtonText}>Download .ics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.googleCalendarButton}
              onPress={() => handleAddToGoogleCalendar(selectedEvent)}
            >
              <Ionicons name="calendar" size={20} color="white" />
              <Text style={styles.googleCalendarButtonText}>Add to Google Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );

  const renderFilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.filterModalContainer}>
        <View style={styles.filterModalHeader}>
          <Text style={styles.filterModalTitle}>Filter Events</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterModalContent}>
          <Text style={styles.filterSectionTitle}>Date Range</Text>
          
          {(['today', 'week', 'month', 'all'] as DateFilter[]).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterOption,
                dateFilter === filter && styles.filterOptionSelected
              ]}
              onPress={() => {
                setDateFilter(filter);
                setShowFilters(false);
              }}
            >
              <Text style={[
                styles.filterOptionText,
                dateFilter === filter && styles.filterOptionTextSelected
              ]}>
                {filter === 'today' ? 'Today' :
                 filter === 'week' ? 'This Week' :
                 filter === 'month' ? 'This Month' :
                 'All Events'}
              </Text>
              {dateFilter === filter && (
                <Ionicons name="checkmark" size={20} color="#007AFF" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load events</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
        <Text style={styles.subtitle}>
          {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
        </Text>
      </View>

      <View style={styles.filterBar}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="calendar-outline" size={20} color="#007AFF" />
          <Text style={styles.filterButtonText}>{getFilterLabel()}</Text>
          <Ionicons name="chevron-down" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.eventsList}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {filteredEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No events found</Text>
            <Text style={styles.emptySubtitle}>
              {dateFilter === 'all' ? 'No events in your calendar' : `No events ${getFilterLabel().toLowerCase()}`}
            </Text>
          </View>
        ) : (
          filteredEvents.map(renderEventItem)
        )}
      </ScrollView>

      {renderEventModal()}
      {renderFilterModal()}
    </View>
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
  filterBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    alignSelf: 'flex-start',
  },
  filterButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  eventsList: {
    flex: 1,
    padding: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  eventMeta: {
    marginBottom: 8,
  },
  eventTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTimeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  recurringBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recurringText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalEventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    lineHeight: 30,
  },
  modalEventMeta: {
    marginBottom: 24,
  },
  modalEventTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalEventTimeText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  modalEventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalEventLocationText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  modalEventRecurring: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalEventRecurringText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  modalEventDescription: {
    marginBottom: 32,
  },
  modalDescriptionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  modalDescriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    gap: 12,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  calendarButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  googleCalendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  googleCalendarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  filterModalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  filterModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterModalContent: {
    flex: 1,
    padding: 20,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#f0f8ff',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#333',
  },
  filterOptionTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
});