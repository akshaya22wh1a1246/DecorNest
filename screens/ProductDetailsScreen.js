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
  Modal,
  TextInput,
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
  const { addToCart, cartItems, user } = useApp();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.image);

  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState(user?.name || '');

  const [reviews, setReviews] = useState([
    {
      id: '1',
      name: 'Priya Sharma',
      date: '2 weeks ago',
      rating: 5,
      text:
        'Absolutely stunning decorations! The team did an amazing job at our wedding. The quality and setup exceeded our expectations. Highly recommend!',
    },
    {
      id: '2',
      name: 'Rahul Kumar',
      date: '1 month ago',
      rating: 4.5,
      text:
        'Great value for money. The decorations looked beautiful and the service was excellent. Minor delay in setup but overall very satisfied.',
    },
    {
      id: '3',
      name: 'Aisha Verma',
      date: '3 weeks ago',
      rating: 4.8,
      text:
        'Beautiful décor and very professional team. They understood our theme perfectly and executed it wonderfully.',
    },
  ]);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating || 4.5;

  const ratingCount = reviews.length || product.reviews || 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) =>
    reviews.filter((r) => Math.round(r.rating) === star).length
  );

  const maxRatingCount = Math.max(...ratingDistribution, 1);

  const getBarWidth = (count) => {
    if (!count || !maxRatingCount) return '5%';
    const percentage = (count / maxRatingCount) * 100;
    return `${Math.max(5, percentage)}%`;
  };

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

  const openReviewModal = () => {
    setReviewRating(5);
    setReviewText('');
    setReviewName(user?.name || '');
    setReviewModalVisible(true);
  };

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      Alert.alert('Add a few words', 'Please write something about your experience.');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      name: reviewName && reviewName.trim() ? reviewName.trim() : 'Guest User',
      date: 'Just now',
      rating: reviewRating,
      text: reviewText.trim(),
    };

    setReviews([newReview, ...reviews]);
    setReviewModalVisible(false);
    Alert.alert('Thank you!', 'Your review has been added.');
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

          {/* Rating & Reviews (dynamic from local state) */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{averageRating} ⭐</Text>
            </View>
            <Text style={styles.reviewsText}>{ratingCount} ratings</Text>
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
              <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
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

          {/* Customer Reviews Section */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              <TouchableOpacity 
                style={styles.writeReviewButton}
                onPress={openReviewModal}
              >
                <Text style={styles.writeReviewText}>Write Review</Text>
              </TouchableOpacity>
            </View>
            
            {/* Rating Summary */}
            <View style={styles.ratingSummary}>
              <View style={styles.ratingLeft}>
                <Text style={styles.bigRating}>{averageRating}</Text>
                <Text style={styles.ratingStars}>{'⭐'.repeat(Math.round(averageRating || 4.5))}</Text>
                <Text style={styles.ratingCount}>{ratingCount} ratings</Text>
              </View>
              <View style={styles.ratingBars}>
                <View style={styles.ratingBarRow}>
                  <Text style={styles.ratingBarLabel}>5 ⭐</Text>
                  <View style={styles.ratingBar}>
                    <View style={[styles.ratingBarFill, { width: getBarWidth(ratingDistribution[0]) }]} />
                  </View>
                  <Text style={styles.ratingBarCount}>{ratingDistribution[0]}</Text>
                </View>
                <View style={styles.ratingBarRow}>
                  <Text style={styles.ratingBarLabel}>4 ⭐</Text>
                  <View style={styles.ratingBar}>
                    <View style={[styles.ratingBarFill, { width: getBarWidth(ratingDistribution[1]) }]} />
                  </View>
                  <Text style={styles.ratingBarCount}>{ratingDistribution[1]}</Text>
                </View>
                <View style={styles.ratingBarRow}>
                  <Text style={styles.ratingBarLabel}>3 ⭐</Text>
                  <View style={styles.ratingBar}>
                    <View style={[styles.ratingBarFill, { width: getBarWidth(ratingDistribution[2]) }]} />
                  </View>
                  <Text style={styles.ratingBarCount}>{ratingDistribution[2]}</Text>
                </View>
                <View style={styles.ratingBarRow}>
                  <Text style={styles.ratingBarLabel}>2 ⭐</Text>
                  <View style={styles.ratingBar}>
                    <View style={[styles.ratingBarFill, { width: getBarWidth(ratingDistribution[3]) }]} />
                  </View>
                  <Text style={styles.ratingBarCount}>{ratingDistribution[3]}</Text>
                </View>
                <View style={styles.ratingBarRow}>
                  <Text style={styles.ratingBarLabel}>1 ⭐</Text>
                  <View style={styles.ratingBar}>
                    <View style={[styles.ratingBarFill, { width: getBarWidth(ratingDistribution[4]) }]} />
                  </View>
                  <Text style={styles.ratingBarCount}>{ratingDistribution[4]}</Text>
                </View>
              </View>
            </View>

            {/* Reviews List */}
            <View style={styles.reviewsList}>
              {reviews.map((review) => {
                const initials = review.name
                  .split(' ')
                  .map((n) => n.charAt(0))
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <View key={review.id} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <View style={styles.reviewAvatar}>
                        <Text style={styles.reviewAvatarText}>{initials}</Text>
                      </View>
                      <View style={styles.reviewHeaderInfo}>
                        <Text style={styles.reviewerName}>{review.name}</Text>
                        <Text style={styles.reviewDate}>{review.date}</Text>
                      </View>
                      <View style={styles.reviewRatingBadge}>
                        <Text style={styles.reviewRatingText}>
                          {review.rating.toFixed(1)} ⭐
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.reviewText}>{review.text}</Text>
                  </View>
                );
              })}
            </View>
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

      <Modal
        visible={isReviewModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.reviewModalOverlay}>
          <View style={styles.reviewModalContent}>
            <Text style={styles.reviewModalTitle}>Write a Review</Text>
            <Text style={styles.reviewModalSubtitle}>
              Share your experience with this décor package
            </Text>

            <Text style={styles.reviewModalLabel}>Your Name</Text>
            <TextInput
              style={styles.reviewModalInput}
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              value={reviewName}
              onChangeText={setReviewName}
            />

            <Text style={styles.reviewModalLabel}>Rating</Text>
            <View style={styles.modalRatingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setReviewRating(star)}
                  style={styles.modalStarButton}
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      star <= reviewRating
                        ? styles.modalStarSelected
                        : styles.modalStar
                    }
                  >
                    ⭐
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.reviewModalLabel}>Your Review</Text>
            <TextInput
              style={styles.reviewModalTextArea}
              placeholder="Describe your experience, décor quality, and service..."
              placeholderTextColor="#9CA3AF"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View style={styles.reviewModalButtonsRow}>
              <TouchableOpacity
                style={[styles.reviewModalButton, styles.reviewModalCancelButton]}
                onPress={() => setReviewModalVisible(false)}
              >
                <Text style={styles.reviewModalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.reviewModalButton, styles.reviewModalSubmitButton]}
                onPress={handleSubmitReview}
              >
                <Text style={styles.reviewModalSubmitText}>Submit Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  
  // Reviews Section
  reviewsSection: {
    marginBottom: 8,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  writeReviewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1E88E5',
    borderRadius: 6,
  },
  writeReviewText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  ratingSummary: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  ratingLeft: {
    alignItems: 'center',
    marginRight: 24,
    paddingRight: 24,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  bigRating: {
    fontSize: 48,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  ratingStars: {
    fontSize: 20,
    marginBottom: 6,
  },
  ratingCount: {
    fontSize: 12,
    color: '#666',
  },
  ratingBars: {
    flex: 1,
    justifyContent: 'space-around',
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingBarLabel: {
    fontSize: 12,
    color: '#666',
    width: 40,
  },
  ratingBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#FFC107',
  },
  ratingBarCount: {
    fontSize: 12,
    color: '#666',
    width: 30,
    textAlign: 'right',
  },
  reviewsList: {
    marginTop: 12,
  },
  reviewModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  reviewModalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  reviewModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  reviewModalSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 16,
  },
  reviewModalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 10,
    marginBottom: 4,
  },
  reviewModalInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  modalRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  modalStarButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  modalStar: {
    fontSize: 22,
    color: '#D1D5DB',
  },
  modalStarSelected: {
    fontSize: 22,
    color: '#F59E0B',
  },
  reviewModalTextArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    marginTop: 4,
    minHeight: 90,
  },
  reviewModalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  reviewModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  reviewModalCancelButton: {
    backgroundColor: '#F3F4F6',
  },
  reviewModalSubmitButton: {
    backgroundColor: '#8B5CF6',
  },
  reviewModalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  reviewModalSubmitText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  reviewCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reviewAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewHeaderInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewRatingBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  reviewRatingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F57C00',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
