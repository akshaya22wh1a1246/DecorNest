// Example: Baby Shower Products Using Local Assets Images
// After copying images to assets/images/baby-shower/welcome-baby/

// STEP 1: Copy your 13 images to:
// assets/images/baby-shower/welcome-baby/
//   - image1.jpg
//   - image2.jpg
//   - ... etc

// STEP 2: Rename your images to something descriptive:
// - welcome-baby-blue-main.jpg
// - welcome-baby-pink-main.jpg
// - welcome-baby-balloons.jpg
// - welcome-baby-cake-table.jpg
// etc...

// STEP 3: Add to your products.ts like this:

export const BABY_SHOWER_PRODUCTS = [
  {
    id: 'baby_001',
    title: 'Welcome Baby Boy - Blue Theme',
    price: 8999,
    originalPrice: 12999,
    rating: 4.8,
    reviews: 145,
    organizer: 'Sweet Celebrations',
    discount: 31,
    category: 'Baby Shower',
    subcategory: 'Welcome Baby',
    
    // For LOCAL images from assets folder, use require():
    image: require('../assets/images/baby-shower/welcome-baby/welcome-baby-blue-main.jpg'),
    
    images: [
      require('../assets/images/baby-shower/welcome-baby/welcome-baby-blue-main.jpg'),
      require('../assets/images/baby-shower/welcome-baby/welcome-baby-blue-balloons.jpg'),
      require('../assets/images/baby-shower/welcome-baby/welcome-baby-blue-closeup.jpg'),
    ],
    
    description: 'Beautiful welcome baby boy decoration with blue theme. Perfect setup for celebrating your newborn arrival with family and friends.',
    
    features: [
      'Blue and white balloon arch',
      'Welcome Baby Boy banner',
      'Themed photo backdrop',
      'Cake table decoration',
      'Professional setup included',
    ],
    
    vendor: {
      id: 'v3',
      name: 'Sweet Celebrations',
      rating: 4.8,
      totalOrders: 280,
    },
    
    inStock: true,
  },
  
  {
    id: 'baby_002',
    title: 'Welcome Baby Girl - Pink Theme',
    price: 8999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 198,
    organizer: 'Sweet Celebrations',
    discount: 31,
    category: 'Baby Shower',
    subcategory: 'Welcome Baby',
    
    image: require('../assets/images/baby-shower/welcome-baby/welcome-baby-pink-main.jpg'),
    
    images: [
      require('../assets/images/baby-shower/welcome-baby/welcome-baby-pink-main.jpg'),
      require('../assets/images/baby-shower/welcome-baby/welcome-baby-pink-balloons.jpg'),
      require('../assets/images/baby-shower/welcome-baby/welcome-baby-pink-decor.jpg'),
    ],
    
    description: 'Adorable welcome baby girl setup with pink theme decorations. Creates magical atmosphere for your baby shower celebration.',
    
    features: [
      'Pink and gold balloon decorations',
      'Welcome Baby Girl signage',
      'Floral centerpieces',
      'Dessert table setup',
      'Professional setup included',
    ],
    
    vendor: {
      id: 'v3',
      name: 'Sweet Celebrations',
      rating: 4.9,
      totalOrders: 320,
    },
    
    inStock: true,
  },
  
  {
    id: 'baby_003',
    title: 'Neutral Welcome Baby Setup',
    price: 7999,
    originalPrice: 10999,
    rating: 4.7,
    reviews: 132,
    organizer: 'Sweet Celebrations',
    discount: 27,
    category: 'Baby Shower',
    subcategory: 'Welcome Baby',
    
    image: require('../assets/images/baby-shower/welcome-baby/welcome-baby-neutral-main.jpg'),
    
    images: [
      require('../assets/images/baby-shower/welcome-baby/welcome-baby-neutral-main.jpg'),
      require('../assets/images/baby-shower/welcome-baby/welcome-baby-neutral-balloons.jpg'),
      require('../assets/images/baby-shower/welcome-baby/welcome-baby-neutral-table.jpg'),
    ],
    
    description: 'Gender-neutral welcome baby decoration in mint, yellow and white. Perfect when keeping baby gender a surprise!',
    
    features: [
      'Neutral color palette (mint, yellow, white)',
      'Welcome Baby banner',
      'Balloon garland',
      'Table centerpieces',
      'Professional setup included',
    ],
    
    vendor: {
      id: 'v3',
      name: 'Sweet Celebrations',
      rating: 4.7,
      totalOrders: 210,
    },
    
    inStock: true,
  },
];

// ========================================
// HOW TO USE IN YOUR APP
// ========================================

// In your ProductDetailsScreen or ProductCard component:
// The Image component automatically handles require() images

import { Image } from 'react-native';

// Then use normally:
<Image 
  source={product.image}  // Works with require() 
  style={{ width: 300, height: 200 }}
/>

// For expo-image:
import { Image } from 'expo-image';

<Image 
  source={product.image}  // Works with require()
  style={{ width: 300, height: 200 }}
  contentFit="cover"
/>

// ========================================
// IMPORTANT NOTES
// ========================================

/*
1. Image naming convention (choose descriptive names):
   ✅ GOOD: welcome-baby-blue-main.jpg
   ✅ GOOD: welcome-baby-pink-balloons.jpg
   ❌ BAD: IMG_1234.jpg
   ❌ BAD: photo.jpg

2. Keep images optimized:
   - Max width: 1200px
   - Compress before adding (use tinypng.com)
   - Format: JPG (smaller) or PNG (if transparency needed)
   - Target size: Under 300KB per image

3. Assets folder pros/cons:
   ✅ Works immediately, no internet needed
   ✅ No external service setup required
   ✅ Images are bundled with app
   ❌ Increases app download size
   ❌ Can't update images without app update
   
4. When to move to cloud storage:
   - When you have 50+ images
   - When app size becomes too large (>50MB)
   - When you need to update images frequently
   - When you want better performance

5. File structure in assets folder:
   assets/
     images/
       baby-shower/
         welcome-baby/
           welcome-baby-blue-main.jpg
           welcome-baby-blue-balloons.jpg
           welcome-baby-pink-main.jpg
           (etc...)
       birthday/
         (birthday images)
       wedding/
         mandap/
           (mandap images)
         mehendi/
           (mehendi images)
*/
