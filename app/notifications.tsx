import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

export default function NotificationsScreen() {
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(true);
  const [events, setEvents] = useState(false);
  const [sms, setSms] = useState(true);
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(true);

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#E6E0FF', '#FFD6E0']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.left" size={24} color="#2D1B69" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerIconCircle}>
            <IconSymbol name="bell.fill" size={48} color="#3B82F6" />
          </View>
          <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Manage your notification preferences</ThemedText>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Notification Types</ThemedText>
          
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconCircle, { backgroundColor: '#F0FDF4' }]}>
                  <IconSymbol name="bag.fill" size={20} color="#10B981" />
                </View>
                <View style={styles.settingText}>
                  <ThemedText style={styles.settingTitle}>Order Updates</ThemedText>
                  <ThemedText style={styles.settingSubtitle}>Get notified about order status</ThemedText>
                </View>
              </View>
              <Switch
                value={orderUpdates}
                onValueChange={setOrderUpdates}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
                  <IconSymbol name="tag.fill" size={20} color="#F59E0B" />
                </View>
                <View style={styles.settingText}>
                  <ThemedText style={styles.settingTitle}>Promotions & Offers</ThemedText>
                  <ThemedText style={styles.settingSubtitle}>Deals and discounts</ThemedText>
                </View>
              </View>
              <Switch
                value={promotions}
                onValueChange={setPromotions}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconCircle, { backgroundColor: '#E6E0FF' }]}>
                  <IconSymbol name="calendar.badge.checkmark" size={20} color="#8B5CF6" />
                </View>
                <View style={styles.settingText}>
                  <ThemedText style={styles.settingTitle}>Event Reminders</ThemedText>
                  <ThemedText style={styles.settingSubtitle}>Upcoming bookings alerts</ThemedText>
                </View>
              </View>
              <Switch
                value={events}
                onValueChange={setEvents}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <ThemedText style={[styles.sectionTitle, { marginTop: 24 }]}>Notification Channels</ThemedText>
          
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
                  <IconSymbol name="app.badge.fill" size={20} color="#3B82F6" />
                </View>
                <View style={styles.settingText}>
                  <ThemedText style={styles.settingTitle}>Push Notifications</ThemedText>
                  <ThemedText style={styles.settingSubtitle}>In-app alerts</ThemedText>
                </View>
              </View>
              <Switch
                value={push}
                onValueChange={setPush}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconCircle, { backgroundColor: '#F3E8FF' }]}>
                  <IconSymbol name="envelope.fill" size={20} color="#A855F7" />
                </View>
                <View style={styles.settingText}>
                  <ThemedText style={styles.settingTitle}>Email Notifications</ThemedText>
                  <ThemedText style={styles.settingSubtitle}>Receive updates via email</ThemedText>
                </View>
              </View>
              <Switch
                value={email}
                onValueChange={setEmail}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
                  <IconSymbol name="message.fill" size={20} color="#10B981" />
                </View>
                <View style={styles.settingText}>
                  <ThemedText style={styles.settingTitle}>SMS Notifications</ThemedText>
                  <ThemedText style={styles.settingSubtitle}>Text message alerts</ThemedText>
                </View>
              </View>
              <Switch
                value={sms}
                onValueChange={setSms}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 16,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#999',
  },
});
