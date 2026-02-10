// Example: How to structure your products with Firebase Storage URLs
// Copy this structure after uploading images to Firebase

// After you upload images and get URLs from Firebase, replace the URLs in products.ts

export const EXAMPLE_PRODUCTS_WITH_FIREBASE = [
  // ========================================
  // BIRTHDAY PRODUCTS
  // ========================================
  {
    id: 'birthday_001',
    title: 'Pastel Balloon Birthday Setup',
    category: 'Birthday',
    subcategory: 'Balloon Decorations',
    price: 2499,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 156,
    organizer: 'Party Perfect',
    
    // Main product image
    image: 'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/balloon-pastel-main.jpg',
    
    // Additional images (gallery)
    images: [
      'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/balloon-pastel-main.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/balloon-pastel-closeup.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/balloon-pastel-setup.jpg',
    ],
    
    description: 'Beautiful pastel balloon arrangement perfect for birthday celebrations...',
    modelUrl: 'YOUR_3D_MODEL_URL.glb', // Optional 3D model
    inStock: true,
  },

  {
    id: 'birthday_002',
    title: 'Superhero Theme Birthday',
    category: 'Birthday',
    subcategory: 'Theme Based',
    price: 3999,
    image: 'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/superhero-theme-main.jpg',
    images: [
      'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/superhero-theme-main.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/superhero-theme-cake-table.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/superhero-theme-backdrop.jpg',
    ],
    // ... rest of product data
  },

  // ========================================
  // WEDDING PRODUCTS
  // ========================================
  
  // Wedding - Mandap
  {
    id: 'wedding_mandap_001',
    title: 'Traditional Red & Gold Mandap',
    category: 'Wedding',
    subcategory: 'Mandap',
    price: 45999,
    image: 'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mandap/traditional-red-gold.jpg',
    images: [
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mandap/traditional-red-gold.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mandap/traditional-red-gold-night.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mandap/traditional-red-gold-details.jpg',
    ],
    // ... rest of product data
  },

  {
    id: 'wedding_mandap_002',
    title: 'Floral White Mandap',
    category: 'Wedding',
    subcategory: 'Mandap',
    price: 52999,
    image: 'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mandap/floral-white-main.jpg',
    images: [
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mandap/floral-white-main.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mandap/floral-white-closeup.jpg',
    ],
    // ... rest of product data
  },

  // Wedding - Mehendi
  {
    id: 'wedding_mehendi_001',
    title: 'Marigold Mehendi Setup',
    category: 'Wedding',
    subcategory: 'Mehendi',
    price: 18999,
    image: 'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mehendi/marigold-setup.jpg',
    images: [
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mehendi/marigold-setup.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mehendi/marigold-seating.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/mehendi/marigold-umbrella.jpg',
    ],
    // ... rest of product data
  },

  // Wedding - Haldi
  {
    id: 'wedding_haldi_001',
    title: 'Yellow & Orange Haldi Decor',
    category: 'Wedding',
    subcategory: 'Haldi',
    price: 15999,
    image: 'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/haldi/yellow-orange-main.jpg',
    images: [
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/haldi/yellow-orange-main.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/haldi/yellow-orange-stage.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/haldi/yellow-orange-seating.jpg',
    ],
    // ... rest of product data
  },

  // Wedding - Reception
  {
    id: 'wedding_reception_001',
    title: 'Grand Reception Stage',
    category: 'Wedding',
    subcategory: 'Reception',
    price: 65999,
    image: 'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/reception/grand-stage-main.jpg',
    images: [
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/reception/grand-stage-main.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/reception/grand-stage-night.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/wedding/reception/grand-stage-closeup.jpg',
    ],
    // ... rest of product data
  },

  // ========================================
  // BABY SHOWER PRODUCTS
  // ========================================
  
  // Baby Shower - Welcome Baby
  {
    id: 'babyshower_welcome_001',
    title: 'Welcome Baby Boy Blue Theme',
    category: 'Baby Shower',
    subcategory: 'Welcome Baby',
    price: 8999,
    image: 'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/welcome-baby/boy-blue-main.jpg',
    images: [
      'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/welcome-baby/boy-blue-main.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/welcome-baby/boy-blue-balloon-arch.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/welcome-baby/boy-blue-cake-table.jpg',
    ],
    // ... rest of product data
  },

  {
    id: 'babyshower_welcome_002',
    title: 'Welcome Baby Girl Pink Theme',
    category: 'Baby Shower',
    subcategory: 'Welcome Baby',
    price: 8999,
    image: 'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/welcome-baby/girl-pink-main.jpg',
    images: [
      'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/welcome-baby/girl-pink-main.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/welcome-baby/girl-pink-decor.jpg',
    ],
    // ... rest of product data
  },

  // Baby Shower - General
  {
    id: 'babyshower_001',
    title: 'Neutral Baby Shower Decor',
    category: 'Baby Shower',
    subcategory: 'Baby Shower',
    price: 7999,
    image: 'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/baby-shower/neutral-theme-main.jpg',
    images: [
      'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/baby-shower/neutral-theme-main.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/baby-shower/neutral-theme-table.jpg',
      'https://storage.googleapis.com/YOUR-BUCKET/products/baby-shower/baby-shower/neutral-theme-backdrop.jpg',
    ],
    // ... rest of product data
  },
];

// ========================================
// FIREBASE STORAGE FOLDER STRUCTURE
// ========================================
/*

Recommended folder structure in Firebase Storage:

products/
├── birthday/
│   ├── balloon-pastel-main.jpg
│   ├── balloon-pastel-closeup.jpg
│   ├── superhero-theme-main.jpg
│   └── superhero-theme-backdrop.jpg
│
├── wedding/
│   ├── mandap/
│   │   ├── traditional-red-gold.jpg
│   │   ├── traditional-red-gold-night.jpg
│   │   ├── floral-white-main.jpg
│   │   └── floral-white-closeup.jpg
│   │
│   ├── mehendi/
│   │   ├── marigold-setup.jpg
│   │   ├── marigold-seating.jpg
│   │   └── marigold-umbrella.jpg
│   │
│   ├── haldi/
│   │   ├── yellow-orange-main.jpg
│   │   ├── yellow-orange-stage.jpg
│   │   └── yellow-orange-seating.jpg
│   │
│   └── reception/
│       ├── grand-stage-main.jpg
│       ├── grand-stage-night.jpg
│       └── grand-stage-closeup.jpg
│
└── baby-shower/
    ├── welcome-baby/
    │   ├── boy-blue-main.jpg
    │   ├── boy-blue-balloon-arch.jpg
    │   ├── girl-pink-main.jpg
    │   └── girl-pink-decor.jpg
    │
    └── baby-shower/
        ├── neutral-theme-main.jpg
        ├── neutral-theme-table.jpg
        └── neutral-theme-backdrop.jpg

*/

// ========================================
// IMAGE NAMING CONVENTIONS (RECOMMENDED)
// ========================================
/*

Use descriptive names that tell you what's in the image:
✅ GOOD:
  - mandap-traditional-red-gold.jpg
  - birthday-balloon-pastel-main.jpg
  - mehendi-marigold-stage-setup.jpg

❌ BAD:
  - IMG_1234.jpg
  - photo1.jpg
  - image (1).jpg

Tips:
- Use hyphens (-) instead of spaces
- Include category/subcategory in name
- Add -main, -closeup, -night, -detail suffixes
- Keep names under 50 characters
- Use lowercase for consistency

*/
