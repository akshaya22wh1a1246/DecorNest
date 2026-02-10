import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: '1', name: 'Wedding', emoji: '💒', color1: '#FFB6C1', color2: '#FF69B4' },
  { id: '2', name: 'Birthday', emoji: '🎂', color1: '#FFD6E0', color2: '#FFA6C9' },
  { id: '3', name: 'Baby Shower', emoji: '👶', color1: '#E6F7FF', color2: '#BAE7FF' },
  { id: '4', name: 'Anniversary', emoji: '💝', color1: '#FFE6E6', color2: '#FFB3BA' },
  { id: '5', name: 'Reception', emoji: '🎊', color1: '#F0E6FF', color2: '#D4B3FF' },
  { id: '6', name: 'Sangeeth', emoji: '🎵', color1: '#FFF4E6', color2: '#FFD699' },
  { id: '7', name: 'Mehendi', emoji: '🎨', color1: '#E8F5E9', color2: '#A5D6A7' },
  { id: '8', name: 'Welcome Baby', emoji: '🍼', color1: '#E1F5FE', color2: '#81D4FA' },
  { id: '9', name: 'Haldi', emoji: '💛', color1: '#FFF9C4', color2: '#FFE082' },
];

export default function ExploreCategoriesScreen({ navigation }) {
  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryCard} 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Products', { eventType: item.name })}>
      <LinearGradient
        colors={[item.color1, item.color2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.categoryGradient}>
        <View style={styles.emojiContainer}>
          <Text style={styles.categoryEmoji}>{item.emoji}</Text>
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <View style={styles.arrowContainer}>
          <IconSymbol name="chevron.right" size={20} color="#fff" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#E6E0FF" barStyle="dark-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#FFD6E0', '#E6E0FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <IconSymbol name="chevron.left" size={24} color="#8B5CF6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Explore Categories</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>Discover Perfect Themes for Every Occasion</Text>
          
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  categoriesList: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryCard: {
    width: (width - 48) / 2,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  arrowContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
