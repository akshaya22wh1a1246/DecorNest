import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type SFSymbol = React.ComponentProps<typeof IconSymbol>['name'];

const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function SupportScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const categories = [
    { id: 'order', title: 'Order Issues', icon: 'bag.fill' as SFSymbol, color: '#8B5CF6' },
    { id: 'payment', title: 'Payment Help', icon: 'creditcard.fill' as SFSymbol, color: '#EC4899' },
    { id: 'booking', title: 'Booking Support', icon: 'calendar' as SFSymbol, color: '#F59E0B' },
    { id: 'technical', title: 'Technical Issue', icon: 'wrench.fill' as SFSymbol, color: '#10B981' },
    { id: 'feedback', title: 'Feedback', icon: 'star.fill' as SFSymbol, color: '#6366F1' },
    { id: 'other', title: 'Other', icon: 'questionmark.circle.fill' as SFSymbol, color: '#8B5CF6' },
  ];

  const contactMethods = [
    {
      id: 'phone',
      title: 'Call Us',
      subtitle: '+91 1800-123-4567',
      icon: 'phone.fill' as SFSymbol,
      color: '#10B981',
      action: () => Linking.openURL('tel:+911800123456'),
    },
    {
      id: 'email',
      title: 'Email Us',
      subtitle: 'support@decorapp.com',
      icon: 'envelope.fill' as SFSymbol,
      color: '#8B5CF6',
      action: () => Linking.openURL('mailto:support@decorapp.com'),
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Chat with us',
      icon: 'message.fill' as SFSymbol,
      color: '#10B981',
      action: () => Linking.openURL('https://wa.me/911800123456'),
    },
  ];

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim() || !selectedCategory) {
      showAlert('Missing Information', 'Please fill in all fields and select a category.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Simulate sending the support request
    showAlert(
      'Request Submitted',
      'Thank you for contacting us! Our support team will get back to you within 24 hours.'
    );

    // Clear form
    setName('');
    setEmail('');
    setMessage('');
    setSelectedCategory(null);
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
          style={styles.headerBackButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.left" size={24} color="#2D1B69" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerIconCircle}>
            <IconSymbol name="headphones" size={48} color="#8B5CF6" />
          </View>
          <ThemedText style={styles.headerTitle}>Support Center</ThemedText>
          <ThemedText style={styles.headerSubtitle}>We're here to help you 24/7</ThemedText>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Contact Methods */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Contact</ThemedText>
          <View style={styles.contactGrid}>
            {contactMethods.map((method) => (
              <TouchableOpacity 
                key={method.id}
                style={styles.contactCard}
                onPress={method.action}
                activeOpacity={0.7}
              >
                <View style={[styles.contactIconCircle, { backgroundColor: `${method.color}15` }]}>
                  <IconSymbol name={method.icon} size={28} color={method.color} />
                </View>
                <ThemedText style={styles.contactTitle}>{method.title}</ThemedText>
                <ThemedText style={styles.contactSubtitle}>{method.subtitle}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Support Request Form */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Submit a Request</ThemedText>
          
          {/* Category Selection */}
          <ThemedText style={styles.formLabel}>Select Category</ThemedText>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardSelected,
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.7}
              >
                <IconSymbol 
                  name={category.icon} 
                  size={24} 
                  color={selectedCategory === category.id ? '#FFFFFF' : category.color} 
                />
                <ThemedText 
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextSelected,
                  ]}
                >
                  {category.title}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form Fields */}
          <View style={styles.formGroup}>
            <ThemedText style={styles.formLabel}>Your Name</ThemedText>
            <View style={styles.inputWrapper}>
              <IconSymbol name="person.fill" size={20} color="#999" />
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.formLabel}>Email Address</ThemedText>
            <View style={styles.inputWrapper}>
              <IconSymbol name="envelope.fill" size={20} color="#999" />
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.formLabel}>Message</ThemedText>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your issue or question..."
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.submitButtonWrapper}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#8B5CF6', '#C4A1FF']}
              style={styles.submitButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="paperplane.fill" size={20} color="#FFFFFF" />
              <ThemedText style={styles.submitButtonText}>Submit Request</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Common Questions</ThemedText>
          <LinearGradient
            colors={['#FFFFFF', '#FAF5FF']}
            style={styles.faqCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.faqItem}>
              <IconSymbol name="questionmark.circle.fill" size={24} color="#8B5CF6" />
              <View style={styles.faqContent}>
                <ThemedText style={styles.faqQuestion}>How do I cancel my order?</ThemedText>
                <ThemedText style={styles.faqAnswer}>
                  Go to My Orders, select the order you want to cancel, and click "Cancel Order" button.
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.faqDivider} />
            
            <View style={styles.faqItem}>
              <IconSymbol name="questionmark.circle.fill" size={24} color="#8B5CF6" />
              <View style={styles.faqContent}>
                <ThemedText style={styles.faqQuestion}>When will I receive my refund?</ThemedText>
                <ThemedText style={styles.faqAnswer}>
                  Refunds are processed within 5-7 business days after order cancellation.
                </ThemedText>
              </View>
            </View>

            <View style={styles.faqDivider} />
            
            <View style={styles.faqItem}>
              <IconSymbol name="questionmark.circle.fill" size={24} color="#8B5CF6" />
              <View style={styles.faqContent}>
                <ThemedText style={styles.faqQuestion}>Can I modify my booking?</ThemedText>
                <ThemedText style={styles.faqAnswer}>
                  Yes! Contact support at least 48 hours before your event date to make changes.
                </ThemedText>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  // Header
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerBackButton: {
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
    fontSize: 28,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#666',
  },

  scrollView: {
    flex: 1,
  },

  // Sections
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 16,
  },

  // Quick Contact
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E0FF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  contactIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
    textAlign: 'center',
  },
  contactSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },

  // Category Selection
  formLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E6E0FF',
    gap: 8,
  },
  categoryCardSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D1B69',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },

  // Form
  formGroup: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E6E0FF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D1B69',
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },

  // Submit Button
  submitButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
    elevation: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // FAQ
  faqCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  faqItem: {
    flexDirection: 'row',
    gap: 12,
  },
  faqContent: {
    flex: 1,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  faqDivider: {
    height: 1,
    backgroundColor: '#E6E0FF',
    marginVertical: 16,
  },

  bottomPadding: {
    height: 32,
  },
});
