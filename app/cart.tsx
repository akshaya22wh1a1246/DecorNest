import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DECOR_PRODUCTS } from '@/constants/products';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateCartQuantity } = useApp();
  const cartItemsWithProducts = cartItems.map(item => ({
    ...item,
    product: DECOR_PRODUCTS.find(p => p.id === item.productId)!
  }));

  const totalAmount = cartItemsWithProducts.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    router.push('/booking-payment');
  };

  const handleRemoveItem = (productId: string) => {
    try {
      removeFromCart(productId);
      Alert.alert('Success', 'Item removed from cart');
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item from cart');
      console.error('Error removing item from cart:', error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <LinearGradient
          colors={['#E6E0FF', '#FFD6E0']}
          style={styles.emptyIconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <IconSymbol name="cart" size={64} color="#8B5CF6" />
        </LinearGradient>
        <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
        <ThemedText style={styles.emptySubtext}>Add items to get started</ThemedText>
        <TouchableOpacity 
          style={styles.shopButton}
          onPress={() => router.push('/(tabs)/explore')}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#E6E0FF', '#FFD6E0']}
            style={styles.shopButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <ThemedText style={styles.shopButtonText}>Start Shopping</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.header}>Shopping Cart ({cartItems.length})</ThemedText>
        {cartItemsWithProducts.map(({ product, quantity }) => (
          <View key={product.id} style={styles.cartItem}>
            <TouchableOpacity
              style={styles.productContent}
              onPress={() => router.push({ pathname: '/product-details', params: { productId: product.id } })}
              activeOpacity={0.7}
            >
              <Image
                source={typeof product.image === 'number' ? product.image : { uri: product.image }}
                style={styles.productImage}
                contentFit="cover"
              />
              <View style={styles.productInfo}>
                <ThemedText style={styles.productTitle} numberOfLines={2}>{product.title}</ThemedText>
                <ThemedText style={styles.vendorName}>{product.vendor.name}</ThemedText>
                <View style={styles.priceRow}>
                  <ThemedText style={styles.productPrice}>₹{product.price.toLocaleString()}</ThemedText>
                  {product.discount > 0 && (
                    <View style={styles.discountBadge}>
                      <ThemedText style={styles.discountText}>{product.discount}% OFF</ThemedText>
                    </View>
                  )}
                </View>
                <View style={styles.quantityRow}>
                  <ThemedText style={styles.quantity}>Qty: {quantity}</ThemedText>
                  <ThemedText style={styles.itemTotal}>₹{(product.price * quantity).toLocaleString()}</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handleRemoveItem(product.id)}
              style={styles.removeButton}
              activeOpacity={0.7}
            >
              <IconSymbol name="trash" size={22} color="#FF1E6C" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <ThemedText style={styles.totalLabel}>Total Amount</ThemedText>
          <ThemedText style={styles.totalAmount}>₹{totalAmount.toLocaleString()}</ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={handleCheckout}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#E6E0FF', '#FFD6E0']}
            style={styles.checkoutButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <ThemedText style={styles.checkoutButtonText}>Proceed to Checkout</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#666',
    marginBottom: 32,
  },
  shopButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shopButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  shopButtonText: {
    color: '#2D1B69',
    fontSize: 16,
    fontWeight: '700',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  productContent: {
    flex: 1,
    flexDirection: 'row',
  },
  productImage: {
    width: 120,
    height: 140,
    backgroundColor: '#F5F5F5',
  },
  productInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B69',
    lineHeight: 20,
  },
  vendorName: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
  },
  discountBadge: {
    backgroundColor: '#FF1E6C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  removeButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
  },
  checkoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  checkoutButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#2D1B69',
    fontSize: 18,
    fontWeight: '700',
  },
});