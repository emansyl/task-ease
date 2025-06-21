import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Clipboard,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { router } from 'expo-router';
import { useUser } from '../../hooks/useApi';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const [session, setSession] = useState<Session | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const { data: user, isLoading: userLoading } = useUser();

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

  const handleCopyForwardingEmail = async () => {
    try {
      const forwardingEmail = user?.forwardingemail || `${session?.user?.id}@taskease.ai`;
      await Clipboard.setString(forwardingEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy email address');
    }
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open link');
    });
  };

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              Alert.alert("Error", error.message);
            } else {
              router.replace("/(auth)/sign-in");
            }
          },
        },
      ]
    );
  };

  const integrations = [
    {
      name: 'Google Calendar',
      description: 'Sync events with Google Calendar',
      icon: 'calendar',
      comingSoon: true,
    },
    {
      name: 'Notion',
      description: 'Export tasks to Notion workspace',
      icon: 'document-text',
      comingSoon: true,
    },
    {
      name: 'Apple Calendar',
      description: 'Sync with iPhone Calendar app',
      icon: 'calendar-outline',
      comingSoon: true,
    },
    {
      name: 'Todoist',
      description: 'Import tasks from Todoist',
      icon: 'checkmark-circle',
      comingSoon: true,
    },
    {
      name: 'Slack',
      description: 'Get notifications in Slack',
      icon: 'chatbubble',
      comingSoon: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your account and preferences</Text>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Email Address</Text>
          <Text style={styles.settingValue}>{session?.user?.email}</Text>
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>TaskEase Forwarding Email</Text>
          <View style={styles.forwardingEmailContainer}>
            {userLoading ? (
              <ActivityIndicator size="small" color="#666" />
            ) : (
              <Text style={styles.forwardingEmailValue} numberOfLines={1}>
                {user?.forwardingemail || `${session?.user?.id}@taskease.ai`}
              </Text>
            )}
            <TouchableOpacity 
              style={[styles.copyButton, copiedEmail && styles.copiedButton]}
              onPress={handleCopyForwardingEmail}
              disabled={userLoading}
            >
              <Ionicons 
                name={copiedEmail ? "checkmark" : "copy"} 
                size={16} 
                color="white" 
              />
              <Text style={styles.copyButtonText}>
                {copiedEmail ? "Copied!" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.settingDescription}>
            Forward emails to this address to extract tasks and events automatically
          </Text>
        </View>
      </View>

      {/* Integrations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integrations</Text>
        
        {integrations.map((integration, index) => (
          <TouchableOpacity 
            key={integration.name}
            style={[
              styles.integrationItem,
              index === integrations.length - 1 && styles.lastItem
            ]}
            disabled={integration.comingSoon}
          >
            <View style={styles.integrationLeft}>
              <View style={[
                styles.integrationIcon,
                integration.comingSoon && styles.integrationIconDisabled
              ]}>
                <Ionicons 
                  name={integration.icon as any} 
                  size={20} 
                  color={integration.comingSoon ? "#ccc" : "#007AFF"} 
                />
              </View>
              <View style={styles.integrationContent}>
                <Text style={[
                  styles.integrationName,
                  integration.comingSoon && styles.integrationNameDisabled
                ]}>
                  {integration.name}
                </Text>
                <Text style={styles.integrationDescription}>
                  {integration.description}
                </Text>
              </View>
            </View>
            
            {integration.comingSoon ? (
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              </View>
            ) : (
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Help & Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help & Support</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => handleOpenLink('https://docs.taskease.ai/forwarding-guide')}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="help-circle-outline" size={20} color="#007AFF" />
            <Text style={styles.menuItemText}>How to Forward Emails</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => handleOpenLink('https://taskease.ai/contact')}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="mail-outline" size={20} color="#007AFF" />
            <Text style={styles.menuItemText}>Contact Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, styles.lastItem]}
          onPress={() => handleOpenLink('https://taskease.ai/feedback')}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="chatbubble-outline" size={20} color="#007AFF" />
            <Text style={styles.menuItemText}>Send Feedback</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Legal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => handleOpenLink('https://taskease.ai/privacy')}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="shield-outline" size={20} color="#666" />
            <Text style={styles.menuItemText}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, styles.lastItem]}
          onPress={() => handleOpenLink('https://taskease.ai/terms')}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="document-text-outline" size={20} color="#666" />
            <Text style={styles.menuItemText}>Terms of Service</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* App Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Version</Text>
          <Text style={styles.settingValue}>1.0.0 (MVP)</Text>
        </View>
        
        <View style={[styles.settingItem, { marginBottom: 0 }]}>
          <Text style={styles.settingLabel}>Build</Text>
          <Text style={styles.settingValue}>2025.01.19</Text>
        </View>
      </View>

      {/* Sign Out Section */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Padding */}
      <View style={styles.bottomPadding} />
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
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 16,
    color: '#333',
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
    lineHeight: 16,
  },
  forwardingEmailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  forwardingEmailValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 12,
    fontFamily: 'monospace',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  copiedButton: {
    backgroundColor: '#34C759',
  },
  copyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  integrationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  integrationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  integrationIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  integrationIconDisabled: {
    backgroundColor: '#f5f5f5',
  },
  integrationContent: {
    flex: 1,
  },
  integrationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  integrationNameDisabled: {
    color: '#999',
  },
  integrationDescription: {
    fontSize: 14,
    color: '#666',
  },
  comingSoonBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  signOutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
});