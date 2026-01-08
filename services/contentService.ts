
import { AppContent } from '../types.ts';
import { VILLAS } from '../constants.tsx';

const CONTENT_KEY = 'serenity_site_content_v2';

const INITIAL_CONTENT: AppContent = {
  heroAssets: [
    { type: 'video', src: 'https://maldives-serenitytravels.com/assets/videos/Villa%20Haven%20-%20Cinematic%20Video%20-%203840%20x%202160.mp4' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2400&auto=format&fit=crop' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=2400&auto=format&fit=crop' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2400&auto=format&fit=crop' }
  ],
  highlights: [
    { title: "Marwari Ranch", category: "Unique Experience", img: "https://www.sunsiyam.com/media/0gvjfscq/siyam-world-horse-9.jpg" },
    { title: "Floating Park", category: "Adventure", img: "https://globetrender.com/wp-content/uploads/2021/08/Siyam-Water-World-aerial.jpg" },
    { title: "Siyam Speed", category: "Go-Karting", img: "https://www.traveltrademaldives.com/assets/2024/05/087A0952_11zon-scaled.jpg" }
  ],
  villas: VILLAS,
  packages: [],
  siteBranding: {
    resortName: "Siyam World",
    partnerName: "Maldives Serenity Travels",
    heroHeadline: "Siyam World Maldives",
    heroSubheadline: "A bold playground with an infinite collection of experiences across land, ocean, and sky.",
    trustSignal: "Official Partner | Best Rates | Speedboat Included",
    primaryCTA: "Request Bespoke Quote"
  }
};

export const contentService = {
  getContent: (): AppContent => {
    try {
      const stored = localStorage.getItem(CONTENT_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to load content", e);
    }
    return INITIAL_CONTENT;
  },

  saveContent: (content: AppContent) => {
    try {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    } catch (e) {
      console.error("Failed to save content", e);
    }
  },

  resetToDefault: () => {
    localStorage.removeItem(CONTENT_KEY);
    window.location.reload();
  }
};
