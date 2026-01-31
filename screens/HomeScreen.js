import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
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
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Mock Categories
const CATEGORIES = [
  { id: '1', name: 'Birthday', emoji: '🎂', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200' },
  { id: '2', name: 'Wedding', emoji: '💒', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200' },
  { id: '3', name: 'Baby Shower', emoji: '👶', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200' },
  { id: '4', name: 'Engagement', emoji: '💍', image: 'https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=200' },
  { id: '5', name: 'Corporate', emoji: '🏢', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=200' },
  { id: '6', name: 'Festive', emoji: '✨', image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=200' },
  { id: '7', name: 'Outdoor', emoji: '🌳', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=200' },
  { id: '8', name: 'Romantic', emoji: '💕', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200' },
];

// Mock Products
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
    discount: 31,
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
    discount: 38,
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
    discount: 38,
  },
  {
    id: '4',
    title: 'Luxury Corporate Event Setup',
    price: 15999,
    originalPrice: 22999,
    rating: 4.9,
    reviews: 312,
    organizer: 'Business Events Pro',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400',
    discount: 30,
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
    discount: 30,
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
    discount: 42,
  },
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} activeOpacity={0.7}>
      <LinearGradient
        colors={['#FFD6E0', '#E6E0FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.categoryCircleBorder}>
        <View style={styles.categoryCircle}>
          <Text style={styles.categoryEmoji}>{item.emoji}</Text>
        </View>
      </LinearGradient>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item, index }) => (
    <TouchableOpacity 
      style={[styles.productCard, { marginRight: index % 2 === 0 ? 8 : 0 }]}
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
          onPress={() => toggleWishlist(item.id)}>
          <IconSymbol 
            name={wishlist[item.id] ? "heart.fill" : "heart"} 
            size={20} 
            color={wishlist[item.id] ? "#FF1E6C" : "#666"} 
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
          <TouchableOpacity style={styles.profileBtn}>
            <View style={styles.profileCircle}>
              <IconSymbol name="person.fill" size={24} color="#C4A1FF" />
            </View>
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.iconBtn}
              onPress={() => navigation.navigate('/(tabs)/wishlist')}>
              <IconSymbol name="heart" size={24} color="#8B5CF6" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconBtn}
              onPress={() => navigation.navigate('/(tabs)/cart')}>
              <IconSymbol name="cart" size={24} color="#8B5CF6" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
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
          <TouchableOpacity style={styles.filterBtn}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.filterBtnGradient}>
              <IconSymbol name="line.3.horizontal.decrease.circle" size={18} color="#8B5CF6" />
              <Text style={styles.filterBtnText}>Filter</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterBtn}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.filterBtnGradient}>
              <IconSymbol name="arrow.up.arrow.down" size={18} color="#8B5CF6" />
              <Text style={styles.filterBtnText}>Sort</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterBtn}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.filterBtnGradient}>
              <IconSymbol name="indianrupeesign" size={18} color="#8B5CF6" />
              <Text style={styles.filterBtnText}>Price</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Popular Decorations</Text>
          <FlatList
            data={DECOR_PRODUCTS}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productsList}
            columnWrapperStyle={styles.productRow}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Footer Navigation */}
      <LinearGradient
        colors={['#E6E0FF', '#FFD6E0', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.footer}>
        <TouchableOpacity style={styles.footerTab}>
          <IconSymbol name="house.fill" size={24} color="#8B5CF6" />
          <Text style={[styles.footerTabText, styles.footerTabTextActive]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerTab}
          onPress={() => navigation.navigate('/(tabs)/explore')}>
          <IconSymbol name="sparkles" size={24} color="#9CA3AF" />
          <Text style={styles.footerTabText}>Explore Decor</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerTab}
          onPress={() => navigation.navigate('/(tabs)/orders')}>
          <IconSymbol name="bag" size={24} color="#9CA3AF" />
          <Text style={styles.footerTabText}>My Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerTab}
          onPress={() => navigation.navigate('/(tabs)/planner')}>
          <IconSymbol name="chart.bar" size={24} color="#9CA3AF" />
          <Text style={styles.footerTabText}>Budget</Text>
        </TouchableOpacity>
      </LinearGradient>
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
  profileBtn: {
    padding: 0,
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E6E0FF',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconBtn: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF1E6C',
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
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
  filterSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  filterBtn: {
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    elevation: 8,
    shadowColor: '#C4A1FF',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  footerTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 4,
  },
  footerTabTextActive: {
    color: '#8B5CF6',
  },
});