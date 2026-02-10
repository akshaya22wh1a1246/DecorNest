import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function OrdersScreen() {
  const { orders = [] } = useApp();

  if (orders.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <LinearGradient
          colors={['#FFD6E0', '#E6E0FF']}
          style={styles.emptyContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.emptyIconContainer}>
            <IconSymbol name="bag.fill" size={80} color="#C4A1FF" />
          </View>
          <ThemedText style={styles.emptyTitle}>No Orders Yet</ThemedText>
          <ThemedText style={styles.emptyText}>
            Start exploring amazing décor packages and book your dream event setup
          </ThemedText>
          <TouchableOpacity 
            style={styles.exploreButtonWrapper}
            onPress={() => router.push('/(tabs)/explore')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.exploreButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="sparkles" size={20} color="#2D1B69" />
              <ThemedText style={styles.exploreButtonText}>Start Shopping</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </ThemedView>
    );
  }

  const renderOrderStatus = (status) => {
    const statusConfig = {
      pending: { 
        colors: ['#FEF3C7', '#FDE68A'], 
        icon: 'clock.fill',
        textColor: '#92400E'
      },
      confirmed: { 
        colors: ['#D1FAE5', '#A7F3D0'], 
        icon: 'checkmark.circle.fill',
        textColor: '#065F46'
      },
      completed: { 
        colors: ['#DBEAFE', '#BFDBFE'], 
        icon: 'checkmark.seal.fill',
        textColor: '#1E40AF'
      },
      cancelled: { 
        colors: ['#FEE2E2', '#FECACA'], 
        icon: 'xmark.circle.fill',
        textColor: '#991B1B'
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <LinearGradient
        colors={config.colors}
        style={styles.statusBadge}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <IconSymbol name={config.icon} size={14} color={config.textColor} />
        <ThemedText style={[styles.statusText, { color: config.textColor }]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </ThemedText>
      </LinearGradient>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#E6E0FF', '#FFD6E0']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ThemedText style={styles.headerTitle}>My Orders</ThemedText>
        <ThemedText style={styles.headerSubtitle}>{orders.length} {orders.length === 1 ? 'order' : 'orders'}</ThemedText>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <TouchableOpacity 
            key={order.id}
            style={styles.orderCard}
            onPress={() => router.push({
              pathname: '/order-details',
              params: { orderId: order.id }
            })}
            activeOpacity={0.7}
          >
            <View style={styles.orderHeader}>
              <View style={styles.orderHeaderLeft}>
                <View style={styles.orderIconCircle}>
                  <IconSymbol name="bag.fill" size={24} color="#8B5CF6" />
                </View>
                <View>
                  <ThemedText style={styles.orderTitle}>Order #{order.id.slice(0, 8)}</ThemedText>
                  <View style={styles.orderDateRow}>
                    <IconSymbol name="calendar" size={14} color="#999" />
                    <ThemedText style={styles.orderDate}>{order.date}</ThemedText>
                  </View>
                </View>
              </View>
              {renderOrderStatus(order.status)}
            </View>

            <View style={styles.divider} />

            <View style={styles.orderItems}>
              {order.items.map((item, index) => {
                const imgSrc = item.image || item.images?.[0];
                return (
                <View key={item.id || index} style={styles.itemRow}>
                  <Image
                    source={typeof imgSrc === 'number' ? imgSrc : { uri: imgSrc }}
                    style={styles.itemImage}
                    contentFit="cover"
                  />
                  <View style={styles.itemInfo}>
                    <ThemedText style={styles.itemTitle} numberOfLines={1}>{item.title}</ThemedText>
                    <View style={styles.itemMeta}>
                      <ThemedText style={styles.itemQuantity}>Qty: {item.quantity}</ThemedText>
                      <ThemedText style={styles.itemPrice}>₹{item.price}</ThemedText>
                    </View>
                  </View>
                </View>
              );
              })}
            </View>

            <View style={styles.divider} />

            <View style={styles.orderFooter}>
              <LinearGradient
                colors={['#F5F3FF', '#FAF5FF']}
                style={styles.eventDetails}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <IconSymbol name="calendar.badge.checkmark" size={16} color="#8B5CF6" />
                <ThemedText style={styles.eventText}>
                  {order.bookingDetails.date} • {order.bookingDetails.venue}
                </ThemedText>
              </LinearGradient>
              
              <View style={styles.totalContainer}>
                <ThemedText style={styles.totalLabel}>Total Amount</ThemedText>
                <ThemedText style={styles.totalAmount}>₹{order.totalAmount}</ThemedText>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.viewDetailsButton} 
              activeOpacity={0.7}
              onPress={() => router.push({
                pathname: '/order-details',
                params: { orderId: order.id }
              })}
            >
              <ThemedText style={styles.viewDetailsText}>View Details</ThemedText>
              <IconSymbol name="chevron.right" size={16} color="#8B5CF6" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 24,
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
  
  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  exploreButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    gap: 8,
  },
  exploreButtonText: {
    color: '#2D1B69',
    fontSize: 16,
    fontWeight: '700',
  },
  
  // Order Card
  orderCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6E0FF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
  },
  orderDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderDate: {
    fontSize: 13,
    color: '#999',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  
  // Order Items
  orderItems: {
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F3FF',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 6,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemQuantity: {
    fontSize: 13,
    color: '#999',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  
  // Order Footer
  orderFooter: {
    gap: 12,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  eventText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    color: '#999',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D1B69',
  },
  
  // View Details Button
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  
  bottomPadding: {
    height: 24,
  },
});