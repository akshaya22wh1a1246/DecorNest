import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
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
  Alert,
  Modal,
  Animated
} from 'react-native';
import { setSharedProducts } from './ProductsScreen';
import { setAllProducts } from './ProductDetailsScreen';
import { setWishlistProducts } from './WishlistScreen';
import { setCartProducts } from './CartScreen';

const { width } = Dimensions.get('window');

// Categories with proper order
const CATEGORIES = [
  { id: '1', name: 'Haldi', emoji: '💛', image: 'https://i.ibb.co/5h4dYX3H/haldi.jpg' },
  { id: '2', name: 'Mehendi', emoji: '🎨', image: 'https://via.placeholder.com/200/8B4513/FFFFFF?text=Mehendi' },
  { id: '3', name: 'Sangeeth', emoji: '🎵', image: 'https://via.placeholder.com/200/FF69B4/FFFFFF?text=Sangeeth' },
  { id: '4', name: 'Wedding', emoji: '💒', image: 'https://via.placeholder.com/200/FF1493/FFFFFF?text=Wedding' },
  { id: '5', name: 'Anniversary', emoji: '💝', image: 'https://via.placeholder.com/200/DC143C/FFFFFF?text=Anniversary' },
  { id: '6', name: 'Welcome Baby', emoji: '🍼', image: 'https://via.placeholder.com/200/87CEEB/000000?text=Welcome+Baby' },
  { id: '7', name: 'Baby Shower', emoji: '👶', image: 'https://via.placeholder.com/200/FFB6C1/000000?text=Baby+Shower' },
  { id: '8', name: 'Birthday', emoji: '🎂', image: 'https://via.placeholder.com/200/FF6347/FFFFFF?text=Birthday' },
];

// Haldi decoration products with imgbb images
const DECOR_PRODUCTS = [
  {
    id: '1',
    title: 'Traditional Haldi Ceremony Decor',
    price: 4999,
    originalPrice: 7999,
    rating: 4.9,
    reviews: 187,
    organizer: 'Festive Decor Co.',
    image: 'https://i.ibb.co/zVx18Wgv/H4.jpg',
    category: 'Haldi',
    discount: 38,
  },
  {
    id: '2',
    title: 'Yellow Floral Haldi Setup',
    price: 5499,
    originalPrice: 8999,
    rating: 4.8,
    reviews: 234,
    organizer: 'Royal Events',
    image: 'https://i.ibb.co/HDtpxQ7W/H20.jpg',
    category: 'Haldi',
    discount: 39,
  },
  {
    id: '3',
    title: 'Marigold Haldi Decoration',
    price: 6999,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 312,
    organizer: 'Party Perfect',
    image: 'https://i.ibb.co/zTZ11vt3/H19.jpg',
    category: 'Haldi',
    discount: 36,
  },
  {
    id: '4',
    title: 'Premium Haldi Mandap Setup',
    price: 8999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 456,
    organizer: 'Elite Wedding Co.',
    image: 'https://i.ibb.co/ymTHYKX9/H18.jpg',
    category: 'Haldi',
    discount: 31,
  },
  {
    id: '5',
    title: 'Elegant Haldi Backdrop',
    price: 3999,
    originalPrice: 6999,
    rating: 4.8,
    reviews: 189,
    organizer: 'Love Celebrations',
    image: 'https://i.ibb.co/Kj6hkJ9S/H16.jpg',
    category: 'Haldi',
    discount: 43,
  },
  {
    id: '6',
    title: 'Rustic Haldi Theme Decor',
    price: 5999,
    originalPrice: 9999,
    rating: 4.7,
    reviews: 156,
    organizer: 'Baby Bliss',
    image: 'https://i.ibb.co/zhY6P4s2/H15.jpg',
    category: 'Haldi',
    discount: 40,
  },
  {
    id: '7',
    title: 'Luxury Haldi Stage Design',
    price: 7499,
    originalPrice: 11999,
    rating: 4.8,
    reviews: 278,
    organizer: 'Sweet Celebrations',
    image: 'https://i.ibb.co/Pz96qjcP/H14.jpg',
    category: 'Haldi',
    discount: 38,
  },
  {
    id: '8',
    title: 'Royal Haldi Decoration Set',
    price: 6499,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 402,
    organizer: 'Party Makers',
    image: 'https://i.ibb.co/TqbG846N/H13.jpg',
    category: 'Haldi',
    discount: 41,
  },
  {
    id: '9',
    title: 'Classic Yellow Haldi Setup',
    price: 4499,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 223,
    organizer: 'Festive Decor Co.',
    image: 'https://i.ibb.co/cc9m3Snb/H12.jpg',
    category: 'Haldi',
    discount: 44,
  },
  {
    id: '10',
    title: 'Garden Haldi Theme',
    price: 5999,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 198,
    organizer: 'Royal Events',
    image: 'https://i.ibb.co/h0bCxZ1/H11.jpg',
    category: 'Haldi',
    discount: 40,
  },
  {
    id: '11',
    title: 'Vibrant Haldi Celebration Decor',
    price: 7999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 345,
    organizer: 'Party Perfect',
    image: 'https://i.ibb.co/TB21k24t/H10.jpg',
    category: 'Haldi',
    discount: 38,
  },
  {
    id: '12',
    title: 'Minimalist Haldi Setup',
    price: 3499,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 167,
    organizer: 'Elite Wedding Co.',
    image: 'https://i.ibb.co/nMTL78g4/H9.jpg',
    category: 'Haldi',
    discount: 42,
  },
  {
    id: '13',
    title: 'Grand Haldi Stage Decor',
    price: 9999,
    originalPrice: 15999,
    rating: 4.9,
    reviews: 412,
    organizer: 'Love Celebrations',
    image: 'https://i.ibb.co/hJYnrtzW/H8.jpg',
    category: 'Haldi',
    discount: 38,
  },
  {
    id: '14',
    title: 'Traditional Yellow Haldi',
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 256,
    organizer: 'Baby Bliss',
    image: 'https://i.ibb.co/wZBtnKLz/H7.jpg',
    category: 'Haldi',
    discount: 38,
  },
  {
    id: '15',
    title: 'Modern Haldi Decoration',
    price: 6999,
    originalPrice: 10999,
    rating: 4.7,
    reviews: 189,
    organizer: 'Sweet Celebrations',
    image: 'https://i.ibb.co/GfrZ2rZX/H6.jpg',
    category: 'Haldi',
    discount: 36,
  },
  {
    id: '16',
    title: 'Outdoor Haldi Setup',
    price: 8499,
    originalPrice: 13999,
    rating: 4.9,
    reviews: 378,
    organizer: 'Party Makers',
    image: 'https://i.ibb.co/ynqZ2SLw/H5.jpg',
    category: 'Haldi',
    discount: 39,
  },
  {
    id: '17',
    title: 'Intimate Haldi Theme',
    price: 3999,
    originalPrice: 6999,
    rating: 4.7,
    reviews: 134,
    organizer: 'Festive Decor Co.',
    image: 'https://i.ibb.co/cSJz3NJr/H3.jpg',
    category: 'Haldi',
    discount: 43,
  },
  {
    id: '18',
    title: 'Premium Floral Haldi Decor',
    price: 7999,
    originalPrice: 12999,
    rating: 4.8,
    reviews: 289,
    organizer: 'Royal Events',
    image: 'https://i.ibb.co/8nQ577Mt/H2.jpg',
    category: 'Haldi',
    discount: 38,
  },
  {
    id: '19',
    title: 'Royal Yellow Haldi Setup',
    price: 9499,
    originalPrice: 15999,
    rating: 4.9,
    reviews: 423,
    organizer: 'Party Perfect',
    image: 'https://i.ibb.co/bMLyyHzQ/H1.jpg',
    category: 'Haldi',
    discount: 41,
  },
  // Mehendi Category Products
  {
    id: '20',
    title: 'Traditional Mehendi Decor',
    price: 4999,
    originalPrice: 8499,
    rating: 4.8,
    reviews: 245,
    organizer: 'Elegant Events',
    image: 'https://i.ibb.co/8gpS3Vwz/M1.jpg',
    category: 'Mehendi',
    discount: 41,
  },
  {
    id: '21',
    title: 'Royal Green Mehendi Setup',
    price: 6499,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 312,
    organizer: 'Grand Celebrations',
    image: 'https://i.ibb.co/8nSBSVTB/M2.jpg',
    category: 'Mehendi',
    discount: 41,
  },
  {
    id: '22',
    title: 'Floral Mehendi Theme',
    price: 5499,
    originalPrice: 8999,
    rating: 4.7,
    reviews: 198,
    organizer: 'Bloom Decorations',
    image: 'https://i.ibb.co/235zQnyf/M3.jpg',
    category: 'Mehendi',
    discount: 39,
  },
  {
    id: '23',
    title: 'Elegant Mehendi Celebration',
    price: 7999,
    originalPrice: 12499,
    rating: 4.8,
    reviews: 267,
    organizer: 'Dream Decor',
    image: 'https://i.ibb.co/k63NFtZF/M4.jpg',
    category: 'Mehendi',
    discount: 36,
  },
  {
    id: '24',
    title: 'Garden Mehendi Setup',
    price: 5999,
    originalPrice: 9999,
    rating: 4.6,
    reviews: 189,
    organizer: 'Green Paradise Events',
    image: 'https://i.ibb.co/BHnYD5M7/M5.jpg',
    category: 'Mehendi',
    discount: 40,
  },
  {
    id: '25',
    title: 'Classic Mehendi Decoration',
    price: 4499,
    originalPrice: 7499,
    rating: 4.7,
    reviews: 156,
    organizer: 'Heritage Decor',
    image: 'https://i.ibb.co/G4mCF8RT/M6.jpg',
    category: 'Mehendi',
    discount: 40,
  },
  {
    id: '26',
    title: 'Vibrant Mehendi Setup',
    price: 6999,
    originalPrice: 11999,
    rating: 4.9,
    reviews: 334,
    organizer: 'Colorful Occasions',
    image: 'https://i.ibb.co/5W2X61jS/M7.jpg',
    category: 'Mehendi',
    discount: 42,
  },
  {
    id: '27',
    title: 'Luxury Mehendi Theme',
    price: 8999,
    originalPrice: 14999,
    rating: 4.8,
    reviews: 289,
    organizer: 'Premium Events',
    image: 'https://i.ibb.co/fzmdJMc0/M8.jpg',
    category: 'Mehendi',
    discount: 40,
  },
  {
    id: '28',
    title: 'Bohemian Mehendi Decor',
    price: 5499,
    originalPrice: 8999,
    rating: 4.6,
    reviews: 178,
    organizer: 'Boho Celebrations',
    image: 'https://i.ibb.co/N2gp1hFr/M9.jpg',
    category: 'Mehendi',
    discount: 39,
  },
  {
    id: '29',
    title: 'Modern Mehendi Setup',
    price: 6499,
    originalPrice: 10499,
    rating: 4.7,
    reviews: 223,
    organizer: 'Contemporary Decor',
    image: 'https://i.ibb.co/SXyG4LpW/M10.jpg',
    category: 'Mehendi',
    discount: 38,
  },
  {
    id: '30',
    title: 'Marigold Mehendi Theme',
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 201,
    organizer: 'Floral Fantasy',
    image: 'https://i.ibb.co/8gdxsxjr/M11.jpg',
    category: 'Mehendi',
    discount: 38,
  },
  {
    id: '31',
    title: 'Regal Mehendi Celebration',
    price: 7499,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 298,
    organizer: 'Royal Decor Studio',
    image: 'https://i.ibb.co/ZpR3yV5V/M12.jpg',
    category: 'Mehendi',
    discount: 42,
  },
  {
    id: '32',
    title: 'Outdoor Mehendi Setup',
    price: 8499,
    originalPrice: 13499,
    rating: 4.8,
    reviews: 312,
    organizer: 'Open Air Events',
    image: 'https://i.ibb.co/KcYCtgLw/M13.jpg',
    category: 'Mehendi',
    discount: 37,
  },
  {
    id: '33',
    title: 'Intimate Mehendi Theme',
    price: 3999,
    originalPrice: 6499,
    rating: 4.7,
    reviews: 145,
    organizer: 'Cozy Celebrations',
    image: 'https://i.ibb.co/PsSf3sL6/M14.jpg',
    category: 'Mehendi',
    discount: 38,
  },
  {
    id: '34',
    title: 'Premium Mehendi Decor',
    price: 9499,
    originalPrice: 15999,
    rating: 4.9,
    reviews: 387,
    organizer: 'Elite Events',
    image: 'https://i.ibb.co/C59gn6fF/M15.jpg',
    category: 'Mehendi',
    discount: 41,
  },
  {
    id: '35',
    title: 'Grand Mehendi Setup',
    price: 7999,
    originalPrice: 12999,
    rating: 4.8,
    reviews: 276,
    organizer: 'Magnificent Decor',
    image: 'https://i.ibb.co/5gB9yqWh/M16.jpg',
    category: 'Mehendi',
    discount: 38,
  },
  {
    id: '36',
    title: 'Festive Mehendi Celebration',
    price: 6999,
    originalPrice: 11499,
    rating: 4.9,
    reviews: 345,
    organizer: 'Joyful Occasions',
    image: 'https://i.ibb.co/ZzNFzXBg/M17.jpg',
    category: 'Mehendi',
    discount: 39,
  },
  // Sangeeth Category Products
  {
    id: '37',
    title: 'Grand Sangeeth Decoration',
    price: 8999,
    originalPrice: 14999,
    rating: 4.9,
    reviews: 412,
    organizer: 'Musical Evenings',
    image: 'https://i.ibb.co/tTmhtgd2/S1.jpg',
    category: 'Sangeeth',
    discount: 40,
  },
  {
    id: '38',
    title: 'Elegant Sangeeth Setup',
    price: 7499,
    originalPrice: 12499,
    rating: 4.8,
    reviews: 289,
    organizer: 'Harmony Events',
    image: 'https://i.ibb.co/Y4q5ZKTY/S2.jpg',
    category: 'Sangeeth',
    discount: 40,
  },
  {
    id: '39',
    title: 'Royal Sangeeth Theme',
    price: 9499,
    originalPrice: 15999,
    rating: 4.9,
    reviews: 456,
    organizer: 'Regal Celebrations',
    image: 'https://i.ibb.co/7JvDvzhs/S3.jpg',
    category: 'Sangeeth',
    discount: 41,
  },
  {
    id: '40',
    title: 'Traditional Sangeeth Decor',
    price: 6999,
    originalPrice: 11499,
    rating: 4.7,
    reviews: 234,
    organizer: 'Heritage Musicals',
    image: 'https://i.ibb.co/XZ20TpKk/S4.jpg',
    category: 'Sangeeth',
    discount: 39,
  },
  {
    id: '41',
    title: 'Vibrant Sangeeth Celebration',
    price: 5999,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 312,
    organizer: 'Festive Nights',
    image: 'https://i.ibb.co/tTqSVN1H/S5.jpg',
    category: 'Sangeeth',
    discount: 40,
  },
  {
    id: '42',
    title: 'Luxury Sangeeth Setup',
    price: 10999,
    originalPrice: 17999,
    rating: 4.9,
    reviews: 523,
    organizer: 'Premium Musical Events',
    image: 'https://i.ibb.co/5WRFFRhV/S6.jpg',
    category: 'Sangeeth',
    discount: 39,
  },
  {
    id: '43',
    title: 'Modern Sangeeth Theme',
    price: 8499,
    originalPrice: 13999,
    rating: 4.8,
    reviews: 367,
    organizer: 'Contemporary Celebrations',
    image: 'https://i.ibb.co/RkhzDbjG/S7.jpg',
    category: 'Sangeeth',
    discount: 39,
  },
  {
    id: '44',
    title: 'Premium Sangeeth Decor',
    price: 7999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 398,
    organizer: 'Elite Musical Evenings',
    image: 'https://i.ibb.co/PsfrLxMt/S8.jpg',
    category: 'Sangeeth',
    discount: 38,
  },
  // Wedding Category Products
  {
    id: '45',
    title: 'Grand Wedding Decoration',
    price: 15999,
    originalPrice: 25999,
    rating: 4.9,
    reviews: 567,
    organizer: 'Royal Weddings',
    image: 'https://i.ibb.co/TB9zPTh1/W2.jpg',
    category: 'Wedding',
    discount: 38,
  },
  {
    id: '46',
    title: 'Elegant Wedding Setup',
    price: 12999,
    originalPrice: 21999,
    rating: 4.8,
    reviews: 445,
    organizer: 'Dream Weddings',
    image: 'https://i.ibb.co/1tpRG1Nj/W3.jpg',
    category: 'Wedding',
    discount: 41,
  },
  {
    id: '47',
    title: 'Royal Wedding Theme',
    price: 18999,
    originalPrice: 29999,
    rating: 4.9,
    reviews: 623,
    organizer: 'Regal Events',
    image: 'https://i.ibb.co/27Ddp3SF/W4.jpg',
    category: 'Wedding',
    discount: 37,
  },
  {
    id: '48',
    title: 'Traditional Wedding Decor',
    price: 14999,
    originalPrice: 24999,
    rating: 4.8,
    reviews: 512,
    organizer: 'Heritage Weddings',
    image: 'https://i.ibb.co/Psc1Kjrw/W5.jpg',
    category: 'Wedding',
    discount: 40,
  },
  {
    id: '49',
    title: 'Luxury Wedding Celebration',
    price: 22999,
    originalPrice: 36999,
    rating: 4.9,
    reviews: 789,
    organizer: 'Premium Weddings',
    image: 'https://i.ibb.co/M57VZ2NS/W6.jpg',
    category: 'Wedding',
    discount: 38,
  },
  {
    id: '50',
    title: 'Modern Wedding Setup',
    price: 16999,
    originalPrice: 27999,
    rating: 4.8,
    reviews: 598,
    organizer: 'Contemporary Weddings',
    image: 'https://i.ibb.co/VcsBP188/W7.jpg',
    category: 'Wedding',
    discount: 39,
  },
  {
    id: '51',
    title: 'Premium Wedding Decor',
    price: 19999,
    originalPrice: 31999,
    rating: 4.9,
    reviews: 678,
    organizer: 'Elite Weddings',
    image: 'https://i.ibb.co/YTX5Wh0D/W8.jpg',
    category: 'Wedding',
    discount: 38,
  },
  {
    id: '52',
    title: 'Opulent Wedding Theme',
    price: 24999,
    originalPrice: 39999,
    rating: 4.9,
    reviews: 834,
    organizer: 'Luxury Events',
    image: 'https://i.ibb.co/0j6Lg4yL/W9.jpg',
    category: 'Wedding',
    discount: 38,
  },
  {
    id: '53',
    title: 'Classic Wedding Decoration',
    price: 13999,
    originalPrice: 22999,
    rating: 4.7,
    reviews: 467,
    organizer: 'Timeless Weddings',
    image: 'https://i.ibb.co/cc6NjX4B/W10.jpg',
    category: 'Wedding',
    discount: 39,
  },
  {
    id: '54',
    title: 'Majestic Wedding Setup',
    price: 17999,
    originalPrice: 28999,
    rating: 4.8,
    reviews: 612,
    organizer: 'Majestic Events',
    image: 'https://i.ibb.co/dsVGyX5k/W11.jpg',
    category: 'Wedding',
    discount: 38,
  },
  {
    id: '55',
    title: 'Romantic Wedding Decor',
    price: 15999,
    originalPrice: 25999,
    rating: 4.9,
    reviews: 545,
    organizer: 'Romantic Celebrations',
    image: 'https://i.ibb.co/VcvLj191/W12.jpg',
    category: 'Wedding',
    discount: 38,
  },
  {
    id: '56',
    title: 'Exquisite Wedding Theme',
    price: 21999,
    originalPrice: 34999,
    rating: 4.9,
    reviews: 723,
    organizer: 'Exquisite Events',
    image: 'https://i.ibb.co/YJ8m1CQ/W13.jpg',
    category: 'Wedding',
    discount: 37,
  },
  {
    id: '57',
    title: 'Enchanting Wedding Setup',
    price: 18999,
    originalPrice: 29999,
    rating: 4.8,
    reviews: 634,
    organizer: 'Enchanted Weddings',
    image: 'https://i.ibb.co/8D1djMpQ/W14.jpg',
    category: 'Wedding',
    discount: 37,
  },
  {
    id: '58',
    title: 'Glamorous Wedding Decor',
    price: 20999,
    originalPrice: 33999,
    rating: 4.9,
    reviews: 698,
    organizer: 'Glamour Events',
    image: 'https://i.ibb.co/q3G06HLy/W15.jpg',
    category: 'Wedding',
    discount: 38,
  },
  {
    id: '59',
    title: 'Sophisticated Wedding Theme',
    price: 16999,
    originalPrice: 27999,
    rating: 4.8,
    reviews: 578,
    organizer: 'Sophisticated Events',
    image: 'https://i.ibb.co/F4cMH0TX/W16.jpg',
    category: 'Wedding',
    discount: 39,
  },
  {
    id: '60',
    title: 'Magnificent Wedding Setup',
    price: 23999,
    originalPrice: 37999,
    rating: 4.9,
    reviews: 812,
    organizer: 'Magnificent Weddings',
    image: 'https://i.ibb.co/SwKsKhJ5/W17.jpg',
    category: 'Wedding',
    discount: 37,
  },
  {
    id: '61',
    title: 'Splendid Wedding Decor',
    price: 19999,
    originalPrice: 31999,
    rating: 4.8,
    reviews: 656,
    organizer: 'Splendid Events',
    image: 'https://i.ibb.co/zhsyKXzL/W18.jpg',
    category: 'Wedding',
    discount: 38,
  },
  {
    id: '62',
    title: 'Divine Wedding Celebration',
    price: 25999,
    originalPrice: 41999,
    rating: 4.9,
    reviews: 897,
    organizer: 'Divine Weddings',
    image: 'https://i.ibb.co/sdRw6Wh9/W19.jpg',
    category: 'Wedding',
    discount: 38,
  },
  // Anniversary Category Products
  {
    id: '63',
    title: 'Romantic Anniversary Decor',
    price: 4999,
    originalPrice: 8499,
    rating: 4.8,
    reviews: 256,
    organizer: 'Forever Events',
    image: 'https://i.ibb.co/CKnbMjGt/A1.jpg',
    category: 'Anniversary',
    discount: 41,
  },
  {
    id: '64',
    title: 'Elegant Anniversary Setup',
    price: 5999,
    originalPrice: 9999,
    rating: 4.9,
    reviews: 312,
    organizer: 'Timeless Celebrations',
    image: 'https://i.ibb.co/N6VWR9Pp/A2.jpg',
    category: 'Anniversary',
    discount: 40,
  },
  {
    id: '65',
    title: 'Classic Anniversary Theme',
    price: 4499,
    originalPrice: 7499,
    rating: 4.7,
    reviews: 198,
    organizer: 'Heritage Moments',
    image: 'https://i.ibb.co/Q3F2WrPp/A3.jpg',
    category: 'Anniversary',
    discount: 40,
  },
  {
    id: '66',
    title: 'Golden Anniversary Celebration',
    price: 7999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 378,
    organizer: 'Golden Moments',
    image: 'https://i.ibb.co/b9nTd0L/A4.jpg',
    category: 'Anniversary',
    discount: 38,
  },
  {
    id: '67',
    title: 'Silver Anniversary Decor',
    price: 6499,
    originalPrice: 10999,
    rating: 4.8,
    reviews: 289,
    organizer: 'Silver Celebrations',
    image: 'https://i.ibb.co/qF4780vj/A5.jpg',
    category: 'Anniversary',
    discount: 41,
  },
  {
    id: '68',
    title: 'Premium Anniversary Setup',
    price: 8999,
    originalPrice: 14999,
    rating: 4.9,
    reviews: 423,
    organizer: 'Elite Anniversaries',
    image: 'https://i.ibb.co/0j5DKM7J/A6.jpg',
    category: 'Anniversary',
    discount: 40,
  },
  {
    id: '69',
    title: 'Luxury Anniversary Theme',
    price: 9999,
    originalPrice: 16999,
    rating: 4.9,
    reviews: 467,
    organizer: 'Luxury Moments',
    image: 'https://i.ibb.co/GfQgBqQS/A8.jpg',
    category: 'Anniversary',
    discount: 41,
  },
  {
    id: '70',
    title: 'Modern Anniversary Decor',
    price: 5499,
    originalPrice: 8999,
    rating: 4.7,
    reviews: 223,
    organizer: 'Modern Celebrations',
    image: 'https://i.ibb.co/zT88qCG5/A9.jpg',
    category: 'Anniversary',
    discount: 39,
  },
  {
    id: '71',
    title: 'Traditional Anniversary Setup',
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 267,
    organizer: 'Traditional Events',
    image: 'https://i.ibb.co/8nQBwNjv/A10.jpg',
    category: 'Anniversary',
    discount: 38,
  },
  {
    id: '72',
    title: 'Intimate Anniversary Celebration',
    price: 3999,
    originalPrice: 6499,
    rating: 4.6,
    reviews: 189,
    organizer: 'Intimate Moments',
    image: 'https://i.ibb.co/chhHddTr/A11.jpg',
    category: 'Anniversary',
    discount: 38,
  },
  {
    id: '73',
    title: 'Grand Anniversary Decor',
    price: 11999,
    originalPrice: 19999,
    rating: 4.9,
    reviews: 534,
    organizer: 'Grand Celebrations',
    image: 'https://i.ibb.co/TxNfLNBJ/A12.jpg',
    category: 'Anniversary',
    discount: 40,
  },
  {
    id: '74',
    title: 'Sophisticated Anniversary Theme',
    price: 7499,
    originalPrice: 12499,
    rating: 4.8,
    reviews: 345,
    organizer: 'Sophisticated Events',
    image: 'https://i.ibb.co/sJ6ctJkg/A13.jpg',
    category: 'Anniversary',
    discount: 40,
  },
  {
    id: '75',
    title: 'Enchanting Anniversary Setup',
    price: 6999,
    originalPrice: 11499,
    rating: 4.9,
    reviews: 398,
    organizer: 'Enchanted Moments',
    image: 'https://i.ibb.co/hFnS0DPR/A14.jpg',
    category: 'Anniversary',
    discount: 39,
  },
  {
    id: '76',
    title: 'Elegant Milestone Celebration',
    price: 8499,
    originalPrice: 13999,
    rating: 4.8,
    reviews: 412,
    organizer: 'Milestone Events',
    image: 'https://i.ibb.co/rG87wGnb/A15.jpg',
    category: 'Anniversary',
    discount: 39,
  },
  {
    id: '77',
    title: 'Diamond Anniversary Decor',
    price: 12999,
    originalPrice: 21999,
    rating: 4.9,
    reviews: 589,
    organizer: 'Diamond Celebrations',
    image: 'https://i.ibb.co/d02QQ5Kb/A16.jpg',
    category: 'Anniversary',
    discount: 41,
  },
  {
    id: '78',
    title: 'Ruby Anniversary Theme',
    price: 9999,
    originalPrice: 15999,
    rating: 4.9,
    reviews: 478,
    organizer: 'Ruby Moments',
    image: 'https://i.ibb.co/pv99mdYn/A17.jpg',
    category: 'Anniversary',
    discount: 38,
  },
  {
    id: '79',
    title: 'Pearl Anniversary Setup',
    price: 7999,
    originalPrice: 12999,
    rating: 4.8,
    reviews: 356,
    organizer: 'Pearl Events',
    image: 'https://i.ibb.co/xKXPXmX9/A18.jpg',
    category: 'Anniversary',
    discount: 38,
  },
  {
    id: '80',
    title: 'Charming Anniversary Decor',
    price: 5999,
    originalPrice: 9999,
    rating: 4.7,
    reviews: 234,
    organizer: 'Charming Celebrations',
    image: 'https://i.ibb.co/gMq4kq6C/A19.jpg',
    category: 'Anniversary',
    discount: 40,
  },
  {
    id: '81',
    title: 'Blissful Anniversary Theme',
    price: 6499,
    originalPrice: 10999,
    rating: 4.8,
    reviews: 298,
    organizer: 'Blissful Events',
    image: 'https://i.ibb.co/9HnM7CJb/A20.jpg',
    category: 'Anniversary',
    discount: 41,
  },
  {
    id: '82',
    title: 'Memorable Anniversary Setup',
    price: 7499,
    originalPrice: 11999,
    rating: 4.9,
    reviews: 389,
    organizer: 'Memorable Moments',
    image: 'https://i.ibb.co/s9zn3PjN/A21.jpg',
    category: 'Anniversary',
    discount: 38,
  },
  {
    id: '83',
    title: 'Stunning Anniversary Celebration',
    price: 8999,
    originalPrice: 14999,
    rating: 4.9,
    reviews: 445,
    organizer: 'Stunning Events',
    image: 'https://i.ibb.co/qYx9mw7F/A22.jpg',
    category: 'Anniversary',
    discount: 40,
  },
  {
    id: '84',
    title: 'Magnificent Anniversary Decor',
    price: 10999,
    originalPrice: 17999,
    rating: 4.9,
    reviews: 512,
    organizer: 'Magnificent Moments',
    image: 'https://i.ibb.co/pB43mq7c/A23.jpg',
    category: 'Anniversary',
    discount: 39,
  },
  {
    id: '85',
    title: 'Splendid Anniversary Theme',
    price: 9499,
    originalPrice: 15499,
    rating: 4.8,
    reviews: 467,
    organizer: 'Splendid Celebrations',
    image: 'https://i.ibb.co/Nd6wwfvJ/A24.jpg',
    category: 'Anniversary',
    discount: 39,
  },
  // Welcome Baby Category Products
  {
    id: '86',
    title: 'Sweet Welcome Baby Decor',
    price: 3999,
    originalPrice: 6499,
    rating: 4.8,
    reviews: 198,
    organizer: 'Baby Bliss Events',
    image: 'https://i.ibb.co/6zrQyDV/WB1.jpg',
    category: 'Welcome Baby',
    discount: 38,
  },
  {
    id: '87',
    title: 'Elegant Baby Celebration',
    price: 4499,
    originalPrice: 7499,
    rating: 4.9,
    reviews: 234,
    organizer: 'Little Wonders',
    image: 'https://i.ibb.co/4wk9X64t/WB2.jpg',
    category: 'Welcome Baby',
    discount: 40,
  },
  {
    id: '88',
    title: 'Charming Baby Setup',
    price: 3499,
    originalPrice: 5999,
    rating: 4.7,
    reviews: 167,
    organizer: 'Tiny Tots Events',
    image: 'https://i.ibb.co/BH7PmWqR/WB3.jpg',
    category: 'Welcome Baby',
    discount: 42,
  },
  {
    id: '89',
    title: 'Premium Baby Welcome Theme',
    price: 5999,
    originalPrice: 9999,
    rating: 4.9,
    reviews: 289,
    organizer: 'Precious Moments',
    image: 'https://i.ibb.co/XxPVDr7T/WB4.jpg',
    category: 'Welcome Baby',
    discount: 40,
  },
  {
    id: '90',
    title: 'Adorable Baby Decor',
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 256,
    organizer: 'Baby Joy Celebrations',
    image: 'https://i.ibb.co/21qt7gJV/WB5.jpg',
    category: 'Welcome Baby',
    discount: 38,
  },
  {
    id: '91',
    title: 'Delightful Baby Setup',
    price: 4499,
    originalPrice: 7499,
    rating: 4.7,
    reviews: 212,
    organizer: 'Little Angels Events',
    image: 'https://i.ibb.co/SDpGmmGh/WB6.jpg',
    category: 'Welcome Baby',
    discount: 40,
  },
  {
    id: '92',
    title: 'Modern Baby Welcome',
    price: 5499,
    originalPrice: 8999,
    rating: 4.8,
    reviews: 278,
    organizer: 'Contemporary Baby Events',
    image: 'https://i.ibb.co/XkL8yj0Y/WB7.jpg',
    category: 'Welcome Baby',
    discount: 39,
  },
  {
    id: '93',
    title: 'Classic Baby Celebration',
    price: 3999,
    originalPrice: 6499,
    rating: 4.9,
    reviews: 245,
    organizer: 'Timeless Baby Moments',
    image: 'https://i.ibb.co/mrSFdytT/WB8.jpg',
    category: 'Welcome Baby',
    discount: 38,
  },
  {
    id: '94',
    title: 'Magical Baby Theme',
    price: 6499,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 312,
    organizer: 'Enchanted Baby Events',
    image: 'https://i.ibb.co/gLxdpB5y/WB9.jpg',
    category: 'Welcome Baby',
    discount: 41,
  },
  {
    id: '95',
    title: 'Royal Baby Welcome Setup',
    price: 7999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 367,
    organizer: 'Regal Baby Celebrations',
    image: 'https://i.ibb.co/C55qzV83/WB10.jpg',
    category: 'Welcome Baby',
    discount: 38,
  },
  {
    id: '96',
    title: 'Luxury Baby Decor',
    price: 8999,
    originalPrice: 14999,
    rating: 4.9,
    reviews: 423,
    organizer: 'Elite Baby Events',
    image: 'https://i.ibb.co/PstGTkHG/WB11.jpg',
    category: 'Welcome Baby',
    discount: 40,
  },
  {
    id: '97',
    title: 'Grand Baby Celebration',
    price: 6999,
    originalPrice: 11499,
    rating: 4.8,
    reviews: 298,
    organizer: 'Grand Baby Moments',
    image: 'https://i.ibb.co/TMszF3Wy/WB12.jpg',
    category: 'Welcome Baby',
    discount: 39,
  },
  {
    id: '98',
    title: 'Precious Baby Welcome',
    price: 5499,
    originalPrice: 8999,
    rating: 4.8,
    reviews: 267,
    organizer: 'Precious Baby Events',
    image: 'https://i.ibb.co/VpQ75jXM/WB13.jpg',
    category: 'Welcome Baby',
    discount: 39,
  },
  // Baby Shower Category Products
  {
    id: '99',
    title: 'Sweet Baby Shower Decor',
    price: 4499,
    originalPrice: 7499,
    rating: 4.8,
    reviews: 223,
    organizer: 'Baby Shower Bliss',
    image: 'https://i.ibb.co/0y2bgy1F/BS1.jpg',
    category: 'Baby Shower',
    discount: 40,
  },
  {
    id: '100',
    title: 'Elegant Baby Shower Setup',
    price: 5999,
    originalPrice: 9999,
    rating: 4.9,
    reviews: 289,
    organizer: 'Elegant Baby Events',
    image: 'https://i.ibb.co/x8rv9qw1/BS2.jpg',
    category: 'Baby Shower',
    discount: 40,
  },
  {
    id: '101',
    title: 'Charming Shower Theme',
    price: 3999,
    originalPrice: 6499,
    rating: 4.7,
    reviews: 198,
    organizer: 'Charming Showers',
    image: 'https://i.ibb.co/xtzxchQd/BS3.jpg',
    category: 'Baby Shower',
    discount: 38,
  },
  {
    id: '102',
    title: 'Premium Baby Shower Celebration',
    price: 6999,
    originalPrice: 11499,
    rating: 4.9,
    reviews: 312,
    organizer: 'Premium Shower Events',
    image: 'https://i.ibb.co/1Y3WmTXB/BS4.jpg',
    category: 'Baby Shower',
    discount: 39,
  },
  {
    id: '103',
    title: 'Adorable Shower Decor',
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 256,
    organizer: 'Adorable Celebrations',
    image: 'https://i.ibb.co/M5pxvncR/BS5.jpg',
    category: 'Baby Shower',
    discount: 38,
  },
  {
    id: '104',
    title: 'Delightful Baby Shower',
    price: 5499,
    originalPrice: 8999,
    rating: 4.8,
    reviews: 278,
    organizer: 'Delightful Showers',
    image: 'https://i.ibb.co/p6vHzqhg/BS6.jpg',
    category: 'Baby Shower',
    discount: 39,
  },
  {
    id: '105',
    title: 'Modern Baby Shower Theme',
    price: 6499,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 334,
    organizer: 'Modern Shower Events',
    image: 'https://i.ibb.co/Nnf2wzyk/BS7.jpg',
    category: 'Baby Shower',
    discount: 41,
  },
  {
    id: '106',
    title: 'Classic Baby Shower Setup',
    price: 4499,
    originalPrice: 7499,
    rating: 4.7,
    reviews: 212,
    organizer: 'Classic Celebrations',
    image: 'https://i.ibb.co/zTR7MrGB/BS8.jpg',
    category: 'Baby Shower',
    discount: 40,
  },
  {
    id: '107',
    title: 'Magical Shower Celebration',
    price: 7999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 367,
    organizer: 'Magical Shower Events',
    image: 'https://i.ibb.co/1Gb5mZxJ/BS9.jpg',
    category: 'Baby Shower',
    discount: 38,
  },
  {
    id: '108',
    title: 'Royal Baby Shower Decor',
    price: 8999,
    originalPrice: 14999,
    rating: 4.9,
    reviews: 412,
    organizer: 'Royal Shower Celebrations',
    image: 'https://i.ibb.co/1tWfXqVB/BS10.jpg',
    category: 'Baby Shower',
    discount: 40,
  },
  {
    id: '109',
    title: 'Luxury Baby Shower Theme',
    price: 9999,
    originalPrice: 16999,
    rating: 4.9,
    reviews: 456,
    organizer: 'Luxury Shower Events',
    image: 'https://i.ibb.co/VYqYNHX9/BS11.jpg',
    category: 'Baby Shower',
    discount: 41,
  },
  {
    id: '110',
    title: 'Grand Baby Shower Setup',
    price: 7499,
    originalPrice: 11999,
    rating: 4.8,
    reviews: 298,
    organizer: 'Grand Shower Celebrations',
    image: 'https://i.ibb.co/jkwMj92P/BS12.jpg',
    category: 'Baby Shower',
    discount: 38,
  },
  {
    id: '111',
    title: 'Sophisticated Shower Decor',
    price: 6999,
    originalPrice: 11499,
    rating: 4.8,
    reviews: 289,
    organizer: 'Sophisticated Showers',
    image: 'https://i.ibb.co/ymjbPqkG/BS13.jpg',
    category: 'Baby Shower',
    discount: 39,
  },
  {
    id: '112',
    title: 'Enchanting Baby Shower',
    price: 5999,
    originalPrice: 9999,
    rating: 4.9,
    reviews: 323,
    organizer: 'Enchanted Shower Events',
    image: 'https://i.ibb.co/cKBQY2HT/BS14.jpg',
    category: 'Baby Shower',
    discount: 40,
  },
  {
    id: '113',
    title: 'Elegant Milestone Shower',
    price: 6499,
    originalPrice: 10499,
    rating: 4.8,
    reviews: 267,
    organizer: 'Milestone Shower Events',
    image: 'https://i.ibb.co/HTKdm6bf/BS15.jpg',
    category: 'Baby Shower',
    discount: 38,
  },
  {
    id: '114',
    title: 'Precious Baby Shower Theme',
    price: 8499,
    originalPrice: 13999,
    rating: 4.9,
    reviews: 389,
    organizer: 'Precious Shower Events',
    image: 'https://i.ibb.co/CNtsjCX/BS16.jpg',
    category: 'Baby Shower',
    discount: 39,
  },
  {
    id: '115',
    title: 'Splendid Baby Shower Celebration',
    price: 7999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 378,
    organizer: 'Splendid Shower Events',
    image: 'https://i.ibb.co/3YCCHvSf/BS17.jpg',
    category: 'Baby Shower',
    discount: 38,
  },
  // Birthday Category
  {
    id: '116',
    title: 'Magical Birthday Party Setup',
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 289,
    organizer: 'Birthday Bash Events',
    image: 'https://i.ibb.co/1hkJ6GT/B1.jpg',
    category: 'Birthday',
    discount: 38,
  },
  {
    id: '117',
    title: 'Elegant Birthday Celebration Décor',
    price: 5499,
    originalPrice: 8999,
    rating: 4.7,
    reviews: 235,
    organizer: 'Celebration Masters',
    image: 'https://i.ibb.co/8gJwqBWH/B2.jpg',
    category: 'Birthday',
    discount: 39,
  },
  {
    id: '118',
    title: 'Grand Birthday Bash Setup',
    price: 6999,
    originalPrice: 11499,
    rating: 4.9,
    reviews: 412,
    organizer: 'Grand Celebrations',
    image: 'https://i.ibb.co/6cZrVYrV/B3.jpg',
    category: 'Birthday',
    discount: 39,
  },
  {
    id: '119',
    title: 'Vibrant Birthday Party Décor',
    price: 4499,
    originalPrice: 6999,
    rating: 4.6,
    reviews: 198,
    organizer: 'Vibrant Events Co',
    image: 'https://i.ibb.co/Q7gjhYNZ/B4.jpg',
    category: 'Birthday',
    discount: 36,
  },
  {
    id: '120',
    title: 'Luxurious Birthday Celebration',
    price: 8999,
    originalPrice: 14999,
    rating: 4.9,
    reviews: 456,
    organizer: 'Luxury Party Planners',
    image: 'https://i.ibb.co/4ZZnbCxG/B5.jpg',
    category: 'Birthday',
    discount: 40,
  },
  {
    id: '121',
    title: 'Colorful Birthday Fiesta Décor',
    price: 5999,
    originalPrice: 9499,
    rating: 4.8,
    reviews: 334,
    organizer: 'Fiesta Celebrations',
    image: 'https://i.ibb.co/RkLgQXWG/B6.jpg',
    category: 'Birthday',
    discount: 37,
  },
  {
    id: '122',
    title: 'Premium Birthday Party Setup',
    price: 7499,
    originalPrice: 11999,
    rating: 4.7,
    reviews: 301,
    organizer: 'Premium Party Events',
    image: 'https://i.ibb.co/dJPyrcdF/B7.jpg',
    category: 'Birthday',
    discount: 38,
  },
  {
    id: '123',
    title: 'Stunning Birthday Bash Décor',
    price: 6499,
    originalPrice: 10499,
    rating: 4.8,
    reviews: 378,
    organizer: 'Stunning Events',
    image: 'https://i.ibb.co/YFxWD98f/B8.jpg',
    category: 'Birthday',
    discount: 38,
  },
  {
    id: '124',
    title: 'Delightful Birthday Party Theme',
    price: 5499,
    originalPrice: 8499,
    rating: 4.7,
    reviews: 267,
    organizer: 'Delightful Décor',
    image: 'https://i.ibb.co/FbtNjPKL/B9.jpg',
    category: 'Birthday',
    discount: 35,
  },
  {
    id: '125',
    title: 'Spectacular Birthday Celebration',
    price: 7999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 445,
    organizer: 'Spectacular Events',
    image: 'https://i.ibb.co/0jRJyW8t/B11.jpg',
    category: 'Birthday',
    discount: 38,
  },
  {
    id: '126',
    title: 'Charming Birthday Party Décor',
    price: 6999,
    originalPrice: 10999,
    rating: 4.8,
    reviews: 356,
    organizer: 'Charming Celebrations',
    image: 'https://i.ibb.co/nsCZZhWy/B12.jpg',
    category: 'Birthday',
    discount: 36,
  },
  {
    id: '127',
    title: 'Radiant Birthday Bash Setup',
    price: 5999,
    originalPrice: 9999,
    rating: 4.7,
    reviews: 298,
    organizer: 'Radiant Party Events',
    image: 'https://i.ibb.co/G3C7G78D/B13.jpg',
    category: 'Birthday',
    discount: 40,
  },
  {
    id: '128',
    title: 'Dazzling Birthday Celebration',
    price: 7499,
    originalPrice: 11999,
    rating: 4.8,
    reviews: 389,
    organizer: 'Dazzling Décor Co',
    image: 'https://i.ibb.co/39MwpC1h/B14.jpg',
    category: 'Birthday',
    discount: 38,
  },
  {
    id: '129',
    title: 'Festive Birthday Party Theme',
    price: 6499,
    originalPrice: 10499,
    rating: 4.9,
    reviews: 423,
    organizer: 'Festive Events',
    image: 'https://i.ibb.co/wNnyvwf0/B15.jpg',
    category: 'Birthday',
    discount: 38,
  },
  {
    id: '130',
    title: 'Enchanting Birthday Bash Décor',
    price: 8499,
    originalPrice: 13999,
    rating: 4.8,
    reviews: 467,
    organizer: 'Enchanting Celebrations',
    image: 'https://i.ibb.co/FkWqdX95/B16.jpg',
    category: 'Birthday',
    discount: 39,
  },
  {
    id: '131',
    title: 'Glorious Birthday Party Setup',
    price: 7999,
    originalPrice: 12499,
    rating: 4.7,
    reviews: 345,
    organizer: 'Glorious Events',
    image: 'https://i.ibb.co/Q78myW0R/B17.jpg',
    category: 'Birthday',
    discount: 36,
  },
  {
    id: '132',
    title: 'Magnificent Birthday Celebration',
    price: 9499,
    originalPrice: 15999,
    rating: 4.9,
    reviews: 512,
    organizer: 'Magnificent Party Planners',
    image: 'https://i.ibb.co/VWc27WSy/B18.jpg',
    category: 'Birthday',
    discount: 41,
  },
  {
    id: '133',
    title: 'Brilliant Birthday Bash Theme',
    price: 6999,
    originalPrice: 10999,
    rating: 4.8,
    reviews: 378,
    organizer: 'Brilliant Décor',
    image: 'https://i.ibb.co/BKPZFWtR/B19.jpg',
    category: 'Birthday',
    discount: 36,
  },
  {
    id: '134',
    title: 'Splendid Birthday Party Décor',
    price: 7499,
    originalPrice: 11999,
    rating: 4.7,
    reviews: 334,
    organizer: 'Splendid Celebrations',
    image: 'https://i.ibb.co/WpMSFLP7/B20.jpg',
    category: 'Birthday',
    discount: 38,
  },
  {
    id: '135',
    title: 'Exquisite Birthday Celebration',
    price: 8999,
    originalPrice: 14499,
    rating: 4.9,
    reviews: 489,
    organizer: 'Exquisite Events Co',
    image: 'https://i.ibb.co/V0mB0smV/B21.jpg',
    category: 'Birthday',
    discount: 38,
  },
  {
    id: '136',
    title: 'Wonderful Birthday Bash Setup',
    price: 6499,
    originalPrice: 10499,
    rating: 4.8,
    reviews: 367,
    organizer: 'Wonderful Party Events',
    image: 'https://i.ibb.co/xSWpT4MW/B22.jpg',
    category: 'Birthday',
    discount: 38,
  },
  {
    id: '137',
    title: 'Fabulous Birthday Party Theme',
    price: 7999,
    originalPrice: 12999,
    rating: 4.7,
    reviews: 401,
    organizer: 'Fabulous Décor',
    image: 'https://i.ibb.co/N2pvKGjL/B23.jpg',
    category: 'Birthday',
    discount: 38,
  },
  {
    id: '138',
    title: 'Glamorous Birthday Celebration',
    price: 9999,
    originalPrice: 16499,
    rating: 4.9,
    reviews: 534,
    organizer: 'Glamorous Events',
    image: 'https://i.ibb.co/rKxgTT92/B24.jpg',
    category: 'Birthday',
    discount: 39,
  },
  {
    id: '139',
    title: 'Majestic Birthday Bash Décor',
    price: 8499,
    originalPrice: 13999,
    rating: 4.8,
    reviews: 456,
    organizer: 'Majestic Celebrations',
    image: 'https://i.ibb.co/fzH93Ryj/B25.jpg',
    category: 'Birthday',
    discount: 39,
  },
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'priceLow', 'priceHigh', 'rating'
  const [showSidebar, setShowSidebar] = useState(false);
  const { cartItems, wishlistItems, toggleWishlist, isInWishlist, user, logout } = useApp();

  // Share products data with ProductsScreen and ProductDetailsScreen
  useEffect(() => {
    setSharedProducts(DECOR_PRODUCTS);
    setAllProducts(DECOR_PRODUCTS);
    setWishlistProducts(DECOR_PRODUCTS);
    setCartProducts(DECOR_PRODUCTS);
  }, []);

  // Filter products based on search query
  let filteredProducts = searchQuery.trim()
    ? DECOR_PRODUCTS.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : DECOR_PRODUCTS;

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        return b.reviews - a.reviews;
    }
  });

  const handleSort = () => {
    Alert.alert(
      'Sort By',
      'Choose sorting option',
      [
        { text: 'Popular', onPress: () => setSortBy('popular') },
        { text: 'Price: Low to High', onPress: () => setSortBy('priceLow') },
        { text: 'Price: High to Low', onPress: () => setSortBy('priceHigh') },
        { text: 'Rating', onPress: () => setSortBy('rating') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleFilter = () => {
    Alert.alert(
      'Filter',
      'Filter by category from the list above or use search to find specific items',
      [{ text: 'OK' }]
    );
  };

  const handlePriceFilter = () => {
    Alert.alert(
      'Price Range',
      'Select price range',
      [
        { text: 'Under ₹5,000', onPress: () => setSearchQuery('') },
        { text: '₹5,000 - ₹10,000', onPress: () => setSearchQuery('') },
        { text: '₹10,000+', onPress: () => setSearchQuery('') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleWishlistToggle = (id) => {
    toggleWishlist(id);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem} 
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Products', { eventType: item.name })}>
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
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}>
      <View style={styles.productImageContainer}>
        <Image
          source={typeof item.image === 'number' ? item.image : { uri: item.image }}
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
            handleWishlistToggle(item.id);
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
      
      {/* Sidebar Modal */}
      <Modal
        visible={showSidebar}
        animationType="none"
        transparent={true}
        onRequestClose={() => setShowSidebar(false)}>
        <View style={styles.sidebarOverlay}>
          <View style={styles.sidebarContainer}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              style={styles.sidebarHeader}>
              <View style={styles.sidebarProfileSection}>
                <View style={styles.sidebarProfileCircle}>
                  <IconSymbol name="person.fill" size={40} color="#8B5CF6" />
                </View>
                <Text style={styles.sidebarUserName}>{user?.name}</Text>
                <Text style={styles.sidebarUserEmail}>{user?.email}</Text>
              </View>
            </LinearGradient>
            
            <ScrollView 
              style={styles.sidebarContent}
              contentContainerStyle={styles.sidebarContentContainer}
              showsVerticalScrollIndicator={true}
              bounces={true}>
              <TouchableOpacity 
                style={styles.sidebarItem}
                onPress={() => { setShowSidebar(false); navigation.navigate('Home'); }}>
                <IconSymbol name="house.fill" size={24} color="#8B5CF6" />
                <Text style={styles.sidebarItemText}>Home</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sidebarItem}
                onPress={() => { setShowSidebar(false); navigation.navigate('ExploreCategoriesScreen'); }}>
                <IconSymbol name="square.grid.2x2" size={24} color="#8B5CF6" />
                <Text style={styles.sidebarItemText}>Categories</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sidebarItem}
                onPress={() => { setShowSidebar(false); navigation.navigate('Orders'); }}>
                <IconSymbol name="bag.fill" size={24} color="#8B5CF6" />
                <Text style={styles.sidebarItemText}>My Orders</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sidebarItem}
                onPress={() => { setShowSidebar(false); navigation.navigate('Wishlist'); }}>
                <IconSymbol name="heart.fill" size={24} color="#8B5CF6" />
                <Text style={styles.sidebarItemText}>Wishlist</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sidebarItem}
                onPress={() => { setShowSidebar(false); navigation.navigate('Cart'); }}>
                <IconSymbol name="cart.fill" size={24} color="#8B5CF6" />
                <Text style={styles.sidebarItemText}>Cart</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sidebarItem}
                onPress={() => { setShowSidebar(false); navigation.navigate('BudgetPlanner'); }}>
                <IconSymbol name="indianrupeesign.circle.fill" size={24} color="#8B5CF6" />
                <Text style={styles.sidebarItemText}>Budget Planner</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.sidebarItem}
                onPress={() => { setShowSidebar(false); navigation.navigate('AddressManagement'); }}>
                <IconSymbol name="mappin.and.ellipse" size={24} color="#8B5CF6" />
                <Text style={styles.sidebarItemText}>Saved Addresses</Text>
              </TouchableOpacity>
              
              <View style={styles.sidebarDivider} />
              
              <TouchableOpacity 
                style={styles.sidebarItem}
                onPress={() => { setShowSidebar(false); navigation.navigate('HelpSupport'); }}>
                <IconSymbol name="questionmark.circle" size={24} color="#8B5CF6" />
                <Text style={styles.sidebarItemText}>Help & Support</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sidebarItem}
                onPress={() => {
                  setShowSidebar(false);
                  Alert.alert(
                    'Logout',
                    'Are you sure you want to logout?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { 
                        text: 'Logout', 
                        onPress: () => {
                          logout();
                          navigation.replace('Login');
                        }
                      }
                    ]
                  );
                }}>
                <IconSymbol name="arrow.right.square" size={24} color="#FF1E6C" />
                <Text style={[styles.sidebarItemText, { color: '#FF1E6C' }]}>Sign Out</Text>
              </TouchableOpacity>

              <View style={styles.sidebarBottomPadding} />
            </ScrollView>
          </View>
          <TouchableOpacity 
            style={styles.sidebarBackdrop}
            activeOpacity={1}
            onPress={() => setShowSidebar(false)}
          />
        </View>
      </Modal>
      
      {/* Header */}
      <LinearGradient
        colors={['#FFD6E0', '#E6E0FF', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <TouchableOpacity 
              style={styles.profileBtn}
              onPress={() => setShowSidebar(true)}>
              <View style={styles.profileCircle}>
                <IconSymbol name="person.fill" size={24} color="#C4A1FF" />
              </View>
            </TouchableOpacity>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.userName}>{user?.name}</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.iconBtn}
              onPress={() => navigation.navigate('Wishlist')}>
              <IconSymbol name="heart" size={24} color="#8B5CF6" />
              {wishlistItems.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{wishlistItems.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconBtn}
              onPress={() => navigation.navigate('Cart')}>
              <IconSymbol name="cart" size={24} color="#8B5CF6" />
              {cartItems.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
              )}
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
          <TouchableOpacity style={styles.filterBtn} onPress={handleFilter}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.filterBtnGradient}>
              <IconSymbol name="line.3.horizontal.decrease.circle" size={18} color="#8B5CF6" />
              <Text style={styles.filterBtnText}>Filter</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterBtn} onPress={handleSort}>
            <LinearGradient
              colors={['#E6E0FF', '#FFD6E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.filterBtnGradient}>
              <IconSymbol name="arrow.up.arrow.down" size={18} color="#8B5CF6" />
              <Text style={styles.filterBtnText}>Sort</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterBtn} onPress={handlePriceFilter}>
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
          <Text style={styles.sectionTitle}>
            {searchQuery.trim() ? `Search Results (${sortedProducts.length})` : 'Popular Decorations'}
          </Text>
          <FlatList
            data={sortedProducts}
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
          onPress={() => navigation.navigate('Events')}>
          <IconSymbol name="sparkles" size={24} color="#9CA3AF" />
          <Text style={styles.footerTabText}>Explore Decor</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerTab}
          onPress={() => navigation.navigate('Services')}>
          <IconSymbol name="bag" size={24} color="#9CA3AF" />
          <Text style={styles.footerTabText}>Services</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerTab}
          onPress={() => navigation.navigate('BudgetPlanner')}>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  welcomeTextContainer: {
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '400',
  },
  userName: {
    fontSize: 15,
    color: '#2D1B69',
    fontWeight: '700',
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
  // Sidebar Styles
  sidebarOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebarBackdrop: {
    flex: 1,
  },
  sidebarContainer: {
    width: width * 0.75,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  sidebarHeader: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  sidebarProfileSection: {
    alignItems: 'center',
  },
  sidebarProfileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sidebarUserName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sidebarUserEmail: {
    fontSize: 14,
    color: '#666',
  },
  sidebarContent: {
    flex: 1,
  },
  sidebarContentContainer: {
    paddingBottom: 40,
  },
  sidebarBottomPadding: {
    height: 80,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  sidebarItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    fontWeight: '600',
  },
  sidebarDivider: {
    height: 8,
    backgroundColor: '#F5F5F5',
    marginVertical: 12,
  },
});