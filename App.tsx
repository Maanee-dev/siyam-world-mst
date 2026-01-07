
import React, { useState, useEffect } from 'react';
import { PageView, VillaItem, AppContent } from './types.ts';
import Header from './components/Header.tsx';
import InquiryForm from './components/InquiryForm.tsx';
import AIBot from './components/AIBot.tsx';
import Footer from './components/Footer.tsx';
import { LandingPage } from './landing/LandingPage.tsx';
import { VillasPage, RoomDetailView } from './villas/VillasPage.tsx';
import { DiningPage } from './dining/DiningPage.tsx';
import { ThankYouPage } from './thank-you/ThankYouPage.tsx';
import { CMSPage } from './cms/CMSPage.tsx';
import { VILLAS, PACKAGES } from './constants.tsx';

const INITIAL_CONTENT: AppContent = {
  heroAssets: [
    { type: 'video', src: 'https://maldives-serenitytravels.com/assets/videos/Villa%20Haven%20-%20Cinematic%20Video%20-%203840%20x%202160.mp4' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2400&auto=format&fit=crop' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=2400&auto=format&fit=crop' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2400&auto=format&fit=crop' }
  ],
  highlights: [
    { title: "Marwari Ranch", category: "Unique Experience", img: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800" },
    { title: "Floating Park", category: "Adventure", img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800" },
    { title: "Siyam Speed", category: "Go-Karting", img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800" },
    { title: "FIFA Pitch", category: "Sports", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800" },
    { title: "Veyo Spa", category: "Wellness", img: "https://images.unsplash.com/photo-1544161515-4af6b1d4640b?auto=format&fit=crop&w=800" }
  ],
  villas: VILLAS,
  packages: PACKAGES
};

const CookiePolicyBanner = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent-serenity');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent-serenity', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-bone p-6 md:p-8 z-[100] border-t border-earth/10 animate-slide-up shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth">Cookie Policy</h5>
          <p className="text-[11px] font-medium tracking-widest leading-relaxed text-center md:text-left opacity-70 uppercase max-w-2xl">
            As an official Siyam World partner, we use refined digital cookies to curate your experience and optimize our bespoke travel offerings.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={accept} className="flex-1 md:flex-none px-12 py-4 bg-earth text-bone text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-lg">Accept All</button>
          <button onClick={() => setShow(false)} className="flex-1 md:flex-none px-12 py-4 border border-earth/10 text-earth text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Manage</button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setPage] = useState<PageView>(PageView.HOME);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState<VillaItem | null>(null);
  
  // CMS Content State
  const [appContent, setAppContent] = useState<AppContent>(() => {
    const saved = localStorage.getItem('serenity-cms-content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleUpdateContent = (newContent: AppContent) => {
    setAppContent(newContent);
    localStorage.setItem('serenity-cms-content', JSON.stringify(newContent));
  };

  const handleSelectVilla = (v: VillaItem) => {
    setSelectedVilla(v);
    setPage(PageView.ROOM_DETAIL);
  };

  const handleFormSuccess = () => {
    setShowInquiryModal(false);
    setPage(PageView.THANK_YOU);
  };

  const renderContent = () => {
    switch (currentPage) {
      case PageView.ROOMS:
        return <VillasPage villas={appContent.villas} onInquiry={() => setShowInquiryModal(true)} onSelectVilla={handleSelectVilla} />;
      case PageView.ROOM_DETAIL:
        return selectedVilla ? <RoomDetailView villa={selectedVilla} onInquiry={() => setShowInquiryModal(true)} onBack={() => setPage(PageView.ROOMS)} /> : null;
      case PageView.DINING:
        return <DiningPage />;
      case PageView.THANK_YOU:
        return <ThankYouPage onBackToHome={() => setPage(PageView.HOME)} />;
      case PageView.CMS:
        return <CMSPage content={appContent} onUpdate={handleUpdateContent} />;
      case PageView.HOME:
      default:
        return <LandingPage onInquiry={() => setShowInquiryModal(true)} setPage={setPage} heroAssets={appContent.heroAssets} highlights={appContent.highlights} />;
    }
  };

  return (
    <div className="min-h-screen bg-bone selection:bg-sand/30">
      <Header currentPage={currentPage} setPage={setPage} />
      
      <main>
        {renderContent()}
      </main>

      <Footer setPage={setPage} />
      <AIBot />
      <CookiePolicyBanner />

      {/* Admin Trigger (Secret or Footer based for now) */}
      <div className="fixed bottom-4 left-4 z-50 opacity-0 hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setPage(PageView.CMS)}
          className="text-[8px] bg-earth text-bone px-2 py-1 uppercase tracking-widest font-bold"
        >
          CMS Portal
        </button>
      </div>

      {/* Sticky mobile CTA (Ads-First Optimization) */}
      <div className={`fixed bottom-8 right-8 md:hidden z-50 transition-opacity duration-500 ${showInquiryModal ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
         <button 
           type="button"
           onClick={() => setShowInquiryModal(true)}
           className="w-16 h-16 bg-earth text-bone rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.3)] ring-4 ring-white/30 active:scale-90 transition-transform"
         >
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
         </button>
      </div>

      {showInquiryModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-6 bg-earth/95 backdrop-blur-2xl transition-all">
          <div className="relative w-full max-w-2xl h-full md:h-auto overflow-y-auto no-scrollbar bg-bone">
            <button 
              type="button"
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-earth bg-white/80 backdrop-blur-md p-3 rounded-full shadow-2xl z-[120] hover:scale-110 active:scale-95 transition-all border border-earth/10"
              aria-label="Close Inquiry Form"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <InquiryForm villas={appContent.villas} onSuccess={handleFormSuccess} variant="modal" />
          </div>
        </div>
      )}
    </div>
  );
}
