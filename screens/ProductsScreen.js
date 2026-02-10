import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

// Import shared products data from HomeScreen
// This will be populated from HomeScreen's DECOR_PRODUCTS
let sharedProducts = [];

export const setSharedProducts = (products) => {
  sharedProducts = products;
};

export default function ProductsScreen({ navigation, route }) {
  const eventType = route?.params?.eventType || 'All';
  const [products, setProducts] = useState(sharedProducts);

  useEffect(() => {
    // Update products when shared products change
    setProducts(sharedProducts);
  }, []);

  const filteredProducts = eventType === 'All' 
    ? products 
    : products.filter(p => p.category === eventType);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{eventType} Decorations</Text>
        
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found in this category</Text>
          </View>
        ) : (
          <View style={styles.productList}>
            {filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Image 
                  source={{ uri: product.image }} 
                  style={styles.productImage}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                  transition={200}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.title}</Text>
                  <Text style={styles.productPrice}>₹{product.price.toLocaleString()}</Text>
                  {product.discount > 0 && (
                    <Text style={styles.discountText}>{product.discount}% OFF</Text>
                  )}
                  <TouchableOpacity 
                    style={styles.viewButton}
                    onPress={() => navigation.navigate('ProductDetails', { product })}>
                    <Text style={styles.viewButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  productList: {
    flexDirection: 'column',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: 120,
    height: 120,
    backgroundColor: '#e0e0e0',
  },
  productInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: '#1E88E5',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  discountText: {
    fontSize: 12,
    color: '#FF1E6C',
    fontWeight: '600',
    marginBottom: 8,
  },
});
