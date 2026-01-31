import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

const MOCK_CARDS = [
  {
    id: '1',
    type: 'Visa',
    last4: '4242',
    expiry: '12/25',
    holder: 'John Doe',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Mastercard',
    last4: '8888',
    expiry: '06/26',
    holder: 'John Doe',
    isDefault: false,
  },
];

const UPI_IDS = ['johndoe@paytm', 'john.doe@oksbi'];

export default function PaymentMethodsScreen() {
  const [cards, setCards] = useState(MOCK_CARDS);
  const [upiIds, setUpiIds] = useState(UPI_IDS);

  const handleDeleteCard = (id: string) => {
    showAlert('Success', 'Card removed successfully');
  };

  const handleDeleteUpi = (upi: string) => {
    showAlert('Success', 'UPI ID removed successfully');
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
            <IconSymbol name="creditcard.fill" size={48} color="#F59E0B" />
          </View>
          <ThemedText style={styles.headerTitle}>Payment Methods</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Manage your saved payment methods</ThemedText>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Saved Cards */}
          <ThemedText style={styles.sectionTitle}>Saved Cards</ThemedText>
          
          {cards.map((card) => (
            <LinearGradient
              key={card.id}
              colors={card.type === 'Visa' ? ['#4F46E5', '#7C3AED'] : ['#DC2626', '#F97316']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <ThemedText style={styles.cardType}>{card.type}</ThemedText>
                {card.isDefault && (
                  <View style={styles.defaultBadge}>
                    <ThemedText style={styles.defaultText}>Default</ThemedText>
                  </View>
                )}
              </View>
              <ThemedText style={styles.cardNumber}>•••• •••• •••• {card.last4}</ThemedText>
              <View style={styles.cardFooter}>
                <View>
                  <ThemedText style={styles.cardLabel}>Card Holder</ThemedText>
                  <ThemedText style={styles.cardValue}>{card.holder}</ThemedText>
                </View>
                <View>
                  <ThemedText style={styles.cardLabel}>Expires</ThemedText>
                  <ThemedText style={styles.cardValue}>{card.expiry}</ThemedText>
                </View>
                <TouchableOpacity onPress={() => handleDeleteCard(card.id)}>
                  <IconSymbol name="trash.fill" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          ))}

          <TouchableOpacity style={styles.addButtonWrapper} activeOpacity={0.8}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.addButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="plus.circle.fill" size={20} color="#2D1B69" />
              <ThemedText style={styles.addButtonText}>Add New Card</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          {/* UPI IDs */}
          <ThemedText style={[styles.sectionTitle, { marginTop: 24 }]}>UPI IDs</ThemedText>
          
          {upiIds.map((upi, index) => (
            <View key={index} style={styles.upiCard}>
              <View style={styles.upiLeft}>
                <View style={styles.upiIconCircle}>
                  <IconSymbol name="indianrupeesign.circle.fill" size={24} color="#8B5CF6" />
                </View>
                <ThemedText style={styles.upiText}>{upi}</ThemedText>
              </View>
              <TouchableOpacity onPress={() => handleDeleteUpi(upi)}>
                <IconSymbol name="trash.fill" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.addButtonWrapper} activeOpacity={0.8}>
            <View style={styles.addButtonOutline}>
              <IconSymbol name="plus.circle" size={20} color="#8B5CF6" />
              <ThemedText style={styles.addButtonOutlineText}>Add UPI ID</ThemedText>
            </View>
          </TouchableOpacity>
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
  cardGradient: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardType: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  defaultBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  upiCard: {
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
  upiLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  upiIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upiText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
  },
  addButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  addButtonText: {
    color: '#2D1B69',
    fontSize: 16,
    fontWeight: '700',
  },
  addButtonOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 12,
  },
  addButtonOutlineText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '700',
  },
});
