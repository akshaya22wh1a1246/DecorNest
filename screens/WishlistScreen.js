import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import {
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

export const setWishlistProducts = (products) => {
  sharedProducts = products;
};

export default function WishlistScreen({ navigation }) {
  const { wishlistItems, toggleWishlist, addToCart } = useApp();
  const [allProducts, setAllProducts] = useState(sharedProducts);
  
  useEffect(() => {
    setAllProducts(sharedProducts);
  }, []);
  
  const wishlistProducts = allProducts.filter(product => 
    wishlistItems.includes(product.id)
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
        activeOpacity={0.9}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          contentFit="cover"
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.removeBtn}
        onPress={() => toggleWishlist(item.id)}>
        <IconSymbol name="xmark.circle.fill" size={24} color="#FF1E6C" />
      </TouchableOpacity>
      
      <View style={styles.productInfo}>
        <Text style={styles.organizerName} numberOfLines={1}>{item.organizer}</Text>
        <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.ratingRow}>
          <IconSymbol name="star.fill" size={12} color="#FFB800" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewText}>({item.reviews})</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
          <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.addToCartBtn}
          onPress={() => {
            addToCart(item.id);
            // Optionally show a toast or alert
          }}>
          <LinearGradient
            colors={['#E6E0FF', '#FFD6E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addToCartGradient}>
            <IconSymbol name="cart.fill" size={16} color="#8B5CF6" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (wishlistProducts.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.emptyContent}>
          <View style={styles.emptyIconContainer}>
            <IconSymbol name="heart" size={80} color="#E0E0E0" />
          </View>
          <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Start adding decorations and services to your wishlist to keep track of your favorites!
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.browseGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}>
              <Text style={styles.browseText}>Browse Products</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <Text style={styles.itemCount}>{wishlistProducts.length} items</Text>
      </View>
      
      <FlatList
        data={wishlistProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
      />
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
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 24) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 180,
  },
  removeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
  },
  productInfo: {
    padding: 12,
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
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
    fontWeight: '600',
  },
  reviewText: {
    fontSize: 11,
    color: '#999',
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToCartBtn: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  addToCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
    marginLeft: 4,
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
    lineHeight: 24,
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
