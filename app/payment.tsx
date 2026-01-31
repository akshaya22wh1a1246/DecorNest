import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const MOCK_PAYMENT_METHODS = [
  { id: 'card', title: 'Credit/Debit Card', icon: 'creditcard' as keyof typeof IconSymbol },
  { id: 'upi', title: 'UPI', icon: 'banknote' as keyof typeof IconSymbol },
  { id: 'netbanking', title: 'Net Banking', icon: 'building.columns' as keyof typeof IconSymbol },
];

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const amount = typeof params.amount === 'string' ? parseFloat(params.amount) : 0;
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handlePayment = () => {
    // Validate card details if card payment is selected
    if (selectedMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        Alert.alert('Error', 'Please fill in all card details');
        return;
      }
    }

    Alert.alert(
      'Confirm Payment',
      `Proceed with payment of ₹${amount.toFixed(2)}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Show loading spinner
            Alert.alert('Processing...', 'Please wait while we process your payment.');
            
            // Simulate payment processing
            setTimeout(() => {
              Alert.alert(
                'Payment Successful',
                'Thank you for your purchase! Your order has been confirmed.',
                [
                  {
                    text: 'View Order',
                    onPress: () => router.push('/booking'),
                  },
                  {
                    text: 'Continue Shopping',
                    onPress: () => router.push('/(tabs)'),
                  }
                ]
              );
            }, 2000);
          }
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.amountContainer}>
            <ThemedText style={styles.amountLabel}>Amount to Pay</ThemedText>
            <ThemedText style={styles.amount}>₹{amount.toFixed(2)}</ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
            {MOCK_PAYMENT_METHODS.map(method => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodOption,
                  selectedMethod === method.id && styles.methodOptionSelected,
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <IconSymbol name={method.icon} size={24} color="#666" />
                <ThemedText style={styles.methodTitle}>{method.title}</ThemedText>
                {selectedMethod === method.id && (
                  <IconSymbol name="checkmark.circle.fill" size={24} color="#2ecc71" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {selectedMethod === 'card' && (
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Card Details</ThemedText>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Card Number</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                  maxLength={19}
                  value={cardDetails.number}
                  onChangeText={text => setCardDetails({ ...cardDetails, number: text })}
                />
              </View>
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <ThemedText style={styles.label}>Expiry</ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    maxLength={5}
                    value={cardDetails.expiry}
                    onChangeText={text => setCardDetails({ ...cardDetails, expiry: text })}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <ThemedText style={styles.label}>CVV</ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    maxLength={3}
                    secureTextEntry
                    value={cardDetails.cvv}
                    onChangeText={text => setCardDetails({ ...cardDetails, cvv: text })}
                  />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Cardholder Name</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Enter name as on card"
                  placeholderTextColor="#999"
                  value={cardDetails.name}
                  onChangeText={text => setCardDetails({ ...cardDetails, name: text })}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePayment}
        >
          <ThemedText style={styles.payButtonText}>Pay Now</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  methodOptionSelected: {
    backgroundColor: '#e8f8f1',
    borderColor: '#2ecc71',
    borderWidth: 1,
  },
  methodTitle: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  payButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});