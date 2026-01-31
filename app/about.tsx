import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

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
            <IconSymbol name="info.circle.fill" size={48} color="#8B5CF6" />
          </View>
          <ThemedText style={styles.headerTitle}>About Decor Nest</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Your trusted event décor partner</ThemedText>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* App Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Version</ThemedText>
              <ThemedText style={styles.infoValue}>1.0.0</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Build</ThemedText>
              <ThemedText style={styles.infoValue}>2024.01.01</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Platform</ThemedText>
              <ThemedText style={styles.infoValue}>React Native</ThemedText>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionCard}>
            <ThemedText style={styles.descriptionTitle}>About Us</ThemedText>
            <ThemedText style={styles.descriptionText}>
              Decor Nest is your premier marketplace for event decoration services. We connect 
              customers with top-rated vendors to create unforgettable experiences for weddings, 
              birthdays, corporate events, and more.
            </ThemedText>
            <ThemedText style={styles.descriptionText}>
              Our platform features 3D/AR previews, budget planning tools, and seamless booking 
              experiences to make event planning effortless and enjoyable.
            </ThemedText>
          </View>

          {/* Quick Links */}
          <ThemedText style={styles.sectionTitle}>Quick Links</ThemedText>
          
          <TouchableOpacity 
            style={styles.linkCard}
            onPress={() => handleLinkPress('https://decornest.com/terms')}
            activeOpacity={0.7}
          >
            <View style={styles.linkLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
                <IconSymbol name="doc.text.fill" size={20} color="#3B82F6" />
              </View>
              <ThemedText style={styles.linkText}>Terms & Conditions</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkCard}
            onPress={() => handleLinkPress('https://decornest.com/privacy')}
            activeOpacity={0.7}
          >
            <View style={styles.linkLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#F3E8FF' }]}>
                <IconSymbol name="lock.shield.fill" size={20} color="#A855F7" />
              </View>
              <ThemedText style={styles.linkText}>Privacy Policy</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkCard}
            onPress={() => handleLinkPress('https://decornest.com/refund')}
            activeOpacity={0.7}
          >
            <View style={styles.linkLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
                <IconSymbol name="arrow.clockwise.circle.fill" size={20} color="#10B981" />
              </View>
              <ThemedText style={styles.linkText}>Refund Policy</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#999" />
          </TouchableOpacity>

          {/* Contact Info */}
          <ThemedText style={[styles.sectionTitle, { marginTop: 24 }]}>Contact Information</ThemedText>
          
          <View style={styles.contactCard}>
            <View style={styles.contactRow}>
              <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
                <IconSymbol name="envelope.fill" size={18} color="#3B82F6" />
              </View>
              <View style={styles.contactText}>
                <ThemedText style={styles.contactLabel}>Email</ThemedText>
                <ThemedText style={styles.contactValue}>support@decornest.com</ThemedText>
              </View>
            </View>

            <View style={[styles.contactRow, { marginTop: 16 }]}>
              <View style={[styles.iconCircle, { backgroundColor: '#F0FDF4' }]}>
                <IconSymbol name="phone.fill" size={18} color="#10B981" />
              </View>
              <View style={styles.contactText}>
                <ThemedText style={styles.contactLabel}>Phone</ThemedText>
                <ThemedText style={styles.contactValue}>+91 9876543210</ThemedText>
              </View>
            </View>

            <View style={[styles.contactRow, { marginTop: 16 }]}>
              <View style={[styles.iconCircle, { backgroundColor: '#F3E8FF' }]}>
                <IconSymbol name="globe" size={18} color="#A855F7" />
              </View>
              <View style={styles.contactText}>
                <ThemedText style={styles.contactLabel}>Website</ThemedText>
                <ThemedText style={styles.contactValue}>www.decornest.com</ThemedText>
              </View>
            </View>
          </View>

          {/* Social Media */}
          <ThemedText style={[styles.sectionTitle, { marginTop: 24 }]}>Follow Us</ThemedText>
          
          <View style={styles.socialContainer}>
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: '#3B82F6' }]}
              onPress={() => handleLinkPress('https://facebook.com/decornest')}
            >
              <IconSymbol name="person.2.fill" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}
              onPress={() => handleLinkPress('https://twitter.com/decornest')}
            >
              <IconSymbol name="message.fill" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: '#E1306C' }]}
              onPress={() => handleLinkPress('https://instagram.com/decornest')}
            >
              <IconSymbol name="camera.fill" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: '#25D366' }]}
              onPress={() => handleLinkPress('https://wa.me/919876543210')}
            >
              <IconSymbol name="phone.bubble.left.fill" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <ThemedText style={styles.footerText}>
            Made with 💜 in India
          </ThemedText>
          <ThemedText style={styles.copyrightText}>
            © 2024 Decor Nest. All rights reserved.
          </ThemedText>
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
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: '#666',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
  },
  divider: {
    height: 1,
    backgroundColor: '#E6E0FF',
  },
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 16,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  linkLeft: {
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
  linkText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D1B69',
    textAlign: 'center',
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 32,
  },
});
