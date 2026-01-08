
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
import { VILLAS } from './constants.tsx';

const INITIAL_CONTENT: AppContent = {
  heroAssets: [
    { type: 'video', src: 'https://maldives-serenitytravels.com/assets/videos/Villa%20Haven%20-%20Cinematic%20Video%20-%203840%20x%202160.mp4' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2400&auto=format&fit=crop' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=2400&auto=format&fit=crop' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2400&auto=format&fit=crop' }
  ],
  highlights: [
    { title: "Marwari Ranch", category: "Unique Experience", img: "https://www.sunsiyam.com/media/0gvjfscq/siyam-world-horse-9.jpg" },
    { title: "Floating Park", category: "Adventure", img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800" },
    { title: "Siyam Speed", category: "Go-Karting", img: "https://www.sunsiyam.com/media/u0lb5jly/siyam-world-maldives-kart-2.jpg" }
  ],
  villas: VILLAS,
  packages: []
};

const CMS_PIN = "1234";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [currentVilla, setCurrentVilla] = useState<VillaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<AppContent>(INITIAL_CONTENT);
  const [isCmsAuthenticated, setIsCmsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');

  // Auto-scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleInquiry = (villaId?: string) => {
    setIsModalOpen(true);
  };

  const handleCmsAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === CMS_PIN) {
      setIsCmsAuthenticated(true);
    } else {
      alert("Invalid Access PIN");
      setPinInput('');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case PageView.ROOMS:
        return (
          <VillasPage 
            villas={content.villas} 
            onInquiry={handleInquiry} 
            onSelectVilla={(v) => {
              setCurrentVilla(v);
              setCurrentPage(PageView.ROOM_DETAIL);
            }} 
          />
        );
      case PageView.ROOM_DETAIL:
        return currentVilla ? (
          <RoomDetailView 
            villa={currentVilla} 
            onInquiry={() => handleInquiry(currentVilla.id)} 
            onBack={() => setCurrentPage(PageView.ROOMS)} 
          />
        ) : null;
      case PageView.DINING:
        return <DiningPage />;
      case PageView.THANK_YOU:
        return <ThankYouPage onBackToHome={() => setCurrentPage(PageView.HOME)} />;
      case PageView.CMS:
        if (!isCmsAuthenticated) {
          return (
            <div className="min-h-screen bg-bone flex items-center justify-center px-6">
              <div className="max-w-md w-full bg-white p-12 border border-earth/10 shadow-2xl text-center space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-earth">Partner Portal</h2>
                  <p className="text-[10px] uppercase tracking-widest text-sand font-black">Secure Access Required</p>
                </div>
                <form onSubmit={handleCmsAuth} className="space-y-6">
                  <input 
                    type="password" 
                    placeholder="Enter Access PIN" 
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full bg-bone border border-earth/10 px-5 py-4 text-center text-xl tracking-[1em] outline-none focus:border-sand"
                    autoFocus
                  />
                  <button className="w-full py-4 bg-earth text-bone text-[10px] uppercase tracking-[0.4em] font-black">Authorize Session</button>
                </form>
                <button onClick={() => setCurrentPage(PageView.HOME)} className="text-[9px] uppercase tracking-widest text-earth/40 hover:text-earth transition-colors">Return to Site</button>
              </div>
            </div>
          );
        }
        return <CMSPage content={content} onUpdate={setContent} />;
      default:
        return (
          <LandingPage 
            heroAssets={content.heroAssets} 
            highlights={content.highlights} 
            onInquiry={handleInquiry} 
            setPage={setCurrentPage} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen selection:bg-sand selection:text-earth">
      {currentPage !== PageView.CMS && (
        <Header currentPage={currentPage} setPage={setCurrentPage} />
      )}
      
      <main>
        {renderPage()}
      </main>

      {currentPage !== PageView.CMS && (
        <Footer setPage={setCurrentPage} />
      )}

      {/* Global Inquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-earth/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-earth/20 hover:text-earth transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <InquiryForm 
              villas={content.villas}
              onSuccess={() => {
                setIsModalOpen(false);
                setCurrentPage(PageView.THANK_YOU);
              }}
            />
          </div>
        </div>
      )}

      {currentPage !== PageView.CMS && <AIBot />}
    </div>
  );
};

export default App;
