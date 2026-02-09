import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DECOR_PRODUCTS } from '@/constants/products';
import { useApp } from '@/context/app-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function VendorDashboardScreen() {
  const { user, orders } = useApp();
  const router = useRouter();

  const vendorProducts = useMemo(
    () => DECOR_PRODUCTS.filter((p) => p.vendor.id === user?.id),
    [user]
  );

  const vendorProductIds = useMemo(
    () => new Set(vendorProducts.map((p) => p.id)),
    [vendorProducts]
  );

  const { totalOrders, totalRevenue, recentVendorOrders } = useMemo(() => {
    let orderCount = 0;
    let revenue = 0;
    const recent: typeof orders = [];

    orders.forEach((order) => {
      const hasVendorItem = order.items.some((item) => vendorProductIds.has(item.productId));
      if (!hasVendorItem) return;
      orderCount += 1;
      order.items.forEach((item) => {
        if (vendorProductIds.has(item.productId)) {
          revenue += item.price * item.quantity;
        }
      });
      recent.push(order);
    });

    return {
      totalOrders: orderCount,
      totalRevenue: revenue,
      recentVendorOrders: recent,
    };
  }, [orders, vendorProductIds]);

  const renderProductCard = ({ item }: { item: (typeof vendorProducts)[0] }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.8}
      onPress={() => router.push({ pathname: '/product-details', params: { productId: item.id } })}
    >
      <View style={styles.productImagePlaceholder}>
        <ThemedText style={styles.productInitial}>
          {item.title.charAt(0).toUpperCase()}
        </ThemedText>
      </View>
      <View style={styles.productInfo}>
        <ThemedText style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.productMeta}>
          {item.category} • ₹{item.price.toLocaleString()}
        </ThemedText>
        <ThemedText style={styles.productMeta}>
          ⭐ {item.rating} ({item.reviews})
        </ThemedText>
      </View>
      <IconSymbol name="chevron.right" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const renderOrderCard = ({ item }: { item: (typeof orders)[0] }) => {
    const vendorItems = item.items.filter((orderItem) => vendorProductIds.has(orderItem.productId));
    const eventTitle = vendorItems.map((vi) => vi.title).join(', ');
    return (
      <TouchableOpacity
        style={styles.orderCard}
        activeOpacity={0.8}
        onPress={() => router.push({ pathname: '/order-details', params: { orderId: item.id } })}
      >
        <View style={styles.orderHeaderRow}>
          <ThemedText style={styles.orderId}>#{item.id.slice(-6)}</ThemedText>
          <View style={[styles.statusBadge, styles[`status_${item.status}` as const]]}>
            <ThemedText style={styles.statusText}>{item.status.toUpperCase()}</ThemedText>
          </View>
        </View>
        <ThemedText style={styles.orderTitle} numberOfLines={1}>
          {eventTitle || 'Decor package'}
        </ThemedText>
        <ThemedText style={styles.orderMeta}>
          {new Date(item.date).toLocaleDateString()} • {item.bookingDetails.venue}
        </ThemedText>
        <ThemedText style={styles.orderMeta}>
          {vendorItems.reduce((sum, vi) => sum + vi.quantity, 0)} item(s) • ₹
          {vendorItems.reduce((sum, vi) => sum + vi.price * vi.quantity, 0).toLocaleString()}
        </ThemedText>
      </TouchableOpacity>
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
        <View style={styles.headerTop}>
          <View style={styles.iconCircle}>
            <IconSymbol name="chart.bar.fill" size={26} color="#8B5CF6" />
          </View>
          <View style={styles.headerTextGroup}>
            <ThemedText style={styles.headerTitle}>Vendor Dashboard</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              {user?.name || 'Vendor'} • {vendorProducts.length} packages
            </ThemedText>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statLabel}>Orders</ThemedText>
            <ThemedText style={styles.statValue}>{totalOrders}</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statLabel}>Revenue</ThemedText>
            <ThemedText style={styles.statValue}>₹{totalRevenue.toLocaleString()}</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Your Packages</ThemedText>
          {vendorProducts.length === 0 ? (
            <ThemedText style={styles.emptyText}>
              No packages are linked to this vendor yet.
            </ThemedText>
          ) : (
            <FlatList
              data={vendorProducts}
              renderItem={renderProductCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recent Bookings</ThemedText>
          {recentVendorOrders.length === 0 ? (
            <ThemedText style={styles.emptyText}>
              When users book your themes, bookings will appear here.
            </ThemedText>
          ) : (
            <FlatList
              data={recentVendorOrders}
              renderItem={renderOrderCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: '#4B5563',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 12,
    marginRight: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  emptyText: {
    fontSize: 13,
    color: '#6B7280',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  productImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  productInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B5563',
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  productMeta: {
    fontSize: 12,
    color: '#6B7280',
  },
  orderCard: {
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  orderHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  status_pending: {
    backgroundColor: '#F97316',
  },
  status_confirmed: {
    backgroundColor: '#10B981',
  },
  status_completed: {
    backgroundColor: '#2563EB',
  },
  status_cancelled: {
    backgroundColor: '#EF4444',
  },
  orderTitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  orderMeta: {
    fontSize: 12,
    color: '#6B7280',
  },
});
