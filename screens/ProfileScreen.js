import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  const { user, logout, updateProfile, cartItems, wishlistItems, orders } = useApp();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  const menuItems = [
    {
      id: 'orders',
      title: 'My Orders',
      subtitle: `${orders?.length || 0} orders`,
      icon: 'bag.fill',
      color: '#8B5CF6',
      onPress: () => navigation.navigate('Orders'),
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      subtitle: `${wishlistItems?.length || 0} items`,
      icon: 'heart.fill',
      color: '#EF4444',
      onPress: () => navigation.navigate('Wishlist'),
    },
    {
      id: 'cart',
      title: 'Cart',
      subtitle: `${cartItems?.length || 0} items`,
      icon: 'cart.fill',
      color: '#10B981',
      onPress: () => navigation.navigate('Cart'),
    },
    {
      id: 'addresses',
      title: 'Saved Addresses',
      subtitle: 'Manage delivery locations',
      icon: 'location.fill',
      color: '#F59E0B',
      onPress: () => navigation.navigate('AddressManagement'),
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      subtitle: 'Cards, UPI & wallets',
      icon: 'creditcard.fill',
      color: '#3B82F6',
      onPress: () => navigation.navigate('PaymentMethods', { fromProfile: true }),
    },
    {
      id: 'support',
      title: 'Help & Support',
      subtitle: 'Get assistance',
      icon: 'questionmark.circle.fill',
      color: '#6366F1',
      onPress: () => navigation.navigate('HelpSupport'),
    },
  ];

  const handleSaveProfile = () => {
    if (!editForm.name) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    if (editForm.phone && editForm.phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    updateProfile(editForm);
    setShowEditModal(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header with Profile Card */}
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

        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {user?.phone && <Text style={styles.userPhone}>📱 {user.phone}</Text>}

          <TouchableOpacity
            style={styles.editButtonWrapper}
            onPress={() => setShowEditModal(true)}
            activeOpacity={0.8}
          >
            <View style={styles.editButton}>
              <IconSymbol name="pencil.circle.fill" size={20} color="#8B5CF6" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Menu Items */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                <IconSymbol name={item.icon} size={24} color={item.color} />
              </View>
              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Actions</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout} activeOpacity={0.7}>
            <View style={[styles.menuIcon, { backgroundColor: '#FEE2E2' }]}>
              <IconSymbol name="arrow.right.square.fill" size={24} color="#EF4444" />
            </View>
            <View style={styles.menuInfo}>
              <Text style={[styles.menuTitle, { color: '#EF4444' }]}>Logout</Text>
              <Text style={styles.menuSubtitle}>Sign out of your account</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Decor Nest v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2026 Decor Nest. All rights reserved.</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name *</Text>
                <View style={styles.inputContainer}>
                  <IconSymbol name="person.fill" size={20} color="#8B5CF6" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#9CA3AF"
                    value={editForm.name}
                    onChangeText={(text) => setEditForm({ ...editForm, name: text })}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={[styles.inputContainer, styles.inputDisabled]}>
                  <IconSymbol name="envelope.fill" size={20} color="#9CA3AF" />
                  <TextInput
                    style={[styles.input, { color: '#9CA3AF' }]}
                    value={editForm.email}
                    editable={false}
                  />
                </View>
                <Text style={styles.inputHint}>Email cannot be changed</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputContainer}>
                  <IconSymbol name="phone.fill" size={20} color="#8B5CF6" />
                  <TextInput
                    style={styles.input}
                    placeholder="10-digit phone number"
                    placeholderTextColor="#9CA3AF"
                    value={editForm.phone}
                    onChangeText={(text) => setEditForm({ ...editForm, phone: text.replace(/\D/g, '') })}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowEditModal(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButtonWrapper}
                onPress={handleSaveProfile}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#E6E0FF', '#FFD6E0']}
                  style={styles.saveButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#C4A1FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  backButton: {
    marginBottom: 20,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#8B5CF6',
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
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#8B5CF6',
    marginBottom: 16,
  },
  editButtonWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  scrollView: {
    flex: 1,
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuInfo: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  appVersion: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D1B69',
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
  inputDisabled: {
    backgroundColor: '#F3F4F6',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 12,
    fontSize: 15,
    color: '#1F2937',
  },
  inputHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
    fontStyle: 'italic',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveButtonWrapper: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
  },
});
