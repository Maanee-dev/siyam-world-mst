import { PackageItem, VillaItem, DiningItem } from './types.ts';

export const COLORS = {
  earth: '#5D4037',  // Soft Dark Brown
  sand: '#E0C9A6',   // Soft Sand
  bone: '#FDFBF7',   // Creamy White
  mist: '#E1F5FE',   // Serene Light Blue
  ocean: '#007791',  // Muted Ocean Blue
};

export const RESORT_STATS = {
  size: '54 Hectares',
  villas: '16 Categories',
  dining: '18 Venues',
  transfer: '40-min Seaplane',
  location: 'Dhigurah Noonu Atoll'
};

export const VILLAS: VillaItem[] = [
  // BEACH VILLAS (ON THE BEACH)
  {
    id: 'pool-beach-villa',
    title: 'Pool Beach Villa',
    category: 'Beach',
    size: '190m²',
    features: ['Private Pool', 'Outdoor Shower', '1 Bedroom'],
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sunset-pool-beach-villa',
    title: 'Sunset Pool Beach Villa',
    category: 'Beach',
    size: '250m²',
    features: ['Sunset View', 'Private Pool', '1 Bedroom'],
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'beach-suite-pool',
    title: 'Beach Suite with Pool',
    category: 'Beach',
    size: '280m²',
    features: ['Spacious Living', 'Private Pool', '1 Bedroom'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'two-bedroom-pool-beach',
    title: 'Two Bedroom Pool Beach Villa',
    category: 'Beach',
    size: '570m²',
    features: ['Family Sized', 'Private Pool', '2 Bedrooms'],
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'three-bedroom-pool-beach',
    title: 'Three Bedroom Pool Beach Villa',
    category: 'Beach',
    size: '645m²',
    features: ['Large Group', 'Private Pool', '3 Bedrooms'],
    image: 'https://images.unsplash.com/photo-1592317540212-c0d1f658f6e5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'two-storey-pool-beach-residence',
    title: 'Two Storey Pool Beach Residence',
    category: 'Beach',
    size: '510m²',
    features: ['Sunset View', 'Two Storey', '1 Bedroom'],
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'grand-beach-residence-pool',
    title: 'Grand Beach Residence with Pool',
    category: 'Beach',
    size: '850m²',
    features: ['Butler Service', 'Sunset View', '1 Bedroom'],
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'two-bedroom-beach-residence',
    title: 'Two Bedroom Beach Residence with Pool',
    category: 'Beach',
    size: '1500m²',
    features: ['Massive Estate', 'Kitchenette', '2 Bedrooms'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'four-bedroom-beach-residence',
    title: 'Four Bedroom Beach Residence with Pool',
    category: 'Beach',
    size: '1600m²',
    features: ['Ultimate Luxury', 'Private MOKE', '4 Bedrooms'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800'
  },

  // WATER VILLAS (OVER WATER)
  {
    id: 'water-villa-slide',
    title: 'Water Villa with Pool + Slide',
    category: 'Water',
    size: '89m²',
    features: ['Private Slide', 'Infinity Pool', '1 Bedroom'],
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'lagoon-villa-slide',
    title: 'Lagoon Villa with Pool + Slide',
    category: 'Water',
    size: '98m²',
    features: ['Sunset View', 'Slide', '1 Bedroom'],
    image: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ocean-villa-slide',
    title: 'Ocean Villa with Pool + Slide',
    category: 'Water',
    size: '98m²',
    features: ['Reef Access', 'Slide', '1 Bedroom'],
    image: 'https://images.unsplash.com/photo-1506929113675-80af24d3962b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'water-pavilion-slide',
    title: 'Water Pavilion with Pool + Slide',
    category: 'Water',
    size: '185m²',
    features: ['Separate Living', 'Slide', '1 Bedroom'],
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'two-bedroom-lagoon-slide',
    title: 'Two Bedroom Lagoon Villa with Pool + Slide',
    category: 'Water',
    size: '210m²',
    features: ['Family Suite', 'Slide', '2 Bedrooms'],
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'three-bedroom-lagoon-slide',
    title: 'Three Bedroom Lagoon Villa with Pool + Slide',
    category: 'Water',
    size: '352m²',
    features: ['Large Group', 'Slide', '3 Bedrooms'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'grand-water-pavilion-slide',
    title: 'Grand Water Pavilion with Pool + Slide',
    category: 'Water',
    size: '350m²',
    features: ['Butler Service', 'Sunset View', '2 Bedrooms'],
    image: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&q=80&w=800'
  }
];

export const DINING_VENUES: DiningItem[] = [
  { name: 'Tempo', specialty: 'International Buffet', type: 'Main Dining', hours: '06:30 - 22:00' },
  { name: 'Baraabaru', specialty: 'International Breakfast', type: 'Main Dining', hours: '08:00 - 10:30' },
  { name: 'Takrai', specialty: 'Thai Specialty', type: 'Signature', hours: '18:30 - 22:00' },
  { name: 'Kurry Leaf', specialty: 'Indian Specialty', type: 'Signature', hours: '18:30 - 22:00' },
  { name: 'The Wahoo Grill', specialty: 'Maldivian Grill', type: 'Specialty', hours: '18:30 - 22:00' },
  { name: 'Andalucia', specialty: 'Spanish & Mediterranean', type: 'Specialty', hours: '18:30 - 22:00' },
  { name: 'Arigato', specialty: 'Japanese Cuisine', type: 'Fine Dining', hours: '12:00 - 22:00' },
  { name: 'Barrique', specialty: 'Underground Wine Cellar', type: 'Exclusive', hours: '18:30 - 22:00' },
  { name: 'Shipwrecked', specialty: 'Bar & Light Lunch', type: 'Casual', hours: '10:30 - 00:00' },
  { name: 'Mint', specialty: 'Adults Only Pool Bar', type: 'Bar', hours: '10:00 - Late' },
  { name: 'Together', specialty: 'Main Bar & Pool', type: 'Bar', hours: '10:00 - Late' },
  { name: 'Good Vibrations', specialty: 'Epic Beach Bar', type: 'Bar', hours: '10:00 - 18:30' },
  { name: 'Jungali', specialty: 'Pool Bar with Lush Veg', type: 'Bar', hours: '10:00 - 22:00' },
  { name: 'The Orchid', specialty: 'Infinity Pool Bar', type: 'Bar', hours: '10:00 - Late' },
  { name: 'KulhiVaru', specialty: '24hr Sports Bar', type: 'Bar', hours: '24/7' },
  { name: 'Kaage', specialty: 'Maldivian Specialty', type: 'Signature', hours: '18:30 - 22:00' }
];

export const PACKAGES: PackageItem[] = [
  {
    id: 'all-inclusive-wow',
    title: 'WOW! All-Inclusive',
    description: 'Unlimited dining across 14 venues, premium drinks, and Indian Ocean\'s largest water park access.',
    price: 'From $540/night',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800',
    features: ['Unlimited Beverages', '6 Specialty Restaurants', 'Floating Waterpark', 'Snorkeling Excursions']
  },
  {
    id: 'residences-luxury',
    title: 'The Residences',
    description: 'Ultra-luxury 1-4 bedroom villas with personal butlers, MOKE use, and private pool slides.',
    price: 'From $1,200/night',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    features: ['In-Villa Breakfast', 'Private MOKE', 'Dedicated Butler', '60-min Spa Treatment']
  },
  {
    id: 'adventure-sports',
    title: 'Adventure & Sport',
    description: 'Go-Karting, Horse Riding, and FIFA-sized football camps for the active soul.',
    price: 'Custom Quotes',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
    features: ['Go-Kart Track', 'Marwari Horse Ranch', 'Tennis & Padel', 'FIFA Football Field']
  }
];

export const FAQS = [
  {
    question: "How do I get to Siyam World from Malé?",
    answer: "Siyam World is reachable via a scenic 40-minute direct seaplane ride or a 30-minute domestic flight followed by a 15-minute speedboat trip. Seaplane transfers are only available during daylight hours."
  },
  {
    question: "What is included in the WOW! All-Inclusive plan?",
    answer: "It includes 24/7 unlimited beverages, dining at 14 bars and restaurants (including 6 specialty venues), and experiential adventures like sunset cruises, waterpark access, and snorkeling equipment."
  },
  {
    question: "Tell me about the villa options.",
    answer: "We offer 16 different villa categories ranging from 81 to 1,600 square meters, including overwater villas with private slides and beachfront suites."
  },
  {
    question: "Is Siyam World suitable for families?",
    answer: "Absolutely. We have the Maldives' largest floating water park, dedicated kids' clubs, 24/7 sports bar, horse ranch, and villas designed for multi-generational travel."
  },
  {
    question: "What are the dining hours for specialty restaurants?",
    answer: "Most specialty restaurants are open for dinner from 18:30 to 22:00. We recommend pre-booking your favorites upon arrival to secure your preferred times."
  },
  {
    question: "Does the resort cater to dietary requirements?",
    answer: "Yes, our culinary teams at all 18 venues are well-versed in handling vegetarian, vegan, gluten-free, and halal requirements. Please mention any allergies in your inquiry notes."
  },
  {
    question: "Are there any honeymoon benefits?",
    answer: "Yes! Couples celebrating their honeymoon typically receive special amenities such as bed decorations, a bottle of sparkling wine, and a romantic candlelit dinner. Proof of marriage within 6-12 months is usually required."
  },
  {
    question: "Can I book a private seaplane?",
    answer: "Private seaplane charters can be arranged through Maldives Serenity Travels. This provides a more exclusive and direct transfer experience for your group."
  },
  {
    question: "Is there a laundry service on the island?",
    answer: "Yes, full laundry and dry cleaning services are available for all guests. Some higher-tier villa categories may include complimentary laundry as part of their package."
  },
  {
    question: "What is the check-in and check-out time?",
    answer: "Standard check-in is at 14:00 and check-out is at 12:00. Late check-outs are subject to availability and may incur additional charges."
  },
  {
    question: "Is there medical assistance available on the island?",
    answer: "Yes, the resort has an on-site clinic with a resident doctor available 24/7 for any medical needs or emergencies."
  },
  {
    question: "Can I use drones at Siyam World?",
    answer: "To ensure the privacy of all our guests, drone usage is restricted to designated areas and requires prior authorization from the resort management."
  }
];
