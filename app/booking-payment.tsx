import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DECOR_PRODUCTS } from '@/constants/products';
import { useApp } from '@/context/app-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

// Web-compatible alert
const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function BookingPaymentScreen() {
  const { cartItems, clearCart, createOrder } = useApp();
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    venue: '',
    specialRequests: '',
  });

  const [step, setStep] = useState(1); // 1: Booking Details, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'venue'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [upiId, setUpiId] = useState('');

  const cartItemsWithProducts = cartItems.map(item => ({
    ...item,
    product: DECOR_PRODUCTS.find(p => p.id === item.productId)!
  }));

  const totalAmount = cartItemsWithProducts.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  const validateBookingDetails = () => {
    // Name validation
    if (!bookingDetails.name || bookingDetails.name.trim().length < 3) {
      showAlert('Error', 'Please enter a valid name (at least 3 characters)');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!bookingDetails.email || !emailRegex.test(bookingDetails.email.trim())) {
      showAlert('Error', 'Please enter a valid email address');
      return false;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!bookingDetails.phone || !phoneRegex.test(bookingDetails.phone.replace(/\s/g, ''))) {
      showAlert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }

    // Date validation
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!bookingDetails.date || !dateRegex.test(bookingDetails.date.trim())) {
      showAlert('Error', 'Please enter a valid date in DD/MM/YYYY format');
      return false;
    }

    // Venue validation
    if (!bookingDetails.venue || bookingDetails.venue.trim().length < 5) {
      showAlert('Error', 'Please enter a valid venue address (at least 5 characters)');
      return false;
    }

    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === 'card') {
      // Card number validation (16 digits)
      if (!cardDetails.number || !/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
        showAlert('Error', 'Please enter a valid 16-digit card number');
        return false;
      }

      // Expiry date validation (MM/YY format)
      if (!cardDetails.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry.trim())) {
        showAlert('Error', 'Please enter a valid expiry date (MM/YY)');
        return false;
      }

      // CVV validation (3 digits)
      if (!cardDetails.cvv || !/^\d{3}$/.test(cardDetails.cvv.trim())) {
        showAlert('Error', 'Please enter a valid 3-digit CVV');
        return false;
      }

      // Card name validation
      if (!cardDetails.name || cardDetails.name.trim().length < 3) {
        showAlert('Error', 'Please enter the name on your card');
        return false;
      }
    } else if (paymentMethod === 'upi') {
      // UPI ID validation (username@upi format)
      if (!upiId || !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiId.trim())) {
        showAlert('Error', 'Please enter a valid UPI ID (e.g., username@upi)');
        return false;
      }
    } else if (paymentMethod === 'venue') {
      // No validation needed for pay at venue
      return true;
    }

    return true;
  };

  const handleContinue = () => {
    console.log('handleContinue called, current step:', step);
    
    if (step === 1) {
      console.log('Validating booking details...');
      if (validateBookingDetails()) {
        console.log('Booking details valid, moving to step 2');
        setStep(2);
      } else {
        console.log('Booking details validation failed');
      }
    } else if (step === 2) {
      console.log('Validating payment...');
      if (validatePayment()) {
        console.log('Payment valid, creating order');
        handleSuccess();
      } else {
        console.log('Payment validation failed');
      }
    }
  };

  const handleSuccess = () => {
    try {
      console.log('Creating order...');
      console.log('Booking details:', bookingDetails);
      
      // Create the order - the context will handle creating order items from cart
      createOrder({
        name: bookingDetails.name,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        date: bookingDetails.date,
        venue: bookingDetails.venue,
        specialRequests: bookingDetails.specialRequests,
      });
      
      console.log('Order created successfully');
      setStep(3);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      showAlert('Error', 'Failed to create order. Please try again.');
    }
  };

  const renderBookingForm = () => (
    <View style={styles.formContainer}>
      <ThemedText style={styles.formTitle}>Booking Details</ThemedText>
      <ThemedText style={styles.formSubtitle}>Please fill in your event details</ThemedText>
      
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Full Name *</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#999"
          value={bookingDetails.name}
          onChangeText={(text) => setBookingDetails(prev => ({ ...prev, name: text }))}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Email *</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="your@email.com"
          placeholderTextColor="#999"
          value={bookingDetails.email}
          onChangeText={(text) => setBookingDetails(prev => ({ ...prev, email: text }))}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Phone Number *</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="10-digit phone number"
          placeholderTextColor="#999"
          value={bookingDetails.phone}
          onChangeText={(text) => setBookingDetails(prev => ({ ...prev, phone: text }))}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Event Date *</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#999"
          value={bookingDetails.date}
          onChangeText={(text) => setBookingDetails(prev => ({ ...prev, date: text }))}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Venue Address *</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter venue address"
          placeholderTextColor="#999"
          value={bookingDetails.venue}
          onChangeText={(text) => setBookingDetails(prev => ({ ...prev, venue: text }))}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Special Requests (Optional)</ThemedText>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any special requirements or notes..."
          placeholderTextColor="#999"
          value={bookingDetails.specialRequests}
          onChangeText={(text) => setBookingDetails(prev => ({ ...prev, specialRequests: text }))}
          multiline
          numberOfLines={4}
        />
      </View>
    </View>
  );

  const renderPayment = () => (
    <View style={styles.formContainer}>
      <ThemedText style={styles.formTitle}>Payment Details</ThemedText>
      
      <View style={styles.paymentSummary}>
        <ThemedText style={styles.summaryText}>Booking Amount: ₹{totalAmount.toLocaleString()}</ThemedText>
        <ThemedText style={styles.summaryText}>Service Fee: ₹{(totalAmount * 0.05).toFixed(0)}</ThemedText>
        <ThemedText style={styles.totalText}>
          Total: ₹{(totalAmount * 1.05).toFixed(0)}
        </ThemedText>
      </View>

      <View style={styles.paymentMethods}>
        <TouchableOpacity 
          style={[styles.paymentMethod, paymentMethod === 'card' && styles.selectedPayment]}
          onPress={() => setPaymentMethod('card')}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={paymentMethod === 'card' ? ['#E6E0FF', '#FFD6E0'] : ['#FFFFFF', '#FFFFFF']}
            style={styles.paymentMethodGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <IconSymbol 
              name="creditcard" 
              size={24} 
              color={paymentMethod === 'card' ? "#8B5CF6" : "#666"} 
            />
            <ThemedText style={[
              styles.paymentMethodText,
              paymentMethod === 'card' && styles.selectedMethodText
            ]}>Credit/Debit Card</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.paymentMethod, paymentMethod === 'upi' && styles.selectedPayment]}
          onPress={() => setPaymentMethod('upi')}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={paymentMethod === 'upi' ? ['#E6E0FF', '#FFD6E0'] : ['#FFFFFF', '#FFFFFF']}
            style={styles.paymentMethodGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <IconSymbol 
              name="indianrupeesign" 
              size={24} 
              color={paymentMethod === 'upi' ? "#8B5CF6" : "#666"} 
            />
            <ThemedText style={[
              styles.paymentMethodText,
              paymentMethod === 'upi' && styles.selectedMethodText
            ]}>UPI</ThemedText>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.paymentMethod, paymentMethod === 'venue' && styles.selectedPayment]}
          onPress={() => setPaymentMethod('venue')}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={paymentMethod === 'venue' ? ['#E6E0FF', '#FFD6E0'] : ['#FFFFFF', '#FFFFFF']}
            style={[styles.paymentMethodGradient, { flexDirection: 'column', alignItems: 'flex-start' }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconSymbol 
                name="building.2" 
                size={24} 
                color={paymentMethod === 'venue' ? "#8B5CF6" : "#666"} 
              />
              <ThemedText style={[
                styles.paymentMethodText,
                paymentMethod === 'venue' && styles.selectedMethodText
              ]}>Pay at Venue</ThemedText>
            </View>
            {paymentMethod === 'venue' && (
              <ThemedText style={styles.paymentNoteText}>
                Pay in cash or card when our team arrives at the venue
              </ThemedText>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {paymentMethod === 'card' && (
        <View style={styles.paymentForm}>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={cardDetails.number}
            onChangeText={(text) => setCardDetails(prev => ({ ...prev, number: text }))}
            keyboardType="number-pad"
            maxLength={16}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChangeText={(text) => setCardDetails(prev => ({ ...prev, expiry: text }))}
              maxLength={5}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={cardDetails.cvv}
              onChangeText={(text) => setCardDetails(prev => ({ ...prev, cvv: text }))}
              keyboardType="number-pad"
              maxLength={3}
              secureTextEntry
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Name on Card"
            value={cardDetails.name}
            onChangeText={(text) => setCardDetails(prev => ({ ...prev, name: text }))}
          />
        </View>
      )}

      {paymentMethod === 'upi' && (
        <View style={styles.paymentForm}>
          <TextInput
            style={styles.input}
            placeholder="Enter UPI ID (e.g., name@upi)"
            value={upiId}
            onChangeText={setUpiId}
            autoCapitalize="none"
          />
        </View>
      )}
      
    </View>
  );

  const renderConfirmation = () => (
    <View style={styles.confirmationContainer}>
      <LinearGradient
        colors={['#E6E0FF', '#FFD6E0']}
        style={styles.confirmationIconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <IconSymbol name="checkmark.circle.fill" size={80} color="#10B981" />
      </LinearGradient>
      <ThemedText style={styles.confirmationTitle}>Booking Confirmed!</ThemedText>
      <ThemedText style={styles.confirmationText}>
        Your booking has been confirmed. You will receive a confirmation email shortly.
      </ThemedText>
      <TouchableOpacity 
        style={styles.homeButton}
        onPress={() => router.push('/(tabs)')}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={['#E6E0FF', '#FFD6E0']}
          style={styles.homeButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <ThemedText style={styles.homeButtonText}>Return to Home</ThemedText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progress}>
          <View style={[styles.progressStep, styles.progressStepActive]}>
            <ThemedText style={styles.progressText}>1. Booking</ThemedText>
          </View>
          <View style={[styles.progressStep, step >= 2 && styles.progressStepActive]}>
            <ThemedText style={styles.progressText}>2. Payment</ThemedText>
          </View>
          <View style={[styles.progressStep, step === 3 && styles.progressStepActive]}>
            <ThemedText style={styles.progressText}>3. Confirmation</ThemedText>
          </View>
        </View>

        {step === 1 && renderBookingForm()}
        {step === 2 && renderPayment()}
        {step === 3 && renderConfirmation()}
      </ScrollView>

      {step < 3 && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.continueButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.continueButtonText}>
                {step === 1 ? 'Continue to Payment' : 'Confirm & Pay'}
              </ThemedText>
              <IconSymbol name="arrow.right.circle.fill" size={24} color="#2D1B69" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  paymentForm: {
    marginTop: 16,
  },
  paymentNote: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  paymentNoteText: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
    lineHeight: 18,
  },
  selectedMethodText: {
    color: '#8B5CF6',
    fontWeight: '700',
  },
  paymentMethodGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  progress: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F5F3FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E0FF',
  },
  progressStep: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    opacity: 0.5,
  },
  progressStepActive: {
    opacity: 1,
    borderBottomWidth: 3,
    borderBottomColor: '#8B5CF6',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D1B69',
  },
  formContainer: {
    padding: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E6E0FF',
    color: '#000',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E6E0FF',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  continueButtonText: {
    color: '#2D1B69',
    fontSize: 18,
    fontWeight: '700',
  },
  paymentSummary: {
    backgroundColor: '#F5F3FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D1B69',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E6E0FF',
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E6E0FF',
    overflow: 'hidden',
  },
  selectedPayment: {
    borderColor: '#8B5CF6',
    borderWidth: 2,
  },
  paymentMethodText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#666',
    fontWeight: '500',
  },
  confirmationContainer: {
    padding: 32,
    alignItems: 'center',
  },
  confirmationIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  confirmationTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 16,
  },
  confirmationText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    lineHeight: 24,
  },
  homeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  homeButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  homeButtonText: {
    color: '#2D1B69',
    fontSize: 16,
    fontWeight: '700',
  },
});