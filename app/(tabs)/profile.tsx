import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, isAuthenticated, cartItems, wishlistItems } = useApp();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  if (!isAuthenticated) {
    return (
      <ThemedView style={styles.container}>
        <LinearGradient
          colors={['#FFD6E0', '#E6E0FF']}
          style={styles.guestGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.guestContent}>
            <View style={styles.guestIconContainer}>
              <IconSymbol name="person.circle.fill" size={100} color="#8B5CF6" />
            </View>
            <ThemedText style={styles.guestTitle}>Welcome to Decor Nest!</ThemedText>
            <ThemedText style={styles.guestSubtitle}>
              Login or create an account to explore amazing décor packages and start planning your dream event
            </ThemedText>

            <View style={styles.guestButtonContainer}>
              <TouchableOpacity
                style={styles.gradientButtonWrapper}
                onPress={() => router.push('/login')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#E6E0FF', '#FFD6E0']}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <IconSymbol name="arrow.right.circle.fill" size={20} color="#2D1B69" />
                  <ThemedText style={styles.gradientButtonText}>Login</ThemedText>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.outlineButtonWrapper}
                onPress={() => router.push('/signup')}
                activeOpacity={0.8}
              >
                <View style={styles.outlineButton}>
                  <IconSymbol name="person.badge.plus.fill" size={20} color="#8B5CF6" />
                  <ThemedText style={styles.outlineButtonText}>Sign Up</ThemedText>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.guestFeatures}>
              <View style={styles.featureItem}>
                <IconSymbol name="star.fill" size={20} color="#FFB800" />
                <ThemedText style={styles.featureText}>Premium Décor Setups</ThemedText>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="cube.fill" size={20} color="#8B5CF6" />
                <ThemedText style={styles.featureText}>3D/AR Preview</ThemedText>
              </View>
              <View style={styles.featureItem}>
                <IconSymbol name="calendar.badge.checkmark" size={20} color="#10B981" />
                <ThemedText style={styles.featureText}>Easy Booking</ThemedText>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header Section */}
        <LinearGradient
          colors={['#E6E0FF', '#FFD6E0']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <LinearGradient
            colors={['#E6E0FF', '#FFD6E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileCircleGradient}
          >
            <View style={styles.profileCircle}>
              <IconSymbol name="person.fill" size={50} color="#8B5CF6" />
            </View>
          </LinearGradient>
          <ThemedText style={styles.userName}>{user?.name}</ThemedText>
          <ThemedText style={styles.userEmail}>{user?.email}</ThemedText>
          
          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>{cartItems.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Cart</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>{wishlistItems.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Wishlist</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>0</ThemedText>
              <ThemedText style={styles.statLabel}>Orders</ThemedText>
            </View>
          </View>
        </LinearGradient>

        {/* Menu Sections */}
        <View style={styles.content}>
          {/* Account Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Account</ThemedText>
            
            <TouchableOpacity 
              style={styles.menuCard} 
              activeOpacity={0.7}
              onPress={() => router.push('/edit-profile')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#FFD6E0' }]}>
                <IconSymbol name="person.text.rectangle.fill" size={24} color="#FF1E6C" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuTitle}>Edit Profile</ThemedText>
                <ThemedText style={styles.menuSubtitle}>Update your personal details</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuCard} 
              activeOpacity={0.7}
              onPress={() => router.push('/saved-addresses')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#E6E0FF' }]}>
                <IconSymbol name="location.fill" size={24} color="#8B5CF6" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuTitle}>Saved Addresses</ThemedText>
                <ThemedText style={styles.menuSubtitle}>Manage delivery addresses</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Orders & Bookings */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Orders & Bookings</ThemedText>
            
            <TouchableOpacity 
              style={styles.menuCard} 
              activeOpacity={0.7}
              onPress={() => router.push('/(tabs)/orders')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#F0FDF4' }]}>
                <IconSymbol name="bag.fill" size={24} color="#10B981" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuTitle}>My Orders</ThemedText>
                <ThemedText style={styles.menuSubtitle}>Track and view your orders</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuCard} 
              activeOpacity={0.7}
              onPress={() => router.push('/(tabs)/wishlist')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#FEF2F2' }]}>
                <IconSymbol name="heart.fill" size={24} color="#EF4444" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuTitle}>My Wishlist</ThemedText>
                <ThemedText style={styles.menuSubtitle}>{wishlistItems.length} items saved</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Settings */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Settings & Preferences</ThemedText>
            
            <TouchableOpacity 
              style={styles.menuCard} 
              activeOpacity={0.7}
              onPress={() => router.push('/notifications')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
                <IconSymbol name="bell.fill" size={24} color="#3B82F6" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuTitle}>Notifications</ThemedText>
                <ThemedText style={styles.menuSubtitle}>Manage app notifications</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuCard} 
              activeOpacity={0.7}
              onPress={() => router.push('/payment-methods')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
                <IconSymbol name="creditcard.fill" size={24} color="#F59E0B" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuTitle}>Payment Methods</ThemedText>
                <ThemedText style={styles.menuSubtitle}>Manage saved cards & UPI</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Help & Support */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Help & Support</ThemedText>
            
            <TouchableOpacity 
              style={styles.menuCard} 
              activeOpacity={0.7}
              onPress={() => router.push('/support')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#F3E8FF' }]}>
                <IconSymbol name="questionmark.circle.fill" size={24} color="#A855F7" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuTitle}>Help Center</ThemedText>
                <ThemedText style={styles.menuSubtitle}>FAQs and support</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuCard} 
              activeOpacity={0.7}
              onPress={() => router.push('/support')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
                <IconSymbol name="phone.fill" size={24} color="#10B981" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuTitle}>Contact Us</ThemedText>
                <ThemedText style={styles.menuSubtitle}>Get in touch with support</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* About */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.menuCard} 
              activeOpacity={0.7}
              onPress={() => router.push('/about')}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#F5F3FF' }]}>
                <IconSymbol name="info.circle.fill" size={24} color="#8B5CF6" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuTitle}>About Decor Nest</ThemedText>
                <ThemedText style={styles.menuSubtitle}>Version 1.0.0</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButtonWrapper}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FEE2E2', '#FECACA']}
              style={styles.logoutButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="arrow.right.square.fill" size={20} color="#DC2626" />
              <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Guest Styles
  guestGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  guestContent: {
    alignItems: 'center',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  guestIconContainer: {
    marginBottom: 24,
  },
  guestTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 12,
    textAlign: 'center',
  },
  guestSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  guestButtonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  gradientButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  gradientButton: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  gradientButtonText: {
    color: '#2D1B69',
    fontSize: 16,
    fontWeight: '700',
  },
  outlineButtonWrapper: {
    borderRadius: 12,
  },
  outlineButton: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 12,
  },
  outlineButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '700',
  },
  guestFeatures: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#2D1B69',
    fontWeight: '600',
  },

  // Authenticated User Styles
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
  },
  profileCircleGradient: {
    width: 108,
    height: 108,
    borderRadius: 54,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    maxWidth: 320,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },

  // Content Styles
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 12,
    paddingLeft: 4,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#999',
  },

  // Logout Button
  logoutButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  logoutButton: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 32,
  },
});