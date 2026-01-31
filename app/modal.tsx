import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { MOCK_PRODUCTS } from '@/constants/mock-data';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, removeFromCart, cartItems, toggleWishlist, isInWishlist } = useApp();

  const product = MOCK_PRODUCTS.find(p => p.id === params.productId);
  const isInCart = cartItems.some(item => item.productId === params.productId);
  
  if (!product) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Product not found</ThemedText>
      </ThemedView>
    );
  }

  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart(product.id);
      Alert.alert('Success', 'Item removed from cart!');
    } else {
      addToCart(product.id);
      Alert.alert('Success', 'Item added to cart!');
    }
  };

  const handleProceedToCheckout = () => {
    router.push('/cart');
  };

  const handleAddToWishlist = () => {
    toggleWishlist(product.id);
    Alert.alert(
      'Success', 
      isInWishlist(product.id) ? 'Item removed from wishlist!' : 'Item added to wishlist!'
    );
  };

  const handleBookNow = () => {
    addToCart(product.id);
    router.push('/booking-payment');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <ThemedText style={styles.title}>{product.title}</ThemedText>
              <ThemedText style={styles.category}>{product.category}</ThemedText>
            </View>
            <TouchableOpacity onPress={handleAddToWishlist} style={styles.wishlistButton}>
              <IconSymbol 
                name={isInWishlist(product.id) ? "heart.fill" : "heart"} 
                size={24} 
                color="#ff4444" 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.priceRow}>
            <ThemedText style={styles.price}>₹{product.price}</ThemedText>
            <View style={styles.ratingContainer}>
              <IconSymbol name="star.fill" size={16} color="#FFD700" />
              <ThemedText style={styles.rating}>{product.rating}</ThemedText>
            </View>
          </View>

          <View style={styles.vendorInfo}>
            <IconSymbol name="person.circle.fill" size={20} color="#666" />
            <ThemedText style={styles.vendorName}>{product.vendor.name}</ThemedText>
            <ThemedText style={styles.vendorRating}>⭐ {product.vendor.rating}</ThemedText>
          </View>

          {product.description && (
            <ThemedText style={styles.description}>{product.description}</ThemedText>
          )}

          {product.features && (
            <View style={styles.featuresContainer}>
              <ThemedText style={styles.featuresTitle}>What's Included</ThemedText>
              {product.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color="#2ecc71" />
                  <ThemedText style={styles.featureText}>{feature}</ThemedText>
                </View>
              ))}
            </View>
          )}

          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              onPress={() => setQuantity(q => Math.max(1, q - 1))}
              style={styles.quantityButton}
            >
              <IconSymbol name="minus" size={20} color="#666" />
            </TouchableOpacity>
            <ThemedText style={styles.quantity}>{quantity}</ThemedText>
            <TouchableOpacity 
              onPress={() => setQuantity(q => q + 1)}
              style={styles.quantityButton}
            >
              <IconSymbol name="plus" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            {isInCart ? (
              <>
                <TouchableOpacity 
                  style={[styles.button, styles.removeFromCartButton]} 
                  onPress={handleCartAction}
                >
                  <ThemedText style={[styles.buttonText, { color: '#ff4444' }]}>Remove from Cart</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.checkoutButton]}
                  onPress={handleProceedToCheckout}
                >
                  <ThemedText style={styles.buttonText}>Proceed to Checkout</ThemedText>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity 
                  style={[styles.button, styles.addToCartButton]} 
                  onPress={handleCartAction}
                >
                  <ThemedText style={[styles.buttonText, { color: '#000' }]}>Add to Cart</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.bookNowButton]}
                  onPress={handleBookNow}
                >
                  <ThemedText style={styles.buttonText}>Book Now</ThemedText>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    color: '#666',
  },
  wishlistButton: {
    padding: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2ecc71',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    marginLeft: 4,
    color: '#666',
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 16,
  },
  vendorName: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
  },
  vendorRating: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    color: '#444',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#444',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#f0f0f0',
  },
  removeFromCartButton: {
    backgroundColor: '#ffe5e5',
  },
  checkoutButton: {
    backgroundColor: '#2ecc71',
  },
  bookNowButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
