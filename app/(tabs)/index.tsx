import { IconSymbol } from '@/components/ui/icon-symbol';
import { DECOR_PRODUCTS } from '@/constants/products';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
const { width } = Dimensions.get('window');

// Mock Categories
const CATEGORIES = [
  { id: '1', name: 'Birthday', emoji: '🎂' },
  { id: '2', name: 'Wedding', emoji: '💒' },
  { id: '3', name: 'Baby Shower', emoji: '👶' },
  { id: '4', name: 'Engagement', emoji: '💍' },
  { id: '5', name: 'Corporate', emoji: '🏢' },
  { id: '6', name: 'Festive', emoji: '✨' },
  { id: '7', name: 'Outdoor', emoji: '🌳' },
  { id: '8', name: 'Romantic', emoji: '💕' },
];

// Use centralized DECOR_PRODUCTS from constants for consistency across app
const HOME_PRODUCTS = DECOR_PRODUCTS;

export default function HomeScreen() {
  const router = useRouter();
  const { cartItems, wishlistItems, toggleWishlist, isInWishlist, user, isAuthenticated } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  // Get cart count
  const cartCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

  // Filter and sort products
  const filteredProducts = HOME_PRODUCTS
    .filter(product => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.organizer.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      // Price filter
      let matchesPrice = true;
      if (priceFilter === 'low') matchesPrice = product.price < 5000;
      else if (priceFilter === 'medium') matchesPrice = product.price >= 5000 && product.price < 10000;
      else if (priceFilter === 'high') matchesPrice = product.price >= 10000;
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.reviews - a.reviews;
      }
    });

  const renderCategory = ({ item }: { item: typeof CATEGORIES[0] }) => (
    <TouchableOpacity 
      style={styles.categoryItem} 
      activeOpacity={0.7}
      onPress={() => setSelectedCategory(selectedCategory === item.name ? null : item.name)}>
      <LinearGradient
        colors={selectedCategory === item.name ? ['#8B5CF6', '#C4A1FF'] : ['#FFD6E0', '#E6E0FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.categoryCircleBorder}>
        <View style={styles.categoryCircle}>
          <Text style={styles.categoryEmoji}>{item.emoji}</Text>
        </View>
      </LinearGradient>
      <Text style={[
        styles.categoryName,
        selectedCategory === item.name && styles.categoryNameActive
      ]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item, index }: { item: typeof HOME_PRODUCTS[0], index: number }) => (
    <TouchableOpacity 
      style={[styles.productCard, { marginRight: index % 2 === 0 ? 8 : 0 }]}
      onPress={() => router.push({ pathname: '/product-details', params: { productId: item.id } })}
      activeOpacity={0.9}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          contentFit="cover"
        />
        {item.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.wishlistBtn}
          onPress={(e) => {
            e.stopPropagation();
            toggleWishlist(item.id);
          }}>
          <IconSymbol 
            name={isInWishlist(item.id) ? "heart.fill" : "heart"} 
            size={20} 
            color={isInWishlist(item.id) ? "#FF1E6C" : "#666"} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.organizerName} numberOfLines={1}>{item.organizer}</Text>
        <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <IconSymbol name="star.fill" size={12} color="#FFB800" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewText}>({item.reviews})</Text>
          </View>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
          <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#E6E0FF" barStyle="dark-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#FFD6E0', '#E6E0FF', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.profileSection}
            onPress={() => router.push('/(tabs)/profile')}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profileCircleGradient}
            >
              <View style={styles.profileCircle}>
                <IconSymbol name="person.fill" size={32} color="#8B5CF6" />
              </View>
            </LinearGradient>
            {isAuthenticated && user && (
              <View style={styles.userInfo}>
                <Text style={styles.welcomeText}>Welcome back,</Text>
                <Text style={styles.userName}>{user.name}</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.iconBtnWrapper}
              onPress={() => router.push('/wishlist')}>
              <View style={styles.iconCircle}>
                <IconSymbol name="heart.fill" size={22} color="#8B5CF6" />
                {wishlistItems.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{wishlistItems.length}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconBtnWrapper}
              onPress={() => router.push('/cart')}>
              <View style={styles.iconCircle}>
                <IconSymbol name="cart.fill" size={22} color="#8B5CF6" />
                {cartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <LinearGradient
          colors={['#F5F3FF', '#FAF5FF']}
          style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for event themes, decor ideas…"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </LinearGradient>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}>
        
        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            bounces={true}
          />
        </View>

        {/* Filter/Sort Section */}
        <View style={styles.filterSection}>
          <TouchableOpacity 
            style={styles.filterBtnWrapper}
            onPress={() => {
              // Cycle through sort options
              const sortOptions: Array<'popular' | 'price-low' | 'price-high' | 'rating'> = ['popular', 'price-low', 'price-high', 'rating'];
              const currentIndex = sortOptions.indexOf(sortBy);
              setSortBy(sortOptions[(currentIndex + 1) % sortOptions.length]);
            }}>
            <LinearGradient
              colors={sortBy !== 'popular' ? ['#8B5CF6', '#C4A1FF'] : ['#E6E0FF', '#FFD6E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.filterBtnGradient}>
              <IconSymbol name="arrow.up.arrow.down" size={18} color={sortBy !== 'popular' ? '#FFFFFF' : '#8B5CF6'} />
              <Text style={[styles.filterBtnText, sortBy !== 'popular' && { color: '#FFFFFF' }]}>
                {sortBy === 'popular' ? 'Popular' : 
                 sortBy === 'price-low' ? 'Low ₹' :
                 sortBy === 'price-high' ? 'High ₹' : 'Rating'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.filterBtnWrapper}
            onPress={() => {
              // Cycle through price filters
              const priceOptions: Array<'all' | 'low' | 'medium' | 'high'> = ['all', 'low', 'medium', 'high'];
              const currentIndex = priceOptions.indexOf(priceFilter);
              setPriceFilter(priceOptions[(currentIndex + 1) % priceOptions.length]);
            }}>
            <LinearGradient
              colors={priceFilter !== 'all' ? ['#8B5CF6', '#C4A1FF'] : ['#E6E0FF', '#FFD6E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.filterBtnGradient}>
              <IconSymbol name="indianrupeesign" size={18} color={priceFilter !== 'all' ? '#FFFFFF' : '#8B5CF6'} />
              <Text style={[styles.filterBtnText, priceFilter !== 'all' && { color: '#FFFFFF' }]}>
                {priceFilter === 'all' ? 'All' :
                 priceFilter === 'low' ? '<5K' :
                 priceFilter === 'medium' ? '5-10K' : '>10K'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.filterBtnWrapper}
            onPress={() => {
              // Reset all filters
              setSelectedCategory(null);
              setSortBy('popular');
              setPriceFilter('all');
              setSearchQuery('');
            }}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.filterBtnGradient}>
              <IconSymbol name="xmark.circle" size={18} color="#8B5CF6" />
              <Text style={styles.filterBtnText}>Reset</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>
              {selectedCategory ? `${selectedCategory} Decorations` : 'Popular Decorations'}
            </Text>
            <Text style={styles.resultCount}>({filteredProducts.length})</Text>
          </View>
          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.productsList}
              columnWrapperStyle={styles.productRow}
            />
          ) : (
            <View style={styles.emptyState}>
              <IconSymbol name="magnifyingglass" size={48} color="#CCC" />
              <Text style={styles.emptyText}>No products found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
            </View>
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: (StatusBar.currentHeight || 24) + 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#C4A1FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  profileCircleGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtnWrapper: {
    padding: 0,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    elevation: 3,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconBtn: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF1E6C',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  categoriesSection: {
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 12,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  categoryCircleBorder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#C4A1FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
  categoryNameActive: {
    color: '#8B5CF6',
    fontWeight: '700',
  },
  filterSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  filterBtnWrapper: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#C4A1FF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  filterBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 6,
  },
  filterBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  productsSection: {
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  productsList: {
    paddingTop: 8,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: (width - 40) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  productImageContainer: {
    width: '100%',
    height: (width - 40) / 2,
    position: 'relative',
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
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  productInfo: {
    padding: 12,
  },
  organizerName: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 20,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviewText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#C4A1FF',
  },
  originalPrice: {
    fontSize: 13,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  resultCount: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});
