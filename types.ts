
export interface InquiryData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  selectedVillaId?: string;
}

export interface InquiryLead extends InquiryData {
  id: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'booked';
  source: 'google-ads' | 'direct';
}

export enum PageView {
  HOME = 'home',
  ROOMS = 'rooms',
  ROOM_DETAIL = 'room-detail',
  DINING = 'dining',
  PACKAGES = 'packages',
  ALL_INCLUSIVE = 'all-inclusive',
  HONEYMOON = 'honeymoon',
  FAMILY = 'family',
  OFFERS = 'offers',
  THANK_YOU = 'thank-you',
  CMS = 'cms'
}

export interface PackageItem {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

export interface VillaItem {
  id: string;
  title: string;
  category: 'Beach' | 'Water';
  size: string;
  features: string[];
  image: string;
  description?: string;
}

export interface DiningItem {
  name: string;
  specialty: string;
  type: string;
  hours: string;
  description?: string;
}

export interface HighlightItem {
  title: string;
  category: string;
  img: string;
}

export interface AppContent {
  heroAssets: { type: 'video' | 'image', src: string }[];
  highlights: HighlightItem[];
  villas: VillaItem[];
  packages: PackageItem[];
}
