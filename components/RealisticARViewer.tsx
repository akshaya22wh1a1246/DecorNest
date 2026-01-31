import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface RealisticARViewerProps {
  imageUrl: string;
  onClose: () => void;
  cssFilter?: string;
  materialName?: string;
  effectName?: string;
}

export default function RealisticARViewer({
  imageUrl,
  onClose,
  cssFilter = '',
  materialName,
  effectName,
}: RealisticARViewerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [decorScale, setDecorScale] = useState(1);
  const [decorPosition, setDecorPosition] = useState({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Request camera permission if not granted
  React.useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#E6E0FF', '#FFD6E0']}
          style={styles.permissionContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <IconSymbol name="camera.fill" size={64} color="#8B5CF6" />
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionText}>
            To experience realistic AR decoration preview, we need access to your camera
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <LinearGradient
              colors={['#8B5CF6', '#FF1E6C']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.permissionButtonText}>Grant Camera Access</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Maybe Later</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  const handleTouchStart = (e: any) => {
    const touch = e.nativeEvent.touches[0];
    dragStart.current = {
      x: touch.pageX - decorPosition.x,
      y: touch.pageY - decorPosition.y,
    };
    setIsDragging(true);
  };

  const handleTouchMove = (e: any) => {
    if (!isDragging) return;
    const touch = e.nativeEvent.touches[0];
    setDecorPosition({
      x: touch.pageX - dragStart.current.x,
      y: touch.pageY - dragStart.current.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setDecorScale((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setDecorScale((prev) => Math.max(prev - 0.2, 0.3));
  };

  const handleReset = () => {
    setDecorScale(1);
    setDecorPosition({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 });
  };

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <CameraView style={styles.camera} facing="back">
        {/* Decoration Overlay */}
        <View
          style={styles.decorContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <View
            style={[
              styles.decorWrapper,
              {
                transform: [
                  { translateX: decorPosition.x - SCREEN_WIDTH / 2 },
                  { translateY: decorPosition.y - SCREEN_HEIGHT / 2 },
                  { scale: decorScale },
                ],
              },
            ]}
          >
            <Image
              source={{ uri: imageUrl }}
              style={styles.decorImage}
              resizeMode="contain"
            />
            {/* Bounding box to show it's AR */}
            <View style={styles.arBoundingBox}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
        </View>

        {/* Top Header */}
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          style={styles.topGradient}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSymbol name="xmark.circle.fill" size={32} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>AR Preview</Text>
              {(materialName || effectName) && (
                <View style={styles.headerBadges}>
                  {materialName && materialName !== 'Normal' && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{materialName}</Text>
                    </View>
                  )}
                  {effectName && effectName !== 'None' && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{effectName}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
            <View style={{ width: 32 }} />
          </View>
        </LinearGradient>

        {/* Bottom Controls */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.bottomGradient}
        >
          <View style={styles.controls}>
            <Text style={styles.instructionText}>
              Drag decoration to position • Use +/- to resize
            </Text>
            
            <View style={styles.controlButtons}>
              {/* Zoom Out */}
              <TouchableOpacity onPress={handleZoomOut} style={styles.controlButton}>
                <IconSymbol name="minus.circle.fill" size={48} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Reset */}
              <TouchableOpacity onPress={handleReset} style={styles.resetControlButton}>
                <LinearGradient
                  colors={['#8B5CF6', '#FF1E6C']}
                  style={styles.resetButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <IconSymbol name="arrow.counterclockwise" size={24} color="#FFFFFF" />
                  <Text style={styles.resetButtonText}>Reset</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Zoom In */}
              <TouchableOpacity onPress={handleZoomIn} style={styles.controlButton}>
                <IconSymbol name="plus.circle.fill" size={48} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.scaleIndicator}>
              <Text style={styles.scaleText}>Scale: {Math.round(decorScale * 100)}%</Text>
            </View>
          </View>
        </LinearGradient>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D1B69',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#8B5CF6',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
  },
  decorContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  decorWrapper: {
    position: 'absolute',
    width: 300,
    height: 300,
    left: SCREEN_WIDTH / 2 - 150,
    top: SCREEN_HEIGHT / 2 - 150,
  },
  decorImage: {
    width: '100%',
    height: '100%',
  },
  arBoundingBox: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.5)',
    borderStyle: 'dashed',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#8B5CF6',
    borderWidth: 3,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  closeButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerBadges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: 'center',
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginBottom: 12,
  },
  controlButton: {
    padding: 8,
  },
  resetControlButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  resetButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  scaleIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  scaleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
