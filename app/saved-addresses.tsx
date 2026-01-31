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

const MOCK_ADDRESSES = [
  {
    id: '1',
    type: 'Home',
    name: 'John Doe',
    address: '123 Main Street, Apartment 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 9876543210',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Work',
    name: 'John Doe',
    address: '456 Business Park, Floor 3',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400002',
    phone: '+91 9876543210',
    isDefault: false,
  },
];

export default function SavedAddressesScreen() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);

  const handleDelete = (id: string) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to delete this address?');
      if (confirmed) {
        setAddresses(addresses.filter(addr => addr.id !== id));
        window.alert('Address deleted successfully');
      }
    } else {
      Alert.alert(
        'Delete Address',
        'Are you sure you want to delete this address?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              setAddresses(addresses.filter(addr => addr.id !== id));
              Alert.alert('Success', 'Address deleted successfully');
            },
          },
        ]
      );
    }
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
            <IconSymbol name="location.fill" size={48} color="#8B5CF6" />
          </View>
          <ThemedText style={styles.headerTitle}>Saved Addresses</ThemedText>
          <ThemedText style={styles.headerSubtitle}>{addresses.length} addresses saved</ThemedText>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.addressTypeWrapper}>
                  <View style={[
                    styles.typeIconCircle,
                    { backgroundColor: address.type === 'Home' ? '#F0FDF4' : '#EFF6FF' }
                  ]}>
                    <IconSymbol 
                      name={address.type === 'Home' ? 'house.fill' : 'building.2.fill'} 
                      size={20} 
                      color={address.type === 'Home' ? '#10B981' : '#3B82F6'} 
                    />
                  </View>
                  <ThemedText style={styles.addressType}>{address.type}</ThemedText>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <ThemedText style={styles.defaultText}>Default</ThemedText>
                    </View>
                  )}
                </View>
                <TouchableOpacity onPress={() => handleDelete(address.id)}>
                  <IconSymbol name="trash.fill" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>

              <View style={styles.addressDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol name="person.fill" size={16} color="#666" />
                  <ThemedText style={styles.detailText}>{address.name}</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="mappin.circle.fill" size={16} color="#666" />
                  <ThemedText style={styles.detailText}>{address.address}</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="location.circle.fill" size={16} color="#666" />
                  <ThemedText style={styles.detailText}>
                    {address.city}, {address.state} - {address.pincode}
                  </ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="phone.fill" size={16} color="#666" />
                  <ThemedText style={styles.detailText}>{address.phone}</ThemedText>
                </View>
              </View>

              <View style={styles.addressActions}>
                <TouchableOpacity style={styles.editButton}>
                  <IconSymbol name="pencil" size={16} color="#8B5CF6" />
                  <ThemedText style={styles.editButtonText}>Edit</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addButtonWrapper} activeOpacity={0.8}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.addButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="plus.circle.fill" size={20} color="#2D1B69" />
              <ThemedText style={styles.addButtonText}>Add New Address</ThemedText>
            </LinearGradient>
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
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E0FF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addressTypeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  typeIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressType: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
  },
  defaultBadge: {
    backgroundColor: '#FFD6E0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FF1E6C',
  },
  addressDetails: {
    gap: 10,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  addressActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F5F3FF',
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
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
});
