import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Shared products from HomeScreen
let sharedProducts = [];

export const setCartProducts = (products) => {
  sharedProducts = products;
};

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, updateCartQuantity } = useApp();
  const [allProducts, setAllProducts] = useState(sharedProducts);
  
  useEffect(() => {
    setAllProducts(sharedProducts);
  }, []);
  
  const cartProducts = cartItems.map(cartItem => {
    const product = allProducts.find(p => p.id === cartItem.productId);
    return { ...product, quantity: cartItem.quantity };
  }).filter(item => item.id);

  // Calculate total from cartProducts
  const calculateTotal = () => {
    return cartProducts.reduce((total, item) => {
      return total + (item.price || 0) * (item.quantity || 1);
    }, 0);
  };

  const handleRemoveItem = (productId) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => removeFromCart(productId), style: 'destructive' }
      ]
    );
  };

  const handleCheckout = () => {
    if (cartProducts.length === 0) return;
    
    const total = calculateTotal();
    
    Alert.alert(
      'Checkout',
      `Total: ₹${total.toLocaleString()}\n\nProceed to payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Proceed', onPress: () => {
          // Navigate to payment options screen
          navigation.navigate('PaymentMethods', { total, items: cartProducts });
        }}
      ]
    );
  };

  const renderProduct = ({ item }) => (
    <View style={styles.cartItem}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
        activeOpacity={0.9}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          contentFit="cover"
        />
      </TouchableOpacity>
      
      <View style={styles.productDetails}>
        <View style={styles.productHeader}>
          <View style={styles.productInfo}>
            <Text style={styles.organizerName} numberOfLines={1}>{item.organizer}</Text>
            <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => handleRemoveItem(item.id)}
            style={styles.removeBtn}>
            <IconSymbol name="trash" size={20} color="#FF1E6C" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
          <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</Text>
        </View>
        
        <View style={styles.quantityRow}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity 
              style={styles.quantityBtn}
              onPress={() => updateCartQuantity(item.id, item.quantity - 1)}>
              <Text style={styles.quantityBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityBtn}
              onPress={() => updateCartQuantity(item.id, item.quantity + 1)}>
              <Text style={styles.quantityBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.subtotal}>
          Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
        </Text>
      </View>
    </View>
  );

  if (cartProducts.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.emptyContent}>
          <View style={styles.emptyIconContainer}>
            <IconSymbol name="cart" size={80} color="#E0E0E0" />
          </View>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Add decorations to your cart to get started!
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.browseGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}>
              <Text style={styles.browseText}>Start Shopping</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{cartProducts.length} items</Text>
      </View>
      
      <FlatList
        data={cartProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      
      {/* Bottom Checkout Section */}
      <View style={styles.checkoutContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>₹{calculateTotal().toLocaleString()}</Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={handleCheckout}>
          <LinearGradient
            colors={['#E6E0FF', '#FFD6E0']}
            style={styles.checkoutGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            <IconSymbol name="arrow.right.circle.fill" size={20} color="#8B5CF6" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContent: {
    padding: 12,
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    lineHeight: 18,
  },
  removeBtn: {
    padding: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  quantityLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  quantityBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  quantityBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginTop: 8,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginRight: 8,
  },
  emptyContent: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyIconContainer: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  browseButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  browseGradient: {
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  browseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
});
