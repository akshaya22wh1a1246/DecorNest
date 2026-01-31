interface CategoryInfo {
  id: string;
  name: string;
  image: string;
  description: string;
  tags: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'wedding',
    name: 'Wedding Décor',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    description: 'Elegant wedding decorations for your special day',
    tags: ['Mandap', 'Stage', 'Reception', 'Traditional', 'Modern']
  },
  {
    id: 'birthday',
    name: 'Birthday Party',
    image: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d',
    description: 'Colorful and fun birthday celebration setups',
    tags: ['Kids', 'Adult', 'Theme Party', 'Balloon Decor']
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
    description: 'Professional setups for business events',
    tags: ['Conference', 'Product Launch', 'Award Ceremony']
  },
  {
    id: 'festival',
    name: 'Festival Décor',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    description: 'Traditional and modern festival decorations',
    tags: ['Diwali', 'Christmas', 'New Year', 'Navratri']
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176',
    description: 'Sweet and adorable baby shower setups',
    tags: ['Gender Reveal', 'Theme Based', 'Traditional']
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
    description: 'Romantic anniversary celebration designs',
    tags: ['Romantic', 'Dinner Setup', 'Photo Backdrop']
  }
];

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

export interface Vendor {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  description: string;
  location: string;
  specialties: string[];
  images: string[];
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  basePrice: number;
  discount: number;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  vendor: {
    id: string;
    name: string;
    rating: number;
  };
  reviews: Review[];
  features: string[];
  packages: {
    name: string;
    price: number;
    includes: string[];
  }[];
  tags: string[];
  isNewLaunch?: boolean;
  isBestSeller?: boolean;
}

// Sample vendor data
export const VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Dream Decorators',
    rating: 4.8,
    reviewCount: 256,
    description: 'Expert wedding and event decorators with 10+ years experience',
    location: 'Mumbai',
    specialties: ['Wedding', 'Corporate', 'Theme Parties'],
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622'
    ]
  },
  {
    id: 'v2',
    name: 'Festive Designs',
    rating: 4.6,
    reviewCount: 189,
    description: 'Creative festival and celebration decoration specialists',
    location: 'Delhi',
    specialties: ['Festival', 'Birthday', 'Anniversary'],
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
      'https://images.unsplash.com/photo-1515595967223-f9fa59af5a3b'
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Royal Wedding Mandap Package',
    category: 'Wedding Décor',
    price: 149999,
    basePrice: 199999,
    discount: 25,
    description: 'Luxurious wedding mandap setup with premium flowers and lighting',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622'
    ],
    rating: 4.8,
    reviewCount: 124,
    vendor: {
      id: 'v1',
      name: 'Dream Decorators',
      rating: 4.8
    },
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Priya S.',
        rating: 5,
        comment: 'Absolutely stunning setup! Made our wedding day perfect.',
        date: '2025-10-15'
      }
    ],
    features: [
      'Premium flower decoration',
      'LED lighting setup',
      'Backdrop & stage design',
      'Seating arrangement for 200',
      'Professional setup team'
    ],
    packages: [
      {
        name: 'Basic',
        price: 149999,
        includes: ['Mandap setup', 'Basic lighting', 'Flower decoration']
      },
      {
        name: 'Premium',
        price: 249999,
        includes: ['Mandap setup', 'Premium lighting', 'Premium flowers', 'LED screens']
      }
    ],
    tags: ['Wedding', 'Mandap', 'Premium', 'Traditional'],
    isBestSeller: true
  },
  {
    id: 'p2',
    title: 'Birthday Bash Complete Setup',
    category: 'Birthday Party',
    price: 29999,
    basePrice: 39999,
    discount: 25,
    description: 'Colorful birthday decoration package with balloons and theme setup',
    images: [
      'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'
    ],
    rating: 4.6,
    reviewCount: 89,
    vendor: {
      id: 'v2',
      name: 'Festive Designs',
      rating: 4.6
    },
    reviews: [
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Rahul M.',
        rating: 5,
        comment: 'Amazing birthday setup! Kids loved it.',
        date: '2025-10-20'
      }
    ],
    features: [
      'Theme based decoration',
      'Balloon arrangements',
      'Photo booth',
      'Seating for 50',
      'Setup & cleanup'
    ],
    packages: [
      {
        name: 'Basic',
        price: 29999,
        includes: ['Basic theme setup', 'Balloons', 'Basic photo booth']
      },
      {
        name: 'Premium',
        price: 49999,
        includes: ['Premium theme', 'Custom installations', 'Professional photo booth']
      }
    ],
    tags: ['Birthday', 'Kids', 'Theme Party', 'Balloons'],
    isNewLaunch: true
  }
];

// Additional products
MOCK_PRODUCTS.push(
  {
    id: 'p3',
    title: 'Rustic Wedding Setup',
    price: 149999,
    basePrice: 179999,
    discount: 15,
    category: 'Wedding',
    description: 'Beautiful rustic-themed wedding decoration package with vintage furniture, fairy lights, and floral arrangements. Perfect for outdoor ceremonies and barn weddings.',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a',
      'https://images.unsplash.com/photo-1545232979-8bf2b1338e91'
    ],
    rating: 4.8,
    reviewCount: 78,
    vendor: { id: 'v1', name: 'Elite Events', rating: 4.8 },
    reviews: [],
    features: [
      'Complete venue setup',
      'Customizable color scheme',
      'Fairy light canopy',
      'Vintage furniture pieces',
      'Fresh floral arrangements',
      'Setup and teardown included'
    ],
    packages: [
      {
        name: 'Basic',
        price: 149999,
        includes: ['Basic setup', 'Standard lighting', 'Basic floral arrangements']
      },
      {
        name: 'Premium',
        price: 199999,
        includes: ['Full setup', 'Premium lighting', 'Premium flowers', 'Extra features']
      }
    ],
    tags: ['Wedding', 'Rustic', 'Outdoor', 'Vintage']
  },
  {
    id: 'p4',
    title: 'Garden Party Décor',
    price: 89999,
    basePrice: 99999,
    discount: 10,
    category: 'Party',
    description: 'Transform your outdoor space into an enchanting garden party venue with elegant decorations, lighting, and seating arrangements.',
    images: [
      'https://images.unsplash.com/photo-1464366400160-69de5c4a4859',
      'https://images.unsplash.com/photo-1507504031003-b417219a0fde',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d'
    ],
    rating: 4.6,
    reviewCount: 45,
    vendor: { id: 'v2', name: 'Garden Dreams', rating: 4.7 },
    reviews: [],
    features: [
      'Garden furniture setup',
      'String light installation',
      'Table settings',
      'Floral centerpieces',
      'Weather contingency plan',
      'Professional setup team'
    ],
    packages: [
      {
        name: 'Basic',
        price: 89999,
        includes: ['Basic garden setup', 'Standard lighting', 'Basic furniture']
      },
      {
        name: 'Premium',
        price: 129999,
        includes: ['Full setup', 'Premium lighting', 'Luxury furniture', 'Extra features']
      }
    ],
    tags: ['Garden', 'Outdoor', 'Party', 'Elegant']
  },
  {
    id: 'p5',
    title: 'Corporate Event Package',
    price: 249999,
    basePrice: 299999,
    discount: 20,
    category: 'Corporate Events',
    description: 'Professional décor package for corporate events, conferences, and galas. Includes modern furniture, lighting, and branding opportunities.',
    images: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
      'https://images.unsplash.com/photo-1511578314322-379afb476865',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
    ],
    rating: 4.9,
    reviewCount: 156,
    vendor: { id: 'v1', name: 'Dream Decorators', rating: 4.8 },
    reviews: [],
    features: [
      'Professional staging',
      'LED screen setup',
      'Corporate branding integration',
      'Premium furniture',
      'Professional lighting',
      'Audio-visual equipment'
    ],
    packages: [
      {
        name: 'Conference Basic',
        price: 249999,
        includes: ['Stage setup', 'Basic AV', 'Standard furniture']
      },
      {
        name: 'Gala Premium',
        price: 399999,
        includes: ['Full staging', 'Premium AV', 'LED walls', 'Luxury furniture']
      }
    ],
    tags: ['Corporate', 'Professional', 'Business', 'Conference'],
    isNewLaunch: true
  },
  {
    id: 'p6',
    title: 'Bohemian Birthday Setup',
    price: 79999,
    basePrice: 99999,
    discount: 20,
    category: 'Birthday Party',
    description: 'Trendy boho-themed birthday party setup with dream catchers, macramé decorations, and cozy seating areas.',
    images: [
      'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d',
      'https://images.unsplash.com/photo-1515595967223-f9fa59af5a3b',
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e'
    ],
    rating: 4.7,
    reviewCount: 67,
    vendor: { id: 'v2', name: 'Festive Designs', rating: 4.6 },
    reviews: [],
    features: [
      'Boho-themed decorations',
      'Floor cushions and rugs',
      'Macramé backdrops',
      'Ambient lighting',
      'Photo booth area',
      'Desert-style props'
    ],
    packages: [
      {
        name: 'Basic Boho',
        price: 79999,
        includes: ['Basic setup', 'Standard decor', 'Simple photo area']
      },
      {
        name: 'Premium Boho',
        price: 129999,
        includes: ['Full setup', 'Premium decor', 'Professional photo booth']
      }
    ],
    tags: ['Birthday', 'Boho', 'Trendy', 'Photo-worthy'],
    isBestSeller: true
  }
);