import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { useApp } from '@/context/app-context';

const { width } = Dimensions.get('window');

// Import products from HomeScreen context
let allProducts = [];
export const setAllProducts = (products) => {
  allProducts = products;
};

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, cartItems } = useApp();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.image);

  // Get similar products from same category
  const similarProducts = allProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const handleAddToBag = () => {
    // Add product to cart with specified quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    Alert.alert(
      'Added to Bag',
      `${quantity} x ${product.title} has been added to your bag!`,
      [
        { text: 'Continue Shopping', style: 'default' },
        { text: 'View Cart', onPress: () => navigation.navigate('Cart') }
      ]
    );
  };

  const handleBuyNow = () => {
    // Add to cart and navigate to cart/checkout
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    navigation.navigate('Cart');
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: selectedImage || product.image }}
            style={styles.mainImage}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={200}
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <View style={styles.discountBadgeTop}>
              <Text style={styles.discountBadgeText}>{product.discount}% OFF</Text>
            </View>
          )}
        </View>

        {/* Product Info Section */}
        <View style={styles.contentContainer}>
          {/* Brand/Organizer */}
          <Text style={styles.brandName}>{product.organizer || 'Decor Nest'}</Text>
          
          {/* Title */}
          <Text style={styles.title}>{product.title}</Text>
          
          {/* Rating & Reviews */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{product.rating || 4.5} ⭐</Text>
            </View>
            <Text style={styles.reviewsText}>
              {product.reviews || 0} ratings
            </Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price?.toLocaleString()}</Text>
            {product.originalPrice && (
              <>
                <Text style={styles.originalPrice}>₹{product.originalPrice?.toLocaleString()}</Text>
                <Text style={styles.savingsText}>
                  (Save ₹{(product.originalPrice - product.price).toLocaleString()})
                </Text>
              </>
            )}
          </View>

          <View style={styles.divider} />

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={decrementQuantity}>
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={incrementQuantity}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Product Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category:</Text>
              <Text style={styles.detailValue}>{product.category}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Organizer:</Text>
              <Text style={styles.detailValue}>{product.organizer}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>In Stock:</Text>
              <Text style={[styles.detailValue, styles.inStock]}>Available</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {product.description || `Beautiful ${product.category} decoration setup perfect for your special occasion. Professional quality decorations with complete setup service available.`}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <View style={styles.similarSection}>
              <Text style={styles.sectionTitle}>Similar Products</Text>
              <FlatList
                horizontal
                data={similarProducts}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.similarCard}
                    onPress={() => navigation.push('ProductDetails', { product: item })}>
                    <Image 
                      source={{ uri: item.image }}
                      style={styles.similarImage}
                      contentFit="cover"
                      cachePolicy="memory-disk"
                      transition={200}
                    />
                    <Text style={styles.similarTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.similarPrice}>₹{item.price?.toLocaleString()}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.addToBagButton}
          onPress={handleAddToBag}>
          <Text style={styles.addToBagText}>ADD TO BAG</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buyNowButton}
          onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>BUY NOW</Text>
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
  imageContainer: {
    width: width,
    height: width * 1.2,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  discountBadgeTop: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FF1E6C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  discountBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentContainer: {
    padding: 16,
  },
  brandName: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingBadge: {
    backgroundColor: '#388E3C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: '#999',
    marginRight: 8,
  },
  savingsText: {
    fontSize: 14,
    color: '#388E3C',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  quantitySection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#1E88E5',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 24,
    minWidth: 30,
    textAlign: 'center',
  },
  detailsSection: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  inStock: {
    color: '#388E3C',
  },
  descriptionSection: {
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  similarSection: {
    marginTop: 8,
  },
  similarCard: {
    width: 140,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  similarImage: {
    width: '100%',
    height: 160,
  },
  similarTitle: {
    fontSize: 12,
    color: '#333',
    padding: 8,
    height: 40,
  },
  similarPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addToBagButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  addToBagText: {
    color: '#1E88E5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  materialsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  material: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 4,
  },
  vendorContainer: {
    marginBottom: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
