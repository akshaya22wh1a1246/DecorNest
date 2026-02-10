import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Mock vendors data
const VENDORS = [
  {
    id: '1',
    name: 'Festive Decor Co.',
    category: 'Decoration',
    rating: 4.9,
    reviews: 245,
    experience: '8 years',
    minPrice: 5000,
    maxPrice: 50000,
    location: 'Mumbai',
    specialties: ['Wedding', 'Birthday', 'Corporate'],
    available: true,
  },
  {
    id: '2',
    name: 'Royal Events & Decor',
    category: 'Full Service',
    rating: 4.8,
    reviews: 312,
    experience: '10 years',
    minPrice: 10000,
    maxPrice: 100000,
    location: 'Delhi',
    specialties: ['Wedding', 'Mehendi', 'Sangeet'],
    available: true,
  },
  {
    id: '3',
    name: 'Party Perfect',
    category: 'Event Planning',
    rating: 4.7,
    reviews: 189,
    experience: '5 years',
    minPrice: 3000,
    maxPrice: 30000,
    location: 'Bangalore',
    specialties: ['Birthday', 'Baby Shower', 'Anniversary'],
    available: true,
  },
  {
    id: '4',
    name: 'Elite Wedding Co.',
    category: 'Wedding Specialist',
    rating: 4.9,
    reviews: 456,
    experience: '12 years',
    minPrice: 25000,
    maxPrice: 200000,
    location: 'Pune',
    specialties: ['Wedding', 'Reception', 'Sangeet'],
    available: false,
  },
  {
    id: '5',
    name: 'Dream Decorators',
    category: 'Theme Decoration',
    rating: 4.6,
    reviews: 167,
    experience: '6 years',
    minPrice: 4000,
    maxPrice: 40000,
    location: 'Hyderabad',
    specialties: ['Birthday', 'Corporate', 'Anniversary'],
    available: true,
  },
  {
    id: '6',
    name: 'Elegant Celebrations',
    category: 'Luxury Events',
    rating: 4.9,
    reviews: 523,
    experience: '15 years',
    minPrice: 50000,
    maxPrice: 500000,
    location: 'Mumbai',
    specialties: ['Wedding', 'Corporate', 'Reception'],
    available: true,
  },
];

export default function VendorDashboardScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // rating, price, reviews

  const categories = ['All', 'Decoration', 'Full Service', 'Event Planning', 'Wedding Specialist'];

  const filteredVendors = VENDORS.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || vendor.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.minPrice - b.minPrice;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    return 0;
  });

  const handleContactVendor = (vendor) => {
    Alert.alert(
      `Contact ${vendor.name}`,
      `Would you like to contact this vendor?\n\nPhone: +91 98765 43210\nEmail: ${vendor.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Alert.alert('Calling...', 'Call feature coming soon!') },
      ]
    );
  };

  const renderVendorCard = ({ item }) => (
    <TouchableOpacity
      style={styles.vendorCard}
      activeOpacity={0.8}
      onPress={() => handleContactVendor(item)}
    >
      <LinearGradient
        colors={item.available ? ['#F5F3FF', '#FAF5FF'] : ['#F3F4F6', '#E5E7EB']}
        style={styles.vendorCardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.vendorHeader}>
          <View style={styles.vendorIconCircle}>
            <Text style={styles.vendorInitial}>{item.name.charAt(0)}</Text>
          </View>
          <View style={styles.vendorHeaderInfo}>
            <Text style={styles.vendorName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.vendorCategory}>{item.category}</Text>
          </View>
          {item.available ? (
            <View style={styles.availableBadge}>
              <Text style={styles.availableText}>Available</Text>
            </View>
          ) : (
            <View style={styles.unavailableBadge}>
              <Text style={styles.unavailableText}>Busy</Text>
            </View>
          )}
        </View>

        {/* Stats */}
        <View style={styles.vendorStats}>
          <View style={styles.statItem}>
            <IconSymbol name="star.fill" size={16} color="#F59E0B" />
            <Text style={styles.statValue}>{item.rating}</Text>
            <Text style={styles.statLabel}>({item.reviews})</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <IconSymbol name="briefcase.fill" size={16} color="#8B5CF6" />
            <Text style={styles.statValue}>{item.experience}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <IconSymbol name="mappin.circle.fill" size={16} color="#EF4444" />
            <Text style={styles.statValue}>{item.location}</Text>
          </View>
        </View>

        {/* Specialties */}
        <View style={styles.specialtiesContainer}>
          {item.specialties.map((specialty) => (
            <View key={specialty} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>

        {/* Price Range */}
        <View style={styles.priceContainer}>
          <IconSymbol name="indianrupeesign.circle.fill" size={20} color="#10B981" />
          <Text style={styles.priceText}>
            ₹{item.minPrice.toLocaleString()} - ₹{item.maxPrice.toLocaleString()}
          </Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => handleContactVendor(item)}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#E6E0FF', '#FFD6E0']}
            style={styles.contactButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <IconSymbol name="phone.fill" size={18} color="#2D1B69" />
            <Text style={styles.contactButtonText}>Contact Vendor</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#E6E0FF', '#FFD6E0']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.left" size={24} color="#2D1B69" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerIconCircle}>
            <IconSymbol name="person.2.fill" size={48} color="#8B5CF6" />
          </View>
          <Text style={styles.headerTitle}>Find Vendors</Text>
          <Text style={styles.headerSubtitle}>
            {filteredVendors.length} vendors available
          </Text>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vendors, category, location..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipSelected,
            ]}
            onPress={() => setSelectedCategory(category)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortSection}>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'rating' && styles.sortButtonActive]}
          onPress={() => setSortBy('rating')}
        >
          <IconSymbol name="star.fill" size={16} color={sortBy === 'rating' ? '#8B5CF6' : '#9CA3AF'} />
          <Text style={[styles.sortText, sortBy === 'rating' && styles.sortTextActive]}>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'price' && styles.sortButtonActive]}
          onPress={() => setSortBy('price')}
        >
          <IconSymbol name="indianrupeesign" size={16} color={sortBy === 'price' ? '#8B5CF6' : '#9CA3AF'} />
          <Text style={[styles.sortText, sortBy === 'price' && styles.sortTextActive]}>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'reviews' && styles.sortButtonActive]}
          onPress={() => setSortBy('reviews')}
        >
          <IconSymbol name="person.3.fill" size={16} color={sortBy === 'reviews' ? '#8B5CF6' : '#9CA3AF'} />
          <Text style={[styles.sortText, sortBy === 'reviews' && styles.sortTextActive]}>Reviews</Text>
        </TouchableOpacity>
      </View>

      {/* Vendors List */}
      <FlatList
        data={filteredVendors}
        renderItem={renderVendorCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol name="magnifyingglass" size={60} color="#D1D5DB" />
            <Text style={styles.emptyText}>No vendors found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#C4A1FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },
  categoryScroll: {
    maxHeight: 50,
  },
  categoryScrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#8B5CF6',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  sortSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    gap: 6,
  },
  sortButtonActive: {
    backgroundColor: '#E6E0FF',
  },
  sortText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  sortTextActive: {
    color: '#8B5CF6',
  },
  listContent: {
    padding: 20,
    paddingTop: 12,
  },
  vendorCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  vendorCardGradient: {
    padding: 16,
  },
  vendorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  vendorIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vendorInitial: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  vendorHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 2,
  },
  vendorCategory: {
    fontSize: 13,
    color: '#8B5CF6',
  },
  availableBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
  },
  unavailableBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unavailableText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#991B1B',
  },
  vendorStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 12,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  specialtyTag: {
    backgroundColor: '#E6E0FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  specialtyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#10B981',
  },
  contactButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  contactButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D1B69',
  },
  emptyContainer: {
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
    marginTop: 4,
  },
});
