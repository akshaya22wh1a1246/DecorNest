import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const ImageARViewer = ({ 
  imageUrl,
  backgroundColor = '#F9FAFB',
  autoRotate = false,
  cameraControls = true,
  ar = true,
  cssFilter = '',
  colorOverlay = null,
  style,
  onError,
  onLoad
}) => {
  // Convert colorOverlay to string or empty string for template literal
  const overlayColor = colorOverlay || '';
  const hasOverlay = overlayColor && overlayColor !== '';
  
  // HTML content that displays image on a 3D plane using model-viewer
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
        <script src="https://unpkg.com/three@0.150.0/build/three.min.js"></script>
        <style>
          body { 
            margin: 0; 
            background-color: ${backgroundColor};
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
          }
          #viewer-container {
            width: 100%;
            height: 100%;
            position: relative;
          }
          canvas {
            width: 100%;
            height: 100%;
            display: block;
            ${cssFilter ? `filter: ${cssFilter};` : ''}
          }
          .controls {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(139, 92, 246, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 13px;
            font-weight: 600;
            z-index: 100;
          }
        </style>
      </head>
      <body>
        <div id="viewer-container">
          <canvas id="canvas"></canvas>
          <div class="controls">Drag to move • Pinch to zoom</div>
        </div>
        
        <script type="module">
          // Three.js scene setup
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('canvas'),
            antialias: true,
            alpha: true 
          });
          
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setClearColor(0x${backgroundColor.replace('#', '')}, 1);
          
          // Add ambient light
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
          scene.add(ambientLight);
          
          // Add directional light
          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
          directionalLight.position.set(5, 5, 5);
          scene.add(directionalLight);
          
          // Load texture
          const textureLoader = new THREE.TextureLoader();
          textureLoader.crossOrigin = 'anonymous';
          
          textureLoader.load(
            '${imageUrl}',
            (texture) => {
              // Calculate aspect ratio
              const aspect = texture.image.width / texture.image.height;
              const planeWidth = aspect > 1 ? 4 : 4 * aspect;
              const planeHeight = aspect > 1 ? 4 / aspect : 4;
              
              // Create plane geometry with the image
              const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
              const material = new THREE.MeshStandardMaterial({ 
                map: texture,
                side: THREE.DoubleSide,
                transparent: false,
                ${hasOverlay ? `color: 0x${overlayColor.replace('#', '')},` : ''}
                ${hasOverlay ? 'emissive: 0x000000,' : ''}
              });
              
              const plane = new THREE.Mesh(geometry, material);
              scene.add(plane);
              
              // Position camera
              camera.position.z = 5;
              
              // Mouse/touch controls for panning (dragging image)
              let isDragging = false;
              let previousMousePosition = { x: 0, y: 0 };
              let position = { x: 0, y: 0 };
              let targetPosition = { x: 0, y: 0 };
              let scale = 1;
              let targetScale = 1;
              let touchDistance = 0;
              
              const canvas = document.getElementById('canvas');
              
              // Mouse events
              canvas.addEventListener('mousedown', (e) => {
                isDragging = true;
                previousMousePosition = { x: e.clientX, y: e.clientY };
              });
              
              canvas.addEventListener('mousemove', (e) => {
                if (isDragging) {
                  const deltaX = e.clientX - previousMousePosition.x;
                  const deltaY = e.clientY - previousMousePosition.y;
                  
                  // Pan the image instead of rotating
                  targetPosition.x += deltaX * 0.01;
                  targetPosition.y -= deltaY * 0.01;
                  
                  previousMousePosition = { x: e.clientX, y: e.clientY };
                }
              });
              
              canvas.addEventListener('mouseup', () => {
                isDragging = false;
              });
              
              // Touch events
              canvas.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                  isDragging = true;
                  previousMousePosition = { 
                    x: e.touches[0].clientX, 
                    y: e.touches[0].clientY 
                  };
                } else if (e.touches.length === 2) {
                  isDragging = false;
                  const dx = e.touches[0].clientX - e.touches[1].clientX;
                  const dy = e.touches[0].clientY - e.touches[1].clientY;
                  touchDistance = Math.sqrt(dx * dx + dy * dy);
                }
              });
              
              canvas.addEventListener('touchmove', (e) => {
                e.preventDefault();
                
                if (e.touches.length === 1 && isDragging) {
                  const deltaX = e.touches[0].clientX - previousMousePosition.x;
                  const deltaY = e.touches[0].clientY - previousMousePosition.y;
                  
                  // Pan the image instead of rotating
                  targetPosition.x += deltaX * 0.01;
                  targetPosition.y -= deltaY * 0.01;
                  
                  previousMousePosition = { 
                    x: e.touches[0].clientX, 
                    y: e.touches[0].clientY 
                  };
                } else if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX;
                  const dy = e.touches[0].clientY - e.touches[1].clientY;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  const delta = distance - touchDistance;
                  targetScale += delta * 0.01;
                  targetScale = Math.max(0.5, Math.min(3, targetScale));
                  
                  touchDistance = distance;
                }
              });
              
              canvas.addEventListener('touchend', () => {
                isDragging = false;
              });
              
              // Mouse wheel zoom
              canvas.addEventListener('wheel', (e) => {
                e.preventDefault();
                targetScale -= e.deltaY * 0.001;
                targetScale = Math.max(0.5, Math.min(3, targetScale));
              });
              
              // Animation loop
              function animate() {
                requestAnimationFrame(animate);
                
                // Smooth panning
                position.x += (targetPosition.x - position.x) * 0.1;
                position.y += (targetPosition.y - position.y) * 0.1;
                plane.position.x = position.x;
                plane.position.y = position.y;
                
                // Smooth scaling
                scale += (targetScale - scale) * 0.1;
                plane.scale.set(scale, scale, scale);
                
                ${autoRotate ? 'plane.rotation.y += 0.005;' : ''}
                
                renderer.render(scene, camera);
              }
              
              animate();
            },
            undefined,
            (error) => {
              console.error('Error loading texture:', error);
            }
          );
          
          // Handle window resize
          window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          });
        </script>
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
        androidLayerType="hardware"
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default ImageARViewer;
