import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Dimensions, Modal, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

// Use the same products as home/explore pages
const DECOR_PRODUCTS = [
  {
    id: '1',
    title: 'Elegant Rose Gold Wedding Arch',
    price: 8999,
    originalPrice: 12999,
    rating: 4.8,
    reviews: 234,
    organizer: 'Elite Events Co.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
    images: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'],
    discount: 31,
    category: 'Wedding',
    vendor: { id: 'v1', name: 'Elite Events Co.' },
  },
  {
    id: '2',
    title: 'Pastel Balloon Birthday Setup',
    price: 2499,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 456,
    organizer: 'Party Perfect',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
    images: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400'],
    discount: 38,
    category: 'Birthday',
    vendor: { id: 'v2', name: 'Party Perfect' },
  },
  {
    id: '3',
    title: 'Floral Baby Shower Decor',
    price: 4999,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 189,
    organizer: 'Sweet Celebrations',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400'],
    discount: 38,
    category: 'Baby Shower',
    vendor: { id: 'v3', name: 'Sweet Celebrations' },
  },
  {
    id: '4',
    title: 'Luxury Corporate Event Setup',
    price: 15999,
    originalPrice: 22999,
    rating: 4.9,
    reviews: 312,
    organizer: 'Business Events Pro.',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400',
    images: ['https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400'],
    discount: 30,
    category: 'Corporate',
    vendor: { id: 'v4', name: 'Business Events Pro.' },
  },
  {
    id: '5',
    title: 'Traditional Festive Decoration',
    price: 6999,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 278,
    organizer: 'Festive Touch',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400',
    images: ['https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400'],
    discount: 30,
    category: 'Festive',
    vendor: { id: 'v5', name: 'Festive Touch' },
  },
  {
    id: '6',
    title: 'Romantic Candlelight Setup',
    price: 3499,
    originalPrice: 5999,
    rating: 4.9,
    reviews: 402,
    organizer: 'Romantic Moments',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
    images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400'],
    discount: 42,
    category: 'Romantic',
    vendor: { id: 'v6', name: 'Romantic Moments' },
  },
  {
    id: '7',
    title: 'Diamond Engagement Decor',
    price: 12999,
    originalPrice: 18999,
    rating: 4.9,
    reviews: 298,
    organizer: 'Elite Events Co.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
    images: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'],
    discount: 32,
    category: 'Engagement',
    vendor: { id: 'v1', name: 'Elite Events Co.' },
  },
  {
    id: '8',
    title: 'Garden Outdoor Party Setup',
    price: 7999,
    originalPrice: 11999,
    rating: 4.7,
    reviews: 167,
    organizer: 'Outdoor Dreams',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=400'],
    discount: 33,
    category: 'Outdoor',
    vendor: { id: 'v7', name: 'Outdoor Dreams' },
  },
];

export default function WishlistScreen() {
  const router = useRouter();
  const { wishlistItems, toggleWishlist } = useApp();
  
  // Get AI-generated designs from localStorage
  const [aiDesigns, setAiDesigns] = React.useState<any[]>([]);
  const [fullScreenImage, setFullScreenImage] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        const savedDesigns = JSON.parse(localStorage.getItem('aiDesigns') || '[]');
        setAiDesigns(savedDesigns);
      } catch (error) {
        console.error('Error loading AI designs:', error);
      }
    }
  }, [wishlistItems]); // Reload when wishlist changes
  
  // Filter regular products
  const wishlistProducts = DECOR_PRODUCTS.filter(product => wishlistItems.includes(product.id));
  
  // Filter AI designs that are in wishlist
  const wishlistAIDesigns = aiDesigns.filter(design => wishlistItems.includes(design.id));

  const handleProductPress = (productId: string) => {
    router.push({
      pathname: '/modal',
      params: { productId }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    try {
      toggleWishlist(productId);
      Alert.alert('Success', 'Item removed from wishlist');
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item from wishlist');
      console.error('Error removing item from wishlist:', error);
    }
  };

  // Check if both regular products and AI designs are empty
  if (wishlistProducts.length === 0 && wishlistAIDesigns.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <LinearGradient
          colors={['#E6E0FF', '#FFD6E0']}
          style={styles.emptyIconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <IconSymbol name="heart" size={64} color="#8B5CF6" />
        </LinearGradient>
        <ThemedText style={styles.emptyText}>Your wishlist is empty</ThemedText>
        <ThemedText style={styles.emptySubtext}>Save your favorite decorations here</ThemedText>
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
            <ThemedText style={styles.shopButtonText}>Explore Decorations</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.header}>
          My Wishlist ({wishlistProducts.length + wishlistAIDesigns.length})
        </ThemedText>
        
        {/* AI Generated Designs Section */}
        {wishlistAIDesigns.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <IconSymbol name="wand.and.stars" size={20} color="#8B5CF6" />
              <ThemedText style={styles.sectionTitle}>AI Generated Designs</ThemedText>
            </View>
            {wishlistAIDesigns.map((design: any) => (
              <View key={design.id} style={styles.wishlistItem}>
                <TouchableOpacity
                  style={styles.productContent}
                  activeOpacity={0.7}
                  onPress={() => setFullScreenImage(design.image)}
                >
                  <Image
                    source={typeof design.image === 'number' ? design.image : { uri: design.image }}
                    style={styles.productImage}
                    contentFit="cover"
                  />
                  <View style={styles.productInfo}>
                    <ThemedText style={styles.productTitle} numberOfLines={2}>
                      {design.title}
                    </ThemedText>
                    <View style={styles.aiChip}>
                      <IconSymbol name="sparkles" size={12} color="#8B5CF6" />
                      <ThemedText style={styles.aiChipText}>AI Generated</ThemedText>
                    </View>
                    <ThemedText style={styles.vendorName}>
                      {design.eventType} • {design.style}
                    </ThemedText>
                    <ThemedText style={styles.colorScheme} numberOfLines={1}>
                      Colors: {design.colorScheme}
                    </ThemedText>
                    {design.budget && (
                      <ThemedText style={styles.budgetText}>Budget: ₹{design.budget}</ThemedText>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveFromWishlist(design.id)}
                  activeOpacity={0.7}
                >
                  <IconSymbol name="trash" size={22} color="#FF1E6C" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
        
        {/* Regular Products Section */}
        {wishlistProducts.length > 0 && (
          <>
            {wishlistAIDesigns.length > 0 && (
              <View style={styles.sectionHeader}>
                <IconSymbol name="bag" size={20} color="#8B5CF6" />
                <ThemedText style={styles.sectionTitle}>Catalog Products</ThemedText>
              </View>
            )}
            {wishlistProducts.map(product => (
              <View key={product.id} style={styles.wishlistItem}>
                <TouchableOpacity
                  style={styles.productContent}
                  onPress={() => setFullScreenImage(product.image)}
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
                    <View style={styles.ratingContainer}>
                      <IconSymbol name="star.fill" size={14} color="#FFB800" />
                      <ThemedText style={styles.rating}>{product.rating}</ThemedText>
                      <ThemedText style={styles.reviews}>({product.reviews})</ThemedText>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveFromWishlist(product.id)}
                  activeOpacity={0.7}
                >
                  <IconSymbol name="trash" size={22} color="#FF1E6C" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* Full Screen Image Modal */}
      <Modal
        visible={fullScreenImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFullScreenImage(null)}
      >
        <View style={styles.fullScreenModal}>
          <TouchableOpacity 
            style={styles.fullScreenBackdrop}
            activeOpacity={1}
            onPress={() => setFullScreenImage(null)}
          >
            <View style={styles.fullScreenHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setFullScreenImage(null)}
                activeOpacity={0.7}
              >
                <IconSymbol name="xmark.circle.fill" size={36} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.fullScreenImageContainer}>
              <Image
                source={{ uri: fullScreenImage || '' }}
                style={styles.fullScreenImage}
                contentFit="contain"
              />
            </View>
            
            <View style={styles.fullScreenFooter}>
              <ThemedText style={styles.fullScreenHint}>
                Tap anywhere to close
              </ThemedText>
            </View>
          </TouchableOpacity>
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
  content: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 20,
  },
  wishlistItem: {
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  reviews: {
    fontSize: 12,
    color: '#999',
  },
  removeButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
  },
  aiChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E6E0FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  aiChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  colorScheme: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  budgetText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D1B69',
    marginTop: 2,
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  fullScreenBackdrop: {
    flex: 1,
  },
  fullScreenHeader: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fullScreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.7,
  },
  fullScreenFooter: {
    padding: 20,
    alignItems: 'center',
  },
  fullScreenHint: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
  },
});