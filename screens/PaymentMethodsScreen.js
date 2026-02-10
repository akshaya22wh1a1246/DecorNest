import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function PaymentMethodsScreen({ route, navigation }) {
  const { total = 0, items = [] } = route?.params || {};
  const { createOrder, clearCart, user, addresses } = useApp();
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      id: 'card',
      title: 'Credit/Debit Card',
      subtitle: 'Visa, Mastercard, Rupay',
      icon: 'creditcard.fill',
      color: '#8B5CF6',
    },
    {
      id: 'upi',
      title: 'UPI',
      subtitle: 'GPay, PhonePe, Paytm',
      icon: 'qrcode',
      color: '#10B981',
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      subtitle: 'All major banks',
      icon: 'building.columns.fill',
      color: '#3B82F6',
    },
    {
      id: 'wallet',
      title: 'Wallet',
      subtitle: 'Paytm, PhonePe, Amazon Pay',
      icon: 'wallet.pass.fill',
      color: '#F59E0B',
    },
    {
      id: 'cod',
      title: 'Cash on Delivery',
      subtitle: 'Pay when service is delivered',
      icon: 'banknote.fill',
      color: '#EF4444',
    },
  ];

  const handleProceedToPayment = () => {
    // Ensure we have customer contact details before placing any order
    if (!user?.phone || user.phone.length !== 10) {
      Alert.alert(
        'Add Mobile Number',
        'Please add your 10-digit mobile number in your profile before placing an order.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Update Profile',
            onPress: () => navigation.navigate('Profile'),
          },
        ]
      );
      return;
    }

    const hasAddress = Array.isArray(addresses) && addresses.length > 0;
    if (!hasAddress) {
      Alert.alert(
        'Add Delivery Address',
        'Please add at least one delivery address before placing an order.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Add Address',
            onPress: () => navigation.navigate('AddressManagement'),
          },
        ]
      );
      return;
    }

    if (!selectedMethod) {
      Alert.alert('Select Payment Method', 'Please select a payment method to continue');
      return;
    }

    if (selectedMethod === 'cod') {
      // For COD, create order directly without payment screen
      const defaultAddress =
        (addresses || []).find((a) => a.isDefault) || (addresses || [])[0];

      const venue = defaultAddress
        ? `${defaultAddress.addressLine1}, ${defaultAddress.city} - ${defaultAddress.pincode}`
        : 'To be confirmed';

      const bookingDetails = {
        name: user?.name || 'Guest',
        email: user?.email || 'guest@example.com',
        phone: user?.phone || defaultAddress?.phone || 'N/A',
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
        venue,
        specialRequests: 'Payment via COD',
      };
      
      console.log('PaymentMethodsScreen - Creating COD order');
      createOrder(bookingDetails);
      
      setTimeout(() => {
        clearCart();
        console.log('Cart cleared after COD order');
      }, 50);
      
      Alert.alert(
        'Order Confirmed!',
        'Your order has been placed successfully. You can pay cash when the service is delivered.',
        [
          {
            text: 'View Orders',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
              setTimeout(() => navigation.navigate('Orders'), 200);
            },
          },
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
      return;
    }

    // Navigate to payment processing screen
    navigation.navigate('Payment', {
      total,
      items,
      method: selectedMethod,
    });
  };

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
          <Text style={styles.headerTitle}>Payment Options</Text>
          <Text style={styles.headerSubtitle}>Choose your preferred payment method</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Amount Section */}
        <LinearGradient
          colors={['#F5F3FF', '#FAF5FF']}
          style={styles.amountCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>₹{total.toLocaleString()}</Text>
          <Text style={styles.itemCount}>{items.length} item(s)</Text>
        </LinearGradient>

        {/* Payment Methods */}
        <View style={styles.methodsSection}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.methodCardSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.methodIcon,
                  { backgroundColor: `${method.color}20` },
                ]}
              >
                <IconSymbol name={method.icon} size={28} color={method.color} />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
              </View>
              <View
                style={[
                  styles.radioOuter,
                  selectedMethod === method.id && styles.radioOuterSelected,
                ]}
              >
                {selectedMethod === method.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.proceedButtonWrapper}
          onPress={handleProceedToPayment}
          activeOpacity={0.8}
          disabled={!selectedMethod}
        >
          <LinearGradient
            colors={
              selectedMethod
                ? ['#E6E0FF', '#FFD6E0']
                : ['#E5E7EB', '#D1D5DB']
            }
            style={styles.proceedButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text
              style={[
                styles.proceedButtonText,
                !selectedMethod && styles.proceedButtonTextDisabled,
              ]}
            >
              Proceed to Pay ₹{total.toLocaleString()}
            </Text>
            <IconSymbol
              name="arrow.right"
              size={20}
              color={selectedMethod ? '#2D1B69' : '#9CA3AF'}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    fontSize: 28,
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
  amountCard: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 13,
    color: '#8B5CF6',
  },
  methodsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodCardSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F5F3FF',
  },
  methodIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodInfo: {
    flex: 1,
    marginLeft: 16,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 2,
  },
  methodSubtitle: {
    fontSize: 13,
    color: '#666',
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
    borderColor: '#8B5CF6',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
  proceedButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  proceedButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2D1B69',
  },
  proceedButtonTextDisabled: {
    color: '#9CA3AF',
  },
});
