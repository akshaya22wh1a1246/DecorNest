import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import ModelViewerWebView from '../components/ModelViewerWebView';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';
import { useThemeColor } from '../hooks/use-theme-color';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params || {
    product: {
      id: 'demo',
      title: 'Rustic Wedding Setup',
      description: 'Beautiful rustic-themed wedding decoration package',
      price: 1499.99,
      modelUrl: 'https://example.com/sample-decor.glb',
      images: ['https://example.com/images/rustic1.jpg'],
      materials: ['Wooden Arches', 'Mason Jars', 'Fairy Lights'],
      vendor: {
        id: 'v1',
        name: 'Elite Events',
        rating: 4.8
      }
    }
  };

  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | '3d' | 'ar'
  const { width } = useWindowDimensions();
  const backgroundColor = useThemeColor('background');
  const tintColor = useThemeColor('tint');

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {/* Preview Section */}
        <View style={[styles.previewContainer, { height: width * 0.8 }]}>
          {viewMode === 'gallery' ? (
            <View style={styles.gallery}>
              {/* Add Image gallery here */}
              <ThemedText>Image Gallery</ThemedText>
            </View>
          ) : (
            <ModelViewerWebView
              modelUrl={product.modelUrl}
              poster={product.images?.[0]}
              backgroundColor={backgroundColor}
              ar={viewMode === 'ar'}
            />
          )}
        </View>

        {/* View Mode Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'gallery' && { backgroundColor: tintColor }
            ]}
            onPress={() => setViewMode('gallery')}>
            <ThemedText>Gallery</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === '3d' && { backgroundColor: tintColor }
            ]}
            onPress={() => setViewMode('3d')}>
            <ThemedText>3D View</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'ar' && { backgroundColor: tintColor }
            ]}
            onPress={() => setViewMode('ar')}>
            <ThemedText>Try in AR</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <ThemedText style={styles.title}>{product.title}</ThemedText>
          <ThemedText style={styles.price}>${product.price}</ThemedText>
          <ThemedText style={styles.description}>{product.description}</ThemedText>

          {/* Materials List */}
          <View style={styles.materialsContainer}>
            <ThemedText style={styles.sectionTitle}>Materials Needed:</ThemedText>
            {product.materials.map((material, index) => (
              <ThemedText key={index} style={styles.material}>
                • {material}
              </ThemedText>
            ))}
          </View>

          {/* Vendor Info */}
          <View style={styles.vendorContainer}>
            <ThemedText style={styles.vendorName}>
              By {product.vendor?.name}
            </ThemedText>
            <ThemedText style={styles.rating}>
              Rating: {product.vendor?.rating} ⭐
            </ThemedText>
          </View>

          {/* Add to Cart/Plan Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: tintColor }]}
            onPress={() => {
              navigation.navigate('BudgetPlanner', { product });
            }}>
            <ThemedText style={styles.buttonText}>
              Add to Plan - ${product.price}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    width: '100%',
  },
  gallery: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  toggleButton: {
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '500',
  },
  rating: {
    fontSize: 16,
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
