import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const ModelViewerWebView = ({ 
  modelUrl, 
  poster,
  backgroundColor = '#ffffff',
  autoRotate = true,
  cameraControls = true,
  ar = true,
  style,
  onError,
  onLoad
}) => {
  // HTML content with model-viewer element
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
        <style>
          body { margin: 0; }
          model-viewer {
            width: 100%;
            height: 100vh;
            background-color: ${backgroundColor};
          }
        </style>
      </head>
      <body>
        <model-viewer
          src="${modelUrl}"
          ${poster ? `poster="${poster}"` : ''}
          ${autoRotate ? 'auto-rotate' : ''}
          ${cameraControls ? 'camera-controls' : ''}
          ${ar ? 'ar ar-modes="webxr scene-viewer quick-look"' : ''}
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral">
        </model-viewer>
      </body>
    </html>
  `;

  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ html: htmlContent }}
        onError={onError}
        onLoad={onLoad}
        style={styles.webview}
        // Enable required permissions for AR
        androidLayerType="hardware"
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});

export default ModelViewerWebView;

/* Example usage:
import ModelViewerWebView from '../components/ModelViewerWebView';

<ModelViewerWebView
  modelUrl="https://your-storage.com/model.glb"
  poster="https://your-storage.com/poster.jpg"
  backgroundColor="#f0f0f0"
  autoRotate={true}
  style={{ height: 300 }}
  onError={(error) => console.error('Model viewer error:', error)}
  onLoad={() => console.log('Model loaded')}
/>
*/