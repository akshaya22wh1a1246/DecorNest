import { StyleProp, ViewStyle } from 'react-native';

export interface ImageARViewerProps {
  imageUrl: string;
  backgroundColor?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  ar?: boolean;
  cssFilter?: string;
  colorOverlay?: string | null | undefined;
  style?: StyleProp<ViewStyle>;
  onError?: (error: any) => void;
  onLoad?: () => void;
}

declare const ImageARViewer: React.FC<ImageARViewerProps>;
export default ImageARViewer;
