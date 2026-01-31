# AR Decoration Customizer Feature

## Overview
The AR Decoration Customizer is an interactive feature that allows users to upload or select event decoration images and visualize them in 3D/AR view with real-time customization options.

## Location
**Tab:** AR (cube.transparent icon)
**File:** `app/(tabs)/ar-customizer.tsx`

## Key Features

### 1. Image Selection
- **Upload from Gallery**: Users can upload their own decoration images using expo-image-picker
- **Sample Images**: 4 pre-selected decoration images from Unsplash
  - Wedding decorations
  - Party setups
  - Event arrangements
  - Celebration themes

### 2. Real-Time Customization Options

#### Color Themes
Six color palettes to overlay on decorations:
- **Original**: No color overlay
- **Purple Dream**: Purple gradient (#8B5CF6 → #E6E0FF)
- **Rose Gold**: Pink gradient (#FF1E6C → #FFD6E0)
- **Ocean Blue**: Blue gradient (#3B82F6 → #DBEAFE)
- **Golden Glow**: Gold gradient (#F59E0B → #FEF3C7)
- **Emerald**: Green gradient (#10B981 → #D1FAE5)

#### Material Finishes
Five material effects applied via CSS filters:
- **Normal**: No filter
- **Metallic**: `brightness(1.2) contrast(1.1)` - Adds shine and metallic look
- **Matte**: `saturate(0.8) brightness(0.95)` - Reduces saturation for matte finish
- **Glossy**: `brightness(1.3) saturate(1.2)` - Enhances brightness and saturation
- **Vintage**: `sepia(0.3) contrast(0.9)` - Adds vintage/retro effect

#### Visual Effects
Four design effects:
- **None**: No special effects
- **Bokeh**: `blur(1px)` - Soft background blur
- **Glow**: `drop-shadow(0 0 20px rgba(255,255,255,0.8))` - White glow effect
- **Shadow**: `drop-shadow(5px 5px 10px rgba(0,0,0,0.5))` - Depth shadow

### 3. 3D/AR Preview
- **Interactive View**: Uses `ImageARViewer` component with Three.js
- **Controls**:
  - Drag to move image around
  - Pinch to zoom in/out (0.5x to 3x scale)
  - Mouse wheel zoom (desktop)
- **Real-time Updates**: Customizations apply instantly in AR view
- **Active Badges**: Shows which material and effects are currently applied

## Technical Implementation

### Components Used
- `ThemedView` / `ThemedText`: Themed UI components
- `LinearGradient`: Gradient backgrounds and buttons
- `ImageARViewer`: 3D/AR visualization component
- `expo-image-picker`: Image upload functionality
- `IconSymbol`: SF Symbols icons

### CSS Filter Application
Filters are combined and applied to the WebView canvas:
```typescript
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
```

### AR Viewer Props
```typescript
<ImageARViewer
  imageUrl={selectedImage}
  backgroundColor="#F9FAFB"
  autoRotate={false}
  cameraControls={true}
  ar={true}
  cssFilter={getCombinedFilter()}
  style={styles.arViewer}
/>
```

## User Flow

1. **Landing Page**
   - Large gradient header with cube icon
   - "Upload from Gallery" button
   - Sample image grid

2. **After Selection**
   - Preview card with selected image
   - "View in 3D/AR" button
   - Horizontal scroll sections for:
     - Color themes (circular gradients)
     - Material finishes (icon buttons)
     - Visual effects (icon buttons)
   - "Choose Different Image" reset button

3. **AR View Modal**
   - Full-screen 3D viewer
   - Close button (top right)
   - Title: "3D/AR Preview"
   - Active customization badges
   - Interactive controls instructions
   - Drag/pinch/zoom functionality

## Styling Highlights

- **Gradient Theme**: Purple-to-pink gradients (#E6E0FF → #FFD6E0)
- **Accent Color**: Purple (#8B5CF6)
- **Background**: Light gray (#F9FAFB)
- **Active State**: Light purple (#E6E0FF)
- **Elevation/Shadow**: Consistent shadow styling
- **Border Radius**: Rounded corners (12-16px)
- **Icon Sizes**: 18-48px depending on context

## Installation Requirements

```bash
npm install expo-image-picker
```

Already installed in the project.

## Future Enhancements

1. **Save Customizations**: Save customized designs to wishlist
2. **Share Feature**: Export AR preview as image/video
3. **More Effects**: Add more filters and effects
4. **Preset Combinations**: Save favorite customization combos
5. **AR Placement**: True AR placement using camera
6. **Comparison Mode**: Side-by-side comparison of customizations
7. **Animation Effects**: Animated transitions between states
8. **Color Picker**: Custom color selection
9. **Brightness/Contrast Sliders**: Fine-tune adjustments
10. **3D Models**: Upload and customize 3D models instead of just images

## Notes

- Images must be accessible URLs or local URIs
- CSS filters work on WebView canvas
- Three.js loaded from CDN (requires internet)
- Cross-origin images may need CORS configuration
- Performance depends on device capabilities
- Works on both iOS and Android
