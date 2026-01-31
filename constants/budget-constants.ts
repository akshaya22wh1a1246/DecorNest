export const EVENT_TYPES = [
  'Birthday',
  'Wedding',
  'Baby Shower',
  'Corporate Event',
  'Anniversary',
  'Engagement',
  'House Warming',
  'Festival Celebration',
];

export const DECORATION_STYLES = [
  'Floral',
  'Rustic',
  'Modern',
  'Royal',
  'Minimalist',
  'Traditional',
  'Bohemian',
  'Vintage',
];

export const VENUE_SIZES = [
  { label: 'Small (up to 50 guests)', value: 'small' },
  { label: 'Medium (51-150 guests)', value: 'medium' },
  { label: 'Large (151+ guests)', value: 'large' },
];

export const SERVICES = [
  {
    id: 'lighting',
    title: 'Lighting Setup',
    basePrice: 2000,
    icon: 'lightbulb',
    description: 'Professional lighting arrangement including spotlights and ambient lighting',
  },
  {
    id: 'balloons',
    title: 'Balloon Decoration',
    basePrice: 1000,
    icon: 'party.popper',
    description: 'Themed balloon arrangements and arches',
  },
  {
    id: 'stage',
    title: 'Stage Setup',
    basePrice: 5000,
    icon: 'sparkles',
    description: 'Decorated stage with backdrop and side arrangements',
  },
  {
    id: 'catering',
    title: 'Catering Service',
    basePrice: 500, // per guest
    icon: 'fork.knife',
    description: 'Full catering service including setup and staff',
  },
  {
    id: 'photography',
    title: 'Photography',
    basePrice: 8000,
    icon: 'camera',
    description: 'Professional event photography with edited photos',
  },
];

// Cost multipliers based on event type
export const EVENT_TYPE_MULTIPLIERS = {
  'Birthday': 1,
  'Wedding': 1.5,
  'Baby Shower': 0.8,
  'Corporate Event': 1.3,
  'Anniversary': 1.2,
  'Engagement': 1.3,
  'House Warming': 0.9,
  'Festival Celebration': 1.1,
};

// Cost multipliers based on decoration style
export const STYLE_MULTIPLIERS = {
  'Floral': 1.3,
  'Rustic': 1.1,
  'Modern': 1.2,
  'Royal': 1.5,
  'Minimalist': 0.9,
  'Traditional': 1.0,
  'Bohemian': 1.2,
  'Vintage': 1.3,
};

// Cost multipliers based on venue size
export const VENUE_SIZE_MULTIPLIERS = {
  'small': 1,
  'medium': 1.3,
  'large': 1.6,
};

// Labor cost calculation (percentage of material cost)
export const LABOR_COST_PERCENTAGE = 0.1; // 10% of material cost

// AI suggestions based on selections
export const AI_SUGGESTIONS = {
  general: [
    '💡 Choosing eco-friendly materials could save up to ₹1500',
    '💡 Booking during off-season can reduce costs by 15-20%',
    '💡 DIY centerpieces can save approximately ₹3000',
  ],
  eventType: {
    'Wedding': '💡 Consider splitting decoration between ceremony and reception to optimize budget',
    'Birthday': '💡 Focusing on a photo wall instead of full venue decoration can save costs',
    'Corporate Event': '💡 Digital backdrops can reduce physical decoration costs significantly',
  },
  budget: {
    high: '💡 Consider premium flower varieties and designer props for a luxury feel',
    medium: '💡 Mix artificial and real flowers to balance cost and aesthetics',
    low: '💡 Focus on key areas like entrance and stage for maximum impact',
  },
};