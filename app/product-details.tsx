import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DECOR_PRODUCTS } from '@/constants/products';
import { Gradients } from '@/constants/theme';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { cartItems, addToCart, removeFromCart, toggleWishlist, isInWishlist } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Get product by ID from params, default to first product
  const productId = params.productId as string || '1';
  const product = DECOR_PRODUCTS.find(p => p.id === productId) || DECOR_PRODUCTS[0];

  // Check if product is in cart
  const isInCart = cartItems.some(item => item.productId === product.id);

  const handleAddToCart = () => {
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart(product.id);
      }
      setShowSuccessModal(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to add to cart');
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFromCart = () => {
    try {
      removeFromCart(product.id);
      Alert.alert('Success', 'Item removed from cart');
    } catch (error) {
      Alert.alert('Error', 'Failed to remove from cart');
      console.error('Error removing from cart:', error);
    }
  };

  const handleBookNow = () => {
    try {
      if (!isInCart) {
        for (let i = 0; i < quantity; i++) {
          addToCart(product.id);
        }
      }
      router.push('/booking-payment');
    } catch (error) {
      Alert.alert('Error', 'Failed to proceed to booking');
      console.error('Error booking:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <Image
            source={{ uri: product.images[selectedImageIndex] }}
            style={styles.mainImage}
            contentFit="cover"
          />
          
          {/* Discount Badge */}
          {product.discount && product.discount > 0 && (
            <View style={styles.discountBadge}>
              <ThemedText style={styles.discountText}>{product.discount}% OFF</ThemedText>
            </View>
          )}

          {/* Wishlist Button */}
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => toggleWishlist(product.id)}
            activeOpacity={0.7}
          >
            <IconSymbol
              name={isInWishlist(product.id) ? 'heart.fill' : 'heart'}
              size={24}
              color={isInWishlist(product.id) ? '#FF1E6C' : '#666'}
            />
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="chevron.left" size={24} color="#333" />
          </TouchableOpacity>

          {/* Image Thumbnails */}
          <View style={styles.thumbnailContainer}>
            {product.images.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: img }}
                  style={[
                    styles.thumbnail,
                    selectedImageIndex === index && styles.thumbnailActive
                  ]}
                  contentFit="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <ThemedText style={styles.title}>{product.title}</ThemedText>
              <View style={styles.categoryBadge}>
                <ThemedText style={styles.categoryText}>{product.category}</ThemedText>
              </View>
            </View>

            <View style={styles.ratingSection}>
              <View style={styles.ratingBadge}>
                <ThemedText style={styles.ratingText}>{product.rating} ★</ThemedText>
              </View>
              <ThemedText style={styles.reviewsText}>({product.reviews} reviews)</ThemedText>
            </View>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <ThemedText style={styles.price}>₹{product.price.toLocaleString()}</ThemedText>
              {product.discount && product.discount > 0 && (
                <ThemedText style={styles.originalPrice}>₹{product.originalPrice?.toLocaleString()}</ThemedText>
              )}
            </View>
            {product.inStock ? (
              <View style={styles.stockBadge}>
                <IconSymbol name="checkmark.circle.fill" size={16} color="#10B981" />
                <ThemedText style={styles.stockText}>In Stock</ThemedText>
              </View>
            ) : (
              <View style={[styles.stockBadge, styles.outOfStockBadge]}>
                <IconSymbol name="xmark.circle.fill" size={16} color="#EF4444" />
                <ThemedText style={[styles.stockText, styles.outOfStockText]}>Out of Stock</ThemedText>
              </View>
            )}
          </View>

          {/* Vendor Info */}
          <TouchableOpacity style={styles.vendorCard} activeOpacity={0.7}>
            <View style={styles.vendorInfo}>
              <View style={styles.vendorIcon}>
                <IconSymbol name="building.2.fill" size={24} color="#8B5CF6" />
              </View>
              <View style={styles.vendorDetails}>
                <ThemedText style={styles.vendorName}>{product.vendor.name}</ThemedText>
                <View style={styles.vendorStats}>
                  <ThemedText style={styles.vendorStat}>⭐ {product.vendor.rating}</ThemedText>
                  <ThemedText style={styles.vendorStat}>• {product.vendor.totalOrders} orders</ThemedText>
                </View>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#999" />
          </TouchableOpacity>

          {/* Description */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Description</ThemedText>
            <ThemedText style={styles.description}>{product.description}</ThemedText>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>What's Included</ThemedText>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <IconSymbol name="checkmark.circle.fill" size={20} color="#10B981" />
                <ThemedText style={styles.featureText}>{feature}</ThemedText>
              </View>
            ))}
          </View>

          {/* Quantity Selector */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Quantity</ThemedText>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                activeOpacity={0.7}
              >
                <IconSymbol name="minus" size={20} color="#8B5CF6" />
              </TouchableOpacity>
              <ThemedText style={styles.quantityText}>{quantity}</ThemedText>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
                activeOpacity={0.7}
              >
                <IconSymbol name="plus" size={20} color="#8B5CF6" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Spacer for bottom buttons */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        {isInCart ? (
          <TouchableOpacity
            style={styles.removeFromCartButton}
            onPress={handleRemoveFromCart}
            activeOpacity={0.7}
          >
            <IconSymbol name="trash" size={20} color="#FF1E6C" />
            <ThemedText style={styles.removeFromCartText}>Remove from Cart</ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            activeOpacity={0.7}
          >
            <IconSymbol name="cart.fill" size={20} color="#8B5CF6" />
            <ThemedText style={styles.addToCartText}>Add to Cart</ThemedText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={handleBookNow}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={Gradients.button as any}
            style={styles.bookNowGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <ThemedText style={styles.bookNowText}>Book Now</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.modalIconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol name="checkmark.circle.fill" size={60} color="#10B981" />
            </LinearGradient>
            <ThemedText style={styles.modalTitle}>Added to Cart!</ThemedText>
            <ThemedText style={styles.modalMessage}>
              {quantity} item(s) successfully added to your cart
            </ThemedText>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowSuccessModal(false);
                  router.back();
                }}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.modalButtonText}>Continue Shopping</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={() => {
                  setShowSuccessModal(false);
                  router.push('/cart');
                }}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['#E6E0FF', '#FFD6E0']}
                  style={styles.modalButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <ThemedText style={styles.modalButtonTextPrimary}>View Cart</ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageGallery: {
    position: 'relative',
  },
  mainImage: {
    width: width,
    height: width * 1.2,
    backgroundColor: '#F5F5F5',
  },
  discountBadge: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: '#FF1E6C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  wishlistButton: {
    position: 'absolute',
    top: 50,
    right: 80,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailActive: {
    borderColor: '#8B5CF6',
  },
  infoContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#2D1B69',
    lineHeight: 28,
  },
  categoryBadge: {
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBadge: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  reviewsText: {
    fontSize: 13,
    color: '#999',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D1B69',
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stockText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
  },
  outOfStockBadge: {},
  outOfStockText: {
    color: '#EF4444',
  },
  vendorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F3FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vendorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  vendorDetails: {
    flex: 1,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D1B69',
    marginBottom: 4,
  },
  vendorStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vendorStat: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 4,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D1B69',
    paddingHorizontal: 24,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F3FF',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  bookNowButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookNowGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
  },
  removeFromCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE6E6',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  removeFromCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF1E6C',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  modalButtons: {
    width: '100%',
    gap: 12,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E6E0FF',
  },
  modalButtonPrimary: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  modalButtonGradient: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  modalButtonTextPrimary: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
  },
});
