import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HelpSupportScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('faq'); // faq, contact, feedback
  const [feedbackForm, setFeedbackForm] = useState({
    subject: '',
    message: '',
    email: '',
  });

  const faqs = [
    {
      id: '1',
      question: 'How do I book a decoration service?',
      answer: 'Browse through our catalog, add items to cart, proceed to checkout, select payment method, and complete the payment. Our team will contact you within 24 hours to confirm booking details.',
    },
    {
      id: '2',
      question: 'Can I customize my decoration package?',
      answer: 'Yes! You can contact vendors directly through our app to discuss customization options. Use the "Find Vendors" feature in Budget Planner to connect with service providers.',
    },
    {
      id: '3',
      question: 'What payment methods do you accept?',
      answer: 'We accept Credit/Debit Cards, UPI, Net Banking, Wallets (Paytm, PhonePe), and Cash on Delivery for applicable services.',
    },
    {
      id: '4',
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify bookings up to 48 hours before the event date. Cancellation charges may apply based on the timing. Contact support for assistance.',
    },
    {
      id: '5',
      question: 'Do you provide setup and takedown services?',
      answer: 'Yes! Most packages include setup and takedown services. Check package details or contact the vendor for specific information.',
    },
    {
      id: '6',
      question: 'How does the AR preview feature work?',
      answer: 'Select a product with AR support, tap "View in AR", and point your camera at the desired location. The app will display a 3D preview of how the decoration will look in your space.',
    },
    {
      id: '7',
      question: 'What is your refund policy?',
      answer: 'Cancellations made 7+ days before event: 100% refund. 3-7 days: 50% refund. Less than 3 days: No refund. Exceptions apply for vendor-related issues.',
    },
    {
      id: '8',
      question: 'How do I track my order?',
      answer: 'Go to Profile → My Orders to view all your bookings. Each order shows current status: Pending, Confirmed, Completed, or Cancelled.',
    },
  ];

  const contactOptions = [
    {
      id: 'phone',
      title: 'Phone Support',
      subtitle: '+91 98765 43210',
      icon: 'phone.fill',
      color: '#10B981',
      action: () => Linking.openURL('tel:+919876543210'),
    },
    {
      id: 'email',
      title: 'Email Us',
      subtitle: 'support@decornest.com',
      icon: 'envelope.fill',
      color: '#3B82F6',
      action: () => Linking.openURL('mailto:support@decornest.com'),
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Chat with us',
      icon: 'message.fill',
      color: '#10B981',
      action: () => Linking.openURL('https://wa.me/919876543210'),
    },
    {
      id: 'hours',
      title: 'Support Hours',
      subtitle: 'Mon-Sat: 9 AM - 8 PM',
      icon: 'clock.fill',
      color: '#F59E0B',
      action: () => {},
    },
  ];

  const handleSubmitFeedback = () => {
    if (!feedbackForm.subject || !feedbackForm.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Feedback Submitted!',
      'Thank you for your feedback. We will review it and get back to you soon.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFeedbackForm({ subject: '', message: '', email: '' });
          },
        },
      ]
    );
  };

  const renderFAQ = () => (
    <View style={styles.tabContent}>
      <Text style={styles.contentTitle}>Frequently Asked Questions</Text>
      <Text style={styles.contentSubtitle}>Find quick answers to common questions</Text>

      {faqs.map((faq) => (
        <View key={faq.id} style={styles.faqCard}>
          <View style={styles.faqIcon}>
            <IconSymbol name="questionmark.circle.fill" size={24} color="#8B5CF6" />
          </View>
          <View style={styles.faqContent}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderContact = () => (
    <View style={styles.tabContent}>
      <Text style={styles.contentTitle}>Get in Touch</Text>
      <Text style={styles.contentSubtitle}>We're here to help you</Text>

      {contactOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.contactCard}
          onPress={option.action}
          activeOpacity={0.7}
          disabled={option.id === 'hours'}
        >
          <View style={[styles.contactIcon, { backgroundColor: `${option.color}20` }]}>
            <IconSymbol name={option.icon} size={28} color={option.color} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>{option.title}</Text>
            <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
          </View>
          {option.id !== 'hours' && (
            <IconSymbol name="arrow.right.circle.fill" size={24} color="#8B5CF6" />
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.infoBox}>
        <IconSymbol name="info.circle.fill" size={20} color="#3B82F6" />
        <Text style={styles.infoText}>
          Our support team typically responds within 2-4 hours during business hours
        </Text>
      </View>
    </View>
  );

  const renderFeedback = () => (
    <View style={styles.tabContent}>
      <Text style={styles.contentTitle}>Share Your Feedback</Text>
      <Text style={styles.contentSubtitle}>Help us improve your experience</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Subject *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Brief description"
          placeholderTextColor="#9CA3AF"
          value={feedbackForm.subject}
          onChangeText={(text) => setFeedbackForm({ ...feedbackForm, subject: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Message *</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Tell us more about your experience..."
          placeholderTextColor="#9CA3AF"
          value={feedbackForm.message}
          onChangeText={(text) => setFeedbackForm({ ...feedbackForm, message: text })}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email (Optional)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="your.email@example.com"
          placeholderTextColor="#9CA3AF"
          value={feedbackForm.email}
          onChangeText={(text) => setFeedbackForm({ ...feedbackForm, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={styles.submitButtonWrapper}
        onPress={handleSubmitFeedback}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#E6E0FF', '#FFD6E0']}
          style={styles.submitButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <IconSymbol name="paperplane.fill" size={20} color="#2D1B69" />
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#E6E0FF', '#FFD6E0']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.left" size={24} color="#2D1B69" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerIconCircle}>
            <IconSymbol name="questionmark.circle.fill" size={48} color="#8B5CF6" />
          </View>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <Text style={styles.headerSubtitle}>We're here to assist you</Text>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'faq' && styles.tabActive]}
          onPress={() => setActiveTab('faq')}
          activeOpacity={0.7}
        >
          <IconSymbol
            name="questionmark.circle.fill"
            size={20}
            color={activeTab === 'faq' ? '#8B5CF6' : '#9CA3AF'}
          />
          <Text style={[styles.tabText, activeTab === 'faq' && styles.tabTextActive]}>
            FAQ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'contact' && styles.tabActive]}
          onPress={() => setActiveTab('contact')}
          activeOpacity={0.7}
        >
          <IconSymbol
            name="phone.fill"
            size={20}
            color={activeTab === 'contact' ? '#8B5CF6' : '#9CA3AF'}
          />
          <Text style={[styles.tabText, activeTab === 'contact' && styles.tabTextActive]}>
            Contact
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'feedback' && styles.tabActive]}
          onPress={() => setActiveTab('feedback')}
          activeOpacity={0.7}
        >
          <IconSymbol
            name="star.fill"
            size={20}
            color={activeTab === 'feedback' ? '#8B5CF6' : '#9CA3AF'}
          />
          <Text style={[styles.tabText, activeTab === 'feedback' && styles.tabTextActive]}>
            Feedback
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'faq' && renderFAQ()}
        {activeTab === 'contact' && renderContact()}
        {activeTab === 'feedback' && renderFeedback()}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#C4A1FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#E6E0FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#8B5CF6',
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 8,
  },
  contentSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  faqCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  faqContent: {
    flex: 1,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
  },
});
