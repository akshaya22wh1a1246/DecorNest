import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  date: string;
  venue: string;
  specialRequests?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  items: OrderItem[];
  bookingDetails: BookingDetails;
  totalAmount: number;
}

export default function OrderDetailsScreen() {
  const { orderId } = useLocalSearchParams();
  const { orders = [], updateOrderStatus } = useApp();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <ThemedView style={styles.container}>
        <LinearGradient
          colors={['#FFD6E0', '#E6E0FF']}
          style={styles.notFoundContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.notFoundIconCircle}>
            <IconSymbol name="exclamationmark.circle.fill" size={64} color="#C4A1FF" />
          </View>
          <ThemedText style={styles.notFoundTitle}>Order Not Found</ThemedText>
          <ThemedText style={styles.notFoundText}>The order you're looking for doesn't exist</ThemedText>
          <TouchableOpacity 
            style={styles.backButtonWrapper}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.backButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="arrow.left" size={20} color="#2D1B69" />
              <ThemedText style={styles.backButtonText}>Go Back</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </ThemedView>
    );
  }

  const handleCancelOrder = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to cancel this order?');
      if (confirmed) {
        updateOrderStatus(order.id, 'cancelled');
        window.alert('Order cancelled successfully');
        router.back();
      }
    } else {
      Alert.alert(
        'Cancel Order',
        'Are you sure you want to cancel this order?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes, Cancel',
            style: 'destructive',
            onPress: () => {
              updateOrderStatus(order.id, 'cancelled');
              Alert.alert('Success', 'Order cancelled successfully', [
                {
                  text: 'OK',
                  onPress: () => router.back(),
                },
              ]);
            },
          },
        ]
      );
    }
  };

  const getStatusConfig = (status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    const configs = {
      pending: { 
        colors: ['#FEF3C7', '#FDE68A'] as const, 
        icon: 'clock.fill' as const,
        textColor: '#92400E',
        text: 'Pending Confirmation'
      },
      confirmed: { 
        colors: ['#D1FAE5', '#A7F3D0'] as const, 
        icon: 'checkmark.circle.fill' as const,
        textColor: '#065F46',
        text: 'Confirmed'
      },
      completed: { 
        colors: ['#DBEAFE', '#BFDBFE'] as const, 
        icon: 'checkmark.seal.fill' as const,
        textColor: '#1E40AF',
        text: 'Completed'
      },
      cancelled: { 
        colors: ['#FEE2E2', '#FECACA'] as const, 
        icon: 'xmark.circle.fill' as const,
        textColor: '#991B1B',
        text: 'Cancelled'
      },
    };
    return configs[status];
  };

  const statusConfig = getStatusConfig(order.status);

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Status */}
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
            <ThemedText style={styles.headerTitle}>Order Details</ThemedText>
            <ThemedText style={styles.orderIdText}>Order #{order.id.toString().slice(0, 8)}</ThemedText>
          </View>
          <LinearGradient
            colors={statusConfig.colors}
            style={styles.headerStatusBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <IconSymbol name={statusConfig.icon} size={16} color={statusConfig.textColor} />
            <ThemedText style={[styles.headerStatusText, { color: statusConfig.textColor }]}>
              {statusConfig.text}
            </ThemedText>
          </LinearGradient>
        </LinearGradient>

        {/* Event Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="calendar.badge.checkmark" size={24} color="#8B5CF6" />
            <ThemedText style={styles.sectionTitle}>Event Details</ThemedText>
          </View>
          <LinearGradient
            colors={['#FFFFFF', '#FAF5FF']}
            style={styles.detailsCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.detailRow}>
              <View style={styles.detailIconCircle}>
                <IconSymbol name="calendar" size={20} color="#8B5CF6" />
              </View>
              <View style={styles.detailContent}>
                <ThemedText style={styles.detailLabel}>Event Date</ThemedText>
                <ThemedText style={styles.detailText}>{order.bookingDetails.date}</ThemedText>
              </View>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailRow}>
              <View style={styles.detailIconCircle}>
                <IconSymbol name="location.fill" size={20} color="#8B5CF6" />
              </View>
              <View style={styles.detailContent}>
                <ThemedText style={styles.detailLabel}>Venue</ThemedText>
                <ThemedText style={styles.detailText}>{order.bookingDetails.venue}</ThemedText>
              </View>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailRow}>
              <View style={styles.detailIconCircle}>
                <IconSymbol name="person.fill" size={20} color="#8B5CF6" />
              </View>
              <View style={styles.detailContent}>
                <ThemedText style={styles.detailLabel}>Contact Name</ThemedText>
                <ThemedText style={styles.detailText}>{order.bookingDetails.name}</ThemedText>
              </View>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailRow}>
              <View style={styles.detailIconCircle}>
                <IconSymbol name="phone.fill" size={20} color="#8B5CF6" />
              </View>
              <View style={styles.detailContent}>
                <ThemedText style={styles.detailLabel}>Phone Number</ThemedText>
                <ThemedText style={styles.detailText}>{order.bookingDetails.phone}</ThemedText>
              </View>
            </View>
            {order.bookingDetails.specialRequests && (
              <>
                <View style={styles.detailDivider} />
                <View style={styles.detailRow}>
                  <View style={styles.detailIconCircle}>
                    <IconSymbol name="text.bubble.fill" size={20} color="#8B5CF6" />
                  </View>
                  <View style={styles.detailContent}>
                    <ThemedText style={styles.detailLabel}>Special Requests</ThemedText>
                    <ThemedText style={styles.detailText}>{order.bookingDetails.specialRequests}</ThemedText>
                  </View>
                </View>
              </>
            )}
          </LinearGradient>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="bag.fill" size={24} color="#8B5CF6" />
            <ThemedText style={styles.sectionTitle}>Order Items ({order.items.length})</ThemedText>
          </View>
          {order.items.map((item: OrderItem, index: number) => (
            <View key={item.productId || index} style={styles.itemCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                contentFit="cover"
              />
              <View style={styles.itemInfo}>
                <ThemedText style={styles.itemTitle} numberOfLines={2}>{item.title}</ThemedText>
                <View style={styles.itemMeta}>
                  <View style={styles.quantityBadge}>
                    <ThemedText style={styles.quantityText}>Qty: {item.quantity}</ThemedText>
                  </View>
                  <ThemedText style={styles.itemPrice}>₹{item.price.toLocaleString()}</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="creditcard.fill" size={24} color="#8B5CF6" />
            <ThemedText style={styles.sectionTitle}>Payment Summary</ThemedText>
          </View>
          <LinearGradient
            colors={['#FFFFFF', '#F5F3FF']}
            style={styles.paymentCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.paymentRow}>
              <ThemedText style={styles.paymentLabel}>Subtotal ({order.items.length} items)</ThemedText>
              <ThemedText style={styles.paymentValue}>₹{order.totalAmount.toLocaleString()}</ThemedText>
            </View>
            <View style={styles.paymentRow}>
              <ThemedText style={styles.paymentLabel}>Service Fee (5%)</ThemedText>
              <ThemedText style={styles.paymentValue}>₹{(order.totalAmount * 0.05).toFixed(2)}</ThemedText>
            </View>
            <View style={styles.paymentDivider} />
            <View style={styles.totalRow}>
              <ThemedText style={styles.totalLabel}>Total Amount</ThemedText>
              <LinearGradient
                colors={['#8B5CF6', '#C4A1FF']}
                style={styles.totalBadge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <ThemedText style={styles.totalAmount}>₹{(order.totalAmount * 1.05).toLocaleString()}</ThemedText>
              </LinearGradient>
            </View>

            <View style={styles.paymentMethodDivider} />

            <View style={styles.paymentMethodSection}>
              <ThemedText style={styles.paymentMethodTitle}>Contact Information</ThemedText>
              <View style={styles.paymentMethodCard}>
                <View style={styles.paymentIconCircle}>
                  <IconSymbol
                    name="envelope.fill"
                    size={24}
                    color="#8B5CF6"
                  />
                </View>
                <View style={styles.paymentMethodInfo}>
                  <ThemedText style={styles.paymentMethodText}>Email</ThemedText>
                  <ThemedText style={styles.paymentDetailText}>
                    {order.bookingDetails.email}
                  </ThemedText>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          {order.status !== 'cancelled' && order.status !== 'completed' && (
            <TouchableOpacity 
              style={styles.cancelButtonWrapper}
              onPress={handleCancelOrder}
              activeOpacity={0.8}
            >
              <View style={styles.cancelButton}>
                <IconSymbol name="xmark.circle" size={20} color="#EF4444" />
                <ThemedText style={styles.cancelButtonText}>Cancel Order</ThemedText>
              </View>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.supportButtonWrapper}
            onPress={() => router.push('/support')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.supportButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="headphones" size={20} color="#2D1B69" />
              <ThemedText style={styles.supportButtonText}>Contact Support</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
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
  
  // Not Found State
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  notFoundIconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  backButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 8,
  },
  backButtonText: {
    color: '#2D1B69',
    fontSize: 16,
    fontWeight: '600',
  },

  // Header
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  headerBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerContent: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
  },
  orderIdText: {
    fontSize: 14,
    color: '#666',
  },
  headerStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  headerStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Sections
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D1B69',
  },

  // Event Details
  detailsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  detailLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    color: '#2D1B69',
    fontWeight: '500',
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },

  // Order Items
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#F5F3FF',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityBadge: {
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 13,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 18,
    color: '#8B5CF6',
    fontWeight: '700',
  },

  // Payment Summary
  paymentCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 15,
    color: '#666',
  },
  paymentValue: {
    fontSize: 15,
    color: '#2D1B69',
    fontWeight: '500',
  },
  paymentDivider: {
    height: 1,
    backgroundColor: '#E6E0FF',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
  },
  totalBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  paymentMethodDivider: {
    height: 1,
    backgroundColor: '#E6E0FF',
    marginVertical: 20,
  },
  paymentMethodSection: {
    gap: 12,
  },
  paymentMethodTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  paymentIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentMethodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 4,
  },
  paymentDetailText: {
    fontSize: 14,
    color: '#666',
  },

  // Actions
  actionsSection: {
    paddingHorizontal: 16,
    marginTop: 32,
    gap: 12,
  },
  cancelButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  cancelButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  supportButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  supportButtonText: {
    color: '#2D1B69',
    fontSize: 16,
    fontWeight: '700',
  },

  bottomPadding: {
    height: 32,
  },
});