import RealisticARViewer from '@/components/RealisticARViewer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Gradients } from '@/constants/theme';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

// Types
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
  vendor: {
    id: string;
    name: string;
  };
}

// Mock data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Rustic Wedding Arch Setup',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    category: 'Wedding',
    rating: 4.8,
    reviews: 234,
    discount: 20,
    vendor: { id: 'v1', name: 'Elite Events' },
  },
  {
    id: '2',
    title: 'Garden Party Décor Bundle',
    price: 899,
    image: 'https://images.unsplash.com/photo-1464366400160-69de5c4a4859',
    category: 'Party',
    rating: 4.6,
    reviews: 156,
    discount: 15,
    vendor: { id: 'v2', name: 'Garden Dreams' },
  },
  {
    id: '3',
    title: 'Birthday Balloon Arrangement',
    price: 299,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
    category: 'Birthday',
    rating: 4.7,
    reviews: 89,
    vendor: { id: 'v3', name: 'Party Perfect' },
  },
  {
    id: '4',
    title: 'Corporate Event Stage Setup',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
    category: 'Corporate',
    rating: 4.9,
    reviews: 312,
    discount: 10,
    vendor: { id: 'v4', name: 'Pro Events Co' },
  },
  {
    id: '5',
    title: 'Floral Centerpiece Collection',
    price: 599,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d',
    category: 'Wedding',
    rating: 4.5,
    reviews: 178,
    vendor: { id: 'v1', name: 'Elite Events' },
  },
  {
    id: '6',
    title: 'LED Lighting Package',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    category: 'Party',
    rating: 4.8,
    reviews: 245,
    discount: 25,
    vendor: { id: 'v5', name: 'Light Magic' },
  },
  {
    id: '7',
    title: 'Kids Party Fun Zone',
    price: 799,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176',
    category: 'Birthday',
    rating: 4.6,
    reviews: 134,
    vendor: { id: 'v3', name: 'Party Perfect' },
  },
  {
    id: '8',
    title: 'Elegant Table Settings',
    price: 449,
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330',
    category: 'Wedding',
    rating: 4.7,
    reviews: 198,
    discount: 12,
    vendor: { id: 'v1', name: 'Elite Events' },
  },
];

const CATEGORIES = ['All', 'Wedding', 'Birthday', 'Party', 'Corporate', 'Festival'];
const SORT_OPTIONS = ['Popular', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

export default function ExploreScreen() {
  const router = useRouter();
  const { cartItems, wishlistItems, toggleWishlist, isInWishlist } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Popular');
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [arPreview, setArPreview] = useState<{ image: string; title: string; price: number } | null>(null);

  // Get cart count
  const cartCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (selectedSort) {
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      case 'Top Rated':
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <TouchableOpacity 
          onPress={() => setFullScreenImage(item.image)}
          activeOpacity={0.9}
          style={styles.imageClickArea}
        >
          <Image 
            source={{ uri: item.image }}
            style={styles.productImage}
            contentFit="cover"
            transition={200}
          />
        </TouchableOpacity>
        {item.discount && (
          <View style={styles.discountBadge}>
            <ThemedText style={styles.discountText}>{item.discount}% OFF</ThemedText>
          </View>
        )}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={(e) => {
            e.stopPropagation();
            toggleWishlist(item.id);
          }}
          activeOpacity={0.7}
        >
          <IconSymbol
            name={isInWishlist(item.id) ? 'heart.fill' : 'heart'}
            size={20}
            color={isInWishlist(item.id) ? '#FF1E6C' : '#666'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arButton}
          onPress={(e) => {
            e.stopPropagation();
            setArPreview({
              image: item.image,
              title: item.title,
              price: item.price
            });
          }}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#8B5CF6', '#FF1E6C']}
            style={styles.arButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <IconSymbol name="cube.transparent" size={16} color="#FFFFFF" />
            <ThemedText style={styles.arButtonText}>AR</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.productInfo}
        onPress={() => router.push('/product-details')}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.productTitle} numberOfLines={2}>{item.title}</ThemedText>
        
        <View style={styles.priceRow}>
          <ThemedText style={styles.price}>₹{item.price}</ThemedText>
          {item.discount && (
            <ThemedText style={styles.originalPrice}>
              ₹{Math.round(item.price / (1 - item.discount / 100))}
            </ThemedText>
          )}
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <ThemedText style={styles.ratingText}>{item.rating} ★</ThemedText>
          </View>
          <ThemedText style={styles.reviewsText}>({item.reviews})</ThemedText>
        </View>

        <ThemedText style={styles.vendorName} numberOfLines={1}>{item.vendor.name}</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={Gradients.header as any}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <ThemedText style={styles.headerTitle}>Explore Products</ThemedText>
            <ThemedText style={styles.headerSubtitle}>{filteredProducts.length} items available</ThemedText>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push('/wishlist')}
              activeOpacity={0.7}
            >
              <View style={styles.iconCircle}>
                <IconSymbol name="heart.fill" size={22} color="#8B5CF6" />
                {wishlistItems.length > 0 && (
                  <View style={styles.badge}>
                    <ThemedText style={styles.badgeText}>{wishlistItems.length}</ThemedText>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push('/cart')}
              activeOpacity={0.7}
            >
              <View style={styles.iconCircle}>
                <IconSymbol name="cart.fill" size={22} color="#8B5CF6" />
                {cartCount > 0 && (
                  <View style={styles.badge}>
                    <ThemedText style={styles.badgeText}>{cartCount}</ThemedText>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#8B5CF6" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for decorations..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Categories Section */}
      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <ThemedText style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sort/Filter Section */}
      <View style={styles.sortWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.sortContainer}
          contentContainerStyle={styles.sortContent}
        >
          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.sortChip,
                selectedSort === option && styles.sortChipActive
              ]}
              onPress={() => setSelectedSort(option)}
              activeOpacity={0.7}
            >
              <ThemedText style={[
                styles.sortText,
                selectedSort === option && styles.sortTextActive
              ]}>
                {option}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No products found</ThemedText>
          </View>
        }
      />

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

      {/* AR Preview Modal */}
      {arPreview && (
        <RealisticARViewer
          imageUrl={arPreview.image}
          onClose={() => setArPreview(null)}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
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
    fontWeight: '500',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconButton: {
    position: 'relative',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF1E6C',
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2D1B69',
    fontWeight: '500',
  },
  
  // Categories Section
  categoriesWrapper: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    minHeight: 60,
    marginTop: 8,
  },
  categoriesContainer: {
    flex: 1,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F3FF',
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: '#E6E0FF',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
  },
  categoryChipActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8B5CF6',
    lineHeight: 20,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  
  // Sort Section
  sortWrapper: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    minHeight: 56,
    marginBottom: 8,
  },
  sortContainer: {
    flex: 1,
  },
  sortContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  sortChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 38,
  },
  sortChipActive: {
    backgroundColor: '#FFD6E0',
    borderColor: '#FF1E6C',
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    lineHeight: 18,
  },
  sortTextActive: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  productsGrid: {
    padding: 12,
    paddingBottom: 24,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E6E0FF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF1E6C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4,
  },
  ratingBadge: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  reviewsText: {
    fontSize: 11,
    color: '#999',
  },
  vendorName: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  imageClickArea: {
    width: '100%',
    height: '100%',
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
  arButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  arButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  arButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  arModal: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  arHeader: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  arCloseButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    padding: 8,
    zIndex: 10,
  },
  arTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
    textAlign: 'center',
  },
  arSubtitle: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  arViewer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  arViewerContainer: {
    flex: 1,
    position: 'relative',
  },
  arModelViewer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  arOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  arBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  arBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  arProductInfo: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 8,
  },
  arProductTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
  },
  arProductPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  arFooter: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  arActionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  arActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  arActionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  arInstructions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#E6E0FF',
    padding: 12,
    borderRadius: 12,
  },
  arInstructionText: {
    flex: 1,
    fontSize: 12,
    color: '#2D1B69',
    lineHeight: 16,
  },
});
