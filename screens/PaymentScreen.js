import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function PaymentScreen({ route, navigation }) {
  const { total = 0, items = [], method = 'card' } = route?.params || {};
  const { createOrder, clearCart, user, addresses } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress] = useState(new Animated.Value(0));

  // Card payment form
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // UPI form
  const [upiId, setUpiId] = useState('');

  // Net banking form
  const [selectedBank, setSelectedBank] = useState('');

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
  ];

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      setExpiryDate(cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4));
    } else {
      setExpiryDate(cleaned);
    }
  };

  const validateAndProceed = () => {
    if (method === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        Alert.alert('Error', 'Please fill in all card details');
        return;
      }
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        Alert.alert('Error', 'Invalid card number');
        return;
      }
      if (cvv.length !== 3) {
        Alert.alert('Error', 'Invalid CVV');
        return;
      }
    } else if (method === 'upi') {
      if (!upiId) {
        Alert.alert('Error', 'Please enter UPI ID');
        return;
      }
      if (!upiId.includes('@')) {
        Alert.alert('Error', 'Invalid UPI ID format');
        return;
      }
    } else if (method === 'netbanking') {
      if (!selectedBank) {
        Alert.alert('Error', 'Please select a bank');
        return;
      }
    }

    processPayment();
  };

  const processPayment = () => {
    setIsProcessing(true);

    // Animate progress bar
    Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      setIsProcessing(false);
      
      // Determine default address (if any) for order details
      const defaultAddress =
        (addresses || []).find((a) => a.isDefault) || (addresses || [])[0];

      const venue = defaultAddress
        ? `${defaultAddress.addressLine1}, ${defaultAddress.city} - ${defaultAddress.pincode}`
        : 'To be confirmed';

      // Create order with booking details
      const bookingDetails = {
        name: user?.name || 'Guest',
        email: user?.email || 'guest@example.com',
        phone: user?.phone || defaultAddress?.phone || 'N/A',
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
        venue,
        specialRequests: `Payment via ${method}`,
      };
      
      console.log('PaymentScreen - Creating order with bookingDetails:', bookingDetails);
      const order = createOrder(bookingDetails);
      console.log('PaymentScreen - Order created:', order);
      
      // Clear cart after small delay
      setTimeout(() => {
        console.log('PaymentScreen - Clearing cart');
        clearCart();
        console.log('PaymentScreen - Cart cleared');
      }, 50);
      
      // Show success alert after cart is cleared
      setTimeout(() => {
        Alert.alert(
          'Payment Successful! 🎉',
          'Your order has been placed successfully. Check "My Orders" to view details.',
          [
            {
              text: 'View Orders',
              onPress: () => {
                console.log('Navigating to Orders screen');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
                setTimeout(() => {
                  console.log('Now navigating to Orders');
                  navigation.navigate('Orders');
                }, 200);
              },
            },
            {
              text: 'OK',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
              },
            },
          ]
        );
      }, 100);
    }, 2500);
  };

  const renderCardForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.formTitle}>Card Details</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <View style={styles.inputContainer}>
          <IconSymbol name="creditcard" size={20} color="#8B5CF6" />
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            placeholderTextColor="#9CA3AF"
            value={cardNumber}
            onChangeText={formatCardNumber}
            keyboardType="numeric"
            maxLength={19}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Cardholder Name</Text>
        <View style={styles.inputContainer}>
          <IconSymbol name="person" size={20} color="#8B5CF6" />
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor="#9CA3AF"
            value={cardName}
            onChangeText={setCardName}
            autoCapitalize="words"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Expiry Date</Text>
          <View style={styles.inputContainer}>
            <IconSymbol name="calendar" size={20} color="#8B5CF6" />
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              placeholderTextColor="#9CA3AF"
              value={expiryDate}
              onChangeText={formatExpiry}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>CVV</Text>
          <View style={styles.inputContainer}>
            <IconSymbol name="lock.fill" size={20} color="#8B5CF6" />
            <TextInput
              style={styles.input}
              placeholder="123"
              placeholderTextColor="#9CA3AF"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderUpiForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.formTitle}>UPI Payment</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>UPI ID</Text>
        <View style={styles.inputContainer}>
          <IconSymbol name="qrcode" size={20} color="#10B981" />
          <TextInput
            style={styles.input}
            placeholder="yourname@upi"
            placeholderTextColor="#9CA3AF"
            value={upiId}
            onChangeText={setUpiId}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
      </View>

      <View style={styles.infoBox}>
        <IconSymbol name="info.circle.fill" size={20} color="#3B82F6" />
        <Text style={styles.infoText}>
          Enter your UPI ID to receive a payment request
        </Text>
      </View>
    </View>
  );

  const renderNetBankingForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.formTitle}>Select Your Bank</Text>

      {banks.map((bank) => (
        <TouchableOpacity
          key={bank}
          style={[
            styles.bankOption,
            selectedBank === bank && styles.bankOptionSelected,
          ]}
          onPress={() => setSelectedBank(bank)}
          activeOpacity={0.7}
        >
          <View style={styles.bankInfo}>
            <IconSymbol name="building.columns" size={24} color="#3B82F6" />
            <Text style={styles.bankName}>{bank}</Text>
          </View>
          <View
            style={[
              styles.radioOuter,
              selectedBank === bank && styles.radioOuterSelected,
            ]}
          >
            {selectedBank === bank && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderWalletForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.formTitle}>Wallet Payment</Text>
      <View style={styles.infoBox}>
        <IconSymbol name="wallet.pass.fill" size={20} color="#F59E0B" />
        <Text style={styles.infoText}>
          You will be redirected to your wallet app to complete the payment
        </Text>
      </View>
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
          disabled={isProcessing}
        >
          <IconSymbol name="chevron.left" size={24} color="#2D1B69" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Complete Payment</Text>
          <Text style={styles.headerSubtitle}>₹{total.toLocaleString()}</Text>
        </View>
      </LinearGradient>

      {isProcessing ? (
        <View style={styles.processingContainer}>
          <IconSymbol name="creditcard.fill" size={80} color="#8B5CF6" />
          <Text style={styles.processingTitle}>Processing Payment...</Text>
          <Text style={styles.processingSubtitle}>Please wait</Text>

          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {method === 'card' && renderCardForm()}
          {method === 'upi' && renderUpiForm()}
          {method === 'netbanking' && renderNetBankingForm()}
          {method === 'wallet' && renderWalletForm()}

          <View style={{ height: 120 }} />
        </ScrollView>
      )}

      {!isProcessing && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.payButtonWrapper}
            onPress={validateAndProceed}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.payButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="checkmark.circle.fill" size={24} color="#FFF" />
              <Text style={styles.payButtonText}>
                Pay ₹{total.toLocaleString()}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.secureText}>
            🔒 Your payment is secure and encrypted
          </Text>
        </View>
      )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  scrollView: {
    flex: 1,
  },
  formSection: {
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 20,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 12,
    fontSize: 15,
    color: '#1F2937',
  },
  row: {
    flexDirection: 'row',
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
  bankOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  bankOptionSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  bankName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#3B82F6',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
  },
  processingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  processingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginTop: 24,
    marginBottom: 8,
  },
  processingSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8B5CF6',
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  payButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 12,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secureText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
});
