import RealisticARViewer from '@/components/RealisticARViewer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
// @ts-ignore - expo-image-picker types
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

interface ColorOption {
  id: string;
  name: string;
  primary: string;
  secondary: string;
}

interface MaterialOption {
  id: string;
  name: string;
  icon: string;
  filter: string;
}

interface DesignElement {
  id: string;
  name: string;
  icon: string;
  effect: string;
}

export default function ARCustomizerScreen() {
  const params = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [arView, setArView] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption | null>(null);
  const [selectedElement, setDesignElement] = useState<DesignElement | null>(null);
  const [uploading, setUploading] = useState(false);

  // Allow deep-linking from a specific theme/product
  useEffect(() => {
    const imageFromRoute = params.image as string | undefined;
    if (imageFromRoute) {
      setSelectedImage(imageFromRoute);
      setSelectedColor(colorOptions[0]);
      setSelectedMaterial(materialOptions[0]);
      setDesignElement(designElements[0]);
    }
  }, [params.image]);

  // Sample decoration images - real event setups on venue/stage
  const sampleImages = [
    // Use only URLs that are already confirmed visible on your device
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', // wedding table setup
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800', // colorful birthday balloons
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800', // baby/kids celebration area
  ];

  // Color customization options
  const colorOptions: ColorOption[] = [
    { id: 'default', name: 'Original', primary: '#FFFFFF', secondary: '#FFFFFF' },
    { id: 'purple', name: 'Purple Dream', primary: '#8B5CF6', secondary: '#E6E0FF' },
    { id: 'pink', name: 'Rose Gold', primary: '#FF1E6C', secondary: '#FFD6E0' },
    { id: 'blue', name: 'Ocean Blue', primary: '#3B82F6', secondary: '#DBEAFE' },
    { id: 'gold', name: 'Golden Glow', primary: '#F59E0B', secondary: '#FEF3C7' },
    { id: 'green', name: 'Emerald', primary: '#10B981', secondary: '#D1FAE5' },
  ];

  // Material options
  const materialOptions: MaterialOption[] = [
    { id: 'normal', name: 'Normal', icon: 'photo', filter: 'none' },
    { id: 'metallic', name: 'Metallic', icon: 'sparkles', filter: 'brightness(1.2) contrast(1.1)' },
    { id: 'matte', name: 'Matte', icon: 'circle.fill', filter: 'saturate(0.8) brightness(0.95)' },
    { id: 'glossy', name: 'Glossy', icon: 'light.max', filter: 'brightness(1.3) saturate(1.2)' },
    { id: 'vintage', name: 'Vintage', icon: 'camera.filters', filter: 'sepia(0.3) contrast(0.9)' },
  ];

  // Design elements
  const designElements: DesignElement[] = [
    { id: 'none', name: 'None', icon: 'xmark', effect: 'none' },
    { id: 'bokeh', name: 'Bokeh', icon: 'circle.hexagongrid', effect: 'blur(1px)' },
    { id: 'glow', name: 'Glow', icon: 'sun.max', effect: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))' },
    { id: 'shadow', name: 'Shadow', icon: 'shadow', effect: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))' },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant photo library access to upload images');
      return;
    }

    setUploading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setSelectedColor(colorOptions[0]);
        setSelectedMaterial(materialOptions[0]);
        setDesignElement(designElements[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setUploading(false);
    }
  };

  const selectSampleImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setSelectedColor(colorOptions[0]);
    setSelectedMaterial(materialOptions[0]);
    setDesignElement(designElements[0]);
  };

  const getCustomizedImageUrl = () => {
    if (!selectedImage) return '';
    
    // For sample images, apply filters via URL parameters (if supported)
    // For uploaded images, we'll apply CSS filters in the AR viewer
    return selectedImage;
  };

  const getCombinedFilter = () => {
    let filters = [];
    
    if (selectedMaterial && selectedMaterial.filter !== 'none') {
      filters.push(selectedMaterial.filter);
    }
    
    if (selectedElement && selectedElement.effect !== 'none') {
      filters.push(selectedElement.effect);
    }
    
    return filters.join(' ');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#E6E0FF', '#FFD6E0']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerIconCircle}>
              <IconSymbol name="cube.transparent" size={48} color="#8B5CF6" />
            </View>
            <ThemedText style={styles.headerTitle}>AR Decoration Customizer</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Upload or select • Customize • Visualize in 3D/AR
            </ThemedText>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Upload Section */}
          {!selectedImage && (
            <>
              <ThemedText style={styles.sectionTitle}>Upload Your Decoration</ThemedText>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={pickImage}
                activeOpacity={0.8}
                disabled={uploading}
              >
                <LinearGradient
                  colors={['#8B5CF6', '#FF1E6C']}
                  style={styles.uploadGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {uploading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <>
                      <IconSymbol name="photo.badge.plus" size={32} color="#FFFFFF" />
                      <ThemedText style={styles.uploadText}>Upload from Gallery</ThemedText>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Sample Images */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <ThemedText style={styles.dividerText}>OR SELECT SAMPLE</ThemedText>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.samplesGrid}>
                {sampleImages.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.sampleCard}
                    onPress={() => selectSampleImage(image)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.sampleImageContainer}>
                      <Image source={{ uri: image }} style={styles.sampleImage} resizeMode="cover" />
                      <View style={styles.sampleOverlay}>
                        <IconSymbol name="checkmark.circle.fill" size={24} color="#FFFFFF" />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Customization Section */}
          {selectedImage && (
            <>
              {/* Preview Image */}
              <ThemedText style={styles.sectionTitle}>Preview & Customize</ThemedText>
              <View style={styles.previewCard}>
                <Image 
                  source={{ uri: selectedImage }} 
                  style={styles.previewImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.arViewButton}
                  onPress={() => setArView(true)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#8B5CF6', '#FF1E6C']}
                    style={styles.arViewGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <IconSymbol name="camera.viewfinder" size={24} color="#FFFFFF" />
                    <ThemedText style={styles.arViewText}>View in AR Camera</ThemedText>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Color Customization */}
              <ThemedText style={styles.customizeTitle}>
                <IconSymbol name="paintpalette" size={18} color="#8B5CF6" /> Color Theme
              </ThemedText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
                {colorOptions.map((color) => (
                  <TouchableOpacity
                    key={color.id}
                    style={[
                      styles.colorOption,
                      selectedColor?.id === color.id && styles.colorOptionActive,
                    ]}
                    onPress={() => setSelectedColor(color)}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={[color.primary, color.secondary]}
                      style={styles.colorCircle}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                    <ThemedText style={styles.optionName}>{color.name}</ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Material Options */}
              <ThemedText style={styles.customizeTitle}>
                <IconSymbol name="sparkles" size={18} color="#8B5CF6" /> Material Finish
              </ThemedText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
                {materialOptions.map((material) => (
                  <TouchableOpacity
                    key={material.id}
                    style={[
                      styles.materialOption,
                      selectedMaterial?.id === material.id && styles.materialOptionActive,
                    ]}
                    onPress={() => setSelectedMaterial(material)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.materialIcon}>
                      <IconSymbol name={material.icon as any} size={24} color="#8B5CF6" />
                    </View>
                    <ThemedText style={styles.optionName}>{material.name}</ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Design Elements */}
              <ThemedText style={styles.customizeTitle}>
                <IconSymbol name="wand.and.stars" size={18} color="#8B5CF6" /> Effects
              </ThemedText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
                {designElements.map((element) => (
                  <TouchableOpacity
                    key={element.id}
                    style={[
                      styles.elementOption,
                      selectedElement?.id === element.id && styles.elementOptionActive,
                    ]}
                    onPress={() => setDesignElement(element)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.elementIcon}>
                      <IconSymbol name={element.icon as any} size={24} color="#8B5CF6" />
                    </View>
                    <ThemedText style={styles.optionName}>{element.name}</ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Reset Button */}
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => setSelectedImage(null)}
                activeOpacity={0.7}
              >
                <IconSymbol name="arrow.counterclockwise" size={18} color="#8B5CF6" />
                <ThemedText style={styles.resetText}>Choose Different Image</ThemedText>
              </TouchableOpacity>
            </>
          )}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* AR View Modal */}
      {arView && selectedImage && (
        <RealisticARViewer
          imageUrl={getCustomizedImageUrl()}
          onClose={() => setArView(false)}
          cssFilter={getCombinedFilter()}
          materialName={selectedMaterial?.name}
          effectName={selectedElement?.name}
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
    paddingBottom: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2D1B69',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#8B5CF6',
    textAlign: 'center',
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 16,
  },
  uploadButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  uploadGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  samplesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sampleCard: {
    width: (Dimensions.get('window').width - 52) / 2,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sampleImageContainer: {
    position: 'relative',
  },
  sampleImage: {
    width: '100%',
    height: 150,
  },
  sampleOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    borderRadius: 20,
    padding: 4,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  arViewButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  arViewGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  arViewText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  customizeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 12,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionsScroll: {
    marginBottom: 20,
  },
  colorOption: {
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#E6E0FF',
  },
  colorCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  materialOption: {
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minWidth: 80,
  },
  materialOptionActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#E6E0FF',
  },
  materialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  elementOption: {
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minWidth: 80,
  },
  elementOptionActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#E6E0FF',
  },
  elementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  optionName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D1B69',
    textAlign: 'center',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    marginTop: 12,
  },
  resetText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8B5CF6',
  },
});
