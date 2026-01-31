import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/context/app-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Modal,
    Platform,
    Image as RNImage,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface CustomizationOptions {
  eventType: string;
  colorScheme: string;
  style: string;
  budget: string;
  specialRequests: string;
}

export default function AIDesignerScreen() {
  const router = useRouter();
  const { toggleWishlist } = useApp();
  
  const [options, setOptions] = useState<CustomizationOptions>({
    eventType: '',
    colorScheme: '',
    style: '',
    budget: '',
    specialRequests: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [imageKey, setImageKey] = useState(0); // Force image reload
  const [imageLoading, setImageLoading] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(false); // Full screen modal state

  const eventTypes = [
    { id: 'wedding', name: 'Wedding', emoji: '💒', color: '#FFD6E0' },
    { id: 'birthday', name: 'Birthday', emoji: '🎂', color: '#FEF3C7' },
    { id: 'corporate', name: 'Corporate', emoji: '🏢', color: '#E6E0FF' },
    { id: 'baby-shower', name: 'Baby Shower', emoji: '👶', color: '#DBEAFE' },
    { id: 'anniversary', name: 'Anniversary', emoji: '💕', color: '#FCE7F3' },
    { id: 'festive', name: 'Festive', emoji: '✨', color: '#FEF3C7' },
  ];

  const decorStyles = [
    { id: 'elegant', name: 'Elegant', icon: 'sparkles' },
    { id: 'modern', name: 'Modern', icon: 'square.stack.3d.up' },
    { id: 'traditional', name: 'Traditional', icon: 'building.columns' },
    { id: 'minimalist', name: 'Minimalist', icon: 'circle' },
    { id: 'luxury', name: 'Luxury', icon: 'crown.fill' },
    { id: 'rustic', name: 'Rustic', icon: 'leaf.fill' },
  ];

  const handleGenerate = async () => {
    if (!selectedEventType || !options.colorScheme) {
      const message = 'Please select an event type and enter a color scheme';
      if (Platform.OS === 'web') {
        window.alert(message);
      } else {
        Alert.alert('Missing Information', message);
      }
      return;
    }

    setIsGenerating(true);
    
    try {
      // Build comprehensive AI prompt from ALL user inputs
      const prompt = buildPrompt();
      setGeneratedPrompt(prompt);
      
      console.log('Generated AI Prompt:', prompt); // Debug log
      
      // Use Pollinations.ai - free AI image generation API
      // HD quality: 1920x1440 (4K resolution for crystal clear images)
      // Add random variation for different results on regenerate
      const timestamp = Date.now();
      const randomSeed = Math.floor(Math.random() * 10000000); // Larger range for more variation
      
      // Add random variation keywords to ensure different outputs
      const variations = [
        'unique perspective',
        'different angle',
        'alternative arrangement',
        'fresh design approach',
        'new creative vision',
        'innovative layout',
        'distinctive setup',
        'original composition'
      ];
      const randomVariation = variations[Math.floor(Math.random() * variations.length)];
      const enhancedPrompt = `${prompt}, ${randomVariation}`;
      
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=1920&height=1440&nologo=true&enhance=true&model=flux&seed=${timestamp}-${randomSeed}&nofeed=true`;
      
      console.log('HD Image URL:', imageUrl); // Debug log
      console.log('Random Seed:', randomSeed); // Debug log
      console.log('Variation:', randomVariation); // Debug log
      console.log('Setting generated image...'); // Debug log
      
      // Set image immediately
      setGeneratedImage(imageUrl);
      setImageKey(prev => prev + 1); // Force image reload
      
      // Wait for image generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsGenerating(false);
      
      console.log('Image should be visible now'); // Debug log
      
      const successMessage = 'AI decoration design generated based on your inputs!';
      if (Platform.OS === 'web') {
        window.alert(successMessage);
      } else {
        Alert.alert('Success', successMessage);
      }
    } catch (error) {
      setIsGenerating(false);
      const errorMessage = 'Failed to generate design. Please try again.';
      if (Platform.OS === 'web') {
        window.alert(errorMessage);
      } else {
        Alert.alert('Error', errorMessage);
      }
      console.error('AI Generation Error:', error);
    }
  };

  const buildPrompt = (): string => {
    // Build comprehensive prompt from ALL user inputs
    let prompt = '';
    
    // Start with event type - be very specific
    if (options.eventType) {
      prompt += `Professional ${options.eventType.toLowerCase()} event decoration stage setup`;
    } else {
      prompt += 'Professional event decoration stage setup';
    }
    
    // Add style - make it prominent
    if (options.style) {
      prompt += ` in ${options.style.toLowerCase()} style`;
    }
    
    // Add color scheme - very important for visuals
    if (options.colorScheme) {
      prompt += `, with ${options.colorScheme.toLowerCase()} color palette`;
    }
    
    // Add budget context if provided
    if (options.budget) {
      const budgetNum = parseInt(options.budget.replace(/[^0-9]/g, ''));
      if (budgetNum > 50000) {
        prompt += ', luxurious premium setup';
      } else if (budgetNum > 20000) {
        prompt += ', elegant mid-range setup';
      } else {
        prompt += ', beautiful budget-friendly setup';
      }
    }
    
    // Add special requests - user's custom requirements
    if (options.specialRequests && options.specialRequests.trim()) {
      prompt += `, featuring ${options.specialRequests.toLowerCase()}`;
    }
    
    // Add detailed decoration elements for better AI generation
    prompt += ', beautiful decorated stage backdrop';
    prompt += ', professional floral arrangements';
    prompt += ', elegant centerpieces';
    prompt += ', ambient lighting setup';
    prompt += ', draping and fabric decorations';
    prompt += ', coordinated color theme throughout';
    
    // Add photography style for realistic results
    prompt += ', high-quality professional event photography';
    prompt += ', wide angle view of decorated stage';
    prompt += ', realistic lighting and shadows';
    prompt += ', detailed and photorealistic';
    prompt += ', 4K quality';
    
    return prompt;
  };

  const handleSaveDesign = () => {
    if (!generatedImage) return;
    
    // Create AI design object with all details
    const aiDesign = {
      id: `ai-design-${Date.now()}`,
      title: `AI ${selectedEventType || 'Custom'} Decoration`,
      image: generatedImage,
      eventType: selectedEventType,
      style: selectedStyle,
      colorScheme: options.colorScheme,
      budget: options.budget,
      specialRequests: options.specialRequests,
      prompt: generatedPrompt,
      category: 'AI Generated',
      isAIGenerated: true,
      createdAt: new Date().toISOString(),
    };
    
    // Save AI design to localStorage for web or AsyncStorage for mobile
    if (Platform.OS === 'web') {
      try {
        const existingDesigns = JSON.parse(localStorage.getItem('aiDesigns') || '[]');
        existingDesigns.push(aiDesign);
        localStorage.setItem('aiDesigns', JSON.stringify(existingDesigns));
      } catch (error) {
        console.error('Error saving AI design:', error);
      }
    }
    
    // Add to wishlist using the design ID
    toggleWishlist(aiDesign.id);
    
    const message = 'AI Design saved to your wishlist with all details!';
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert('Saved', message, [
        {
          text: 'View Wishlist',
          onPress: () => router.push('/(tabs)/wishlist'),
        },
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
    
    // Navigate to wishlist on web after alert
    if (Platform.OS === 'web') {
      setTimeout(() => {
        router.push('/(tabs)/wishlist');
      }, 500);
    }
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
              <IconSymbol name="wand.and.stars" size={48} color="#8B5CF6" />
            </View>
            <ThemedText style={styles.headerTitle}>AI Decoration Designer</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Customize your dream décor with AI
            </ThemedText>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Event Type Selection */}
          <ThemedText style={styles.sectionTitle}>Select Event Type</ThemedText>
          <View style={styles.eventTypeGrid}>
            {eventTypes.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={[
                  styles.eventTypeCard,
                  selectedEventType === event.id && styles.eventTypeCardActive,
                ]}
                onPress={() => {
                  setSelectedEventType(event.id);
                  setOptions({ ...options, eventType: event.name });
                }}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.eventTypeIconCircle,
                    { backgroundColor: event.color },
                    selectedEventType === event.id && styles.eventTypeIconCircleActive,
                  ]}
                >
                  <ThemedText style={styles.eventTypeEmoji}>{event.emoji}</ThemedText>
                </View>
                <ThemedText
                  style={[
                    styles.eventTypeName,
                    selectedEventType === event.id && styles.eventTypeNameActive,
                  ]}
                >
                  {event.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Style Selection */}
          <ThemedText style={[styles.sectionTitle, { marginTop: 24 }]}>
            Choose Style
          </ThemedText>
          <View style={styles.styleGrid}>
            {decorStyles.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  styles.styleChip,
                  selectedStyle === style.id && styles.styleChipActive,
                ]}
                onPress={() => {
                  setSelectedStyle(style.id);
                  setOptions({ ...options, style: style.name });
                }}
                activeOpacity={0.7}
              >
                <IconSymbol
                  name={style.icon as any}
                  size={18}
                  color={selectedStyle === style.id ? '#FFFFFF' : '#8B5CF6'}
                />
                <ThemedText
                  style={[
                    styles.styleChipText,
                    selectedStyle === style.id && styles.styleChipTextActive,
                  ]}
                >
                  {style.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Color Scheme Input */}
          <ThemedText style={[styles.sectionTitle, { marginTop: 24 }]}>
            Color Scheme
          </ThemedText>
          <View style={styles.inputCard}>
            <View style={styles.inputIconCircle}>
              <IconSymbol name="paintpalette.fill" size={20} color="#F59E0B" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="e.g., Rose Gold & Ivory, Pastel Pink..."
              placeholderTextColor="#999"
              value={options.colorScheme}
              onChangeText={(text) => setOptions({ ...options, colorScheme: text })}
            />
          </View>

          {/* Budget Input */}
          <ThemedText style={[styles.sectionTitle, { marginTop: 24 }]}>
            Budget Range (Optional)
          </ThemedText>
          <View style={styles.inputCard}>
            <View style={styles.inputIconCircle}>
              <IconSymbol name="indianrupeesign.circle.fill" size={20} color="#10B981" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="e.g., 10,000 - 50,000"
              placeholderTextColor="#999"
              value={options.budget}
              onChangeText={(text) => setOptions({ ...options, budget: text })}
              keyboardType="numeric"
            />
          </View>

          {/* Special Requests */}
          <ThemedText style={[styles.sectionTitle, { marginTop: 24 }]}>
            Special Requests (Optional)
          </ThemedText>
          <View style={[styles.inputCard, styles.textAreaCard]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe any specific elements, themes, or preferences..."
              placeholderTextColor="#999"
              value={options.specialRequests}
              onChangeText={(text) => setOptions({ ...options, specialRequests: text })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={styles.generateButtonWrapper}
            onPress={handleGenerate}
            activeOpacity={0.8}
            disabled={isGenerating}
          >
            <LinearGradient
              colors={['#8B5CF6', '#C4A1FF']}
              style={styles.generateButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {isGenerating ? (
                <>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                  <ThemedText style={styles.generateButtonText}>
                    Generating Design...
                  </ThemedText>
                </>
              ) : (
                <>
                  <IconSymbol name="wand.and.stars.inverse" size={20} color="#FFFFFF" />
                  <ThemedText style={styles.generateButtonText}>
                    Generate AI Design
                  </ThemedText>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Generated Image Preview */}
          {generatedImage && (
            <View style={styles.previewSection}>
              <ThemedText style={styles.previewTitle}>Your AI-Generated Design</ThemedText>
              
              {/* Show AI Prompt Used */}
              {generatedPrompt && (
                <View style={styles.promptCard}>
                  <View style={styles.promptHeader}>
                    <IconSymbol name="sparkles" size={16} color="#8B5CF6" />
                    <ThemedText style={styles.promptHeaderText}>AI Prompt Used:</ThemedText>
                  </View>
                  <ThemedText style={styles.promptText}>{generatedPrompt}</ThemedText>
                  
                  {/* Debug URL Display */}
                  <View style={styles.promptHeader}>
                    <IconSymbol name="link" size={16} color="#8B5CF6" />
                    <ThemedText style={styles.promptHeaderText}>Image URL:</ThemedText>
                  </View>
                  <ThemedText style={styles.promptText} selectable>{generatedImage}</ThemedText>
                </View>
              )}
              
              <TouchableOpacity 
                style={styles.previewCard}
                onPress={() => setFullScreenImage(true)}
                activeOpacity={0.9}
              >
                {imageLoading && (
                  <View style={styles.imageLoadingContainer}>
                    <ActivityIndicator size="large" color="#8B5CF6" />
                    <ThemedText style={styles.imageLoadingText}>Loading image...</ThemedText>
                  </View>
                )}
                <RNImage
                  key={imageKey}
                  source={{ uri: generatedImage }}
                  style={styles.previewImage}
                  resizeMode="cover"
                  onLoadStart={() => setImageLoading(true)}
                  onLoad={() => setImageLoading(false)}
                  onError={(error) => {
                    console.error('Image load error:', error);
                    setImageLoading(false);
                  }}
                />
                <View style={styles.tapToViewOverlay}>
                  <View style={styles.tapToViewBadge}>
                    <IconSymbol name="eye" size={20} color="#FFFFFF" />
                    <ThemedText style={styles.tapToViewText}>Tap to view full size</ThemedText>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.previewOverlay}>
                <TouchableOpacity
                  style={styles.previewActionBtn}
                  onPress={handleSaveDesign}
                  activeOpacity={0.8}
                >
                    <LinearGradient
                      colors={['#E6E0FF', '#FFD6E0']}
                      style={styles.previewActionBtnGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <IconSymbol name="heart.fill" size={18} color="#FF1E6C" />
                      <ThemedText style={styles.previewActionBtnText}>
                        Save to Wishlist
                      </ThemedText>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.previewActionBtn}
                    onPress={handleGenerate}
                    activeOpacity={0.8}
                  >
                    <View style={styles.previewActionBtnOutline}>
                      <IconSymbol name="arrow.clockwise" size={18} color="#8B5CF6" />
                      <ThemedText style={styles.previewActionBtnOutlineText}>
                        Regenerate
                      </ThemedText>
                    </View>
                  </TouchableOpacity>
                </View>
            </View>
          )}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Full Screen Image Modal */}
      <Modal
        visible={fullScreenImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFullScreenImage(false)}
      >
        <View style={styles.fullScreenModal}>
          <TouchableOpacity 
            style={styles.fullScreenBackdrop}
            activeOpacity={1}
            onPress={() => setFullScreenImage(false)}
          >
            <View style={styles.fullScreenHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setFullScreenImage(false)}
                activeOpacity={0.7}
              >
                <IconSymbol name="xmark.circle.fill" size={36} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.fullScreenImageContainer}>
              <RNImage
                source={{ uri: generatedImage || '' }}
                style={styles.fullScreenImage}
                resizeMode="contain"
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
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 16,
  },
  eventTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  eventTypeCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E6E0FF',
  },
  eventTypeCardActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F5F3FF',
  },
  eventTypeIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  eventTypeIconCircleActive: {
    transform: [{ scale: 1.1 }],
  },
  eventTypeEmoji: {
    fontSize: 28,
  },
  eventTypeName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  eventTypeNameActive: {
    color: '#8B5CF6',
    fontWeight: '700',
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  styleChipActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  styleChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  styleChipTextActive: {
    color: '#FFFFFF',
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6E0FF',
    gap: 12,
  },
  textAreaCard: {
    alignItems: 'flex-start',
  },
  inputIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2D1B69',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  generateButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 32,
    elevation: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  previewSection: {
    marginTop: 32,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B69',
    marginBottom: 16,
  },
  promptCard: {
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E0FF',
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  promptHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  promptText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  previewCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  previewImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#F0F0F0',
  },
  imageLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    zIndex: 10,
  },
  imageLoadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  previewOverlay: {
    padding: 16,
    gap: 12,
  },
  previewActionBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewActionBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  previewActionBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D1B69',
  },
  previewActionBtnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 12,
  },
  previewActionBtnOutlineText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  tapToViewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: 'center',
  },
  tapToViewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(45, 27, 105, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  tapToViewText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
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
