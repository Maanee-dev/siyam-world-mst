
import React, { useState, useEffect } from 'react';
import { PageView } from '../types.ts';

interface HeaderProps {
  currentPage: PageView;
  setPage: (page: PageView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textClass = (isScrolled || currentPage !== PageView.HOME) ? "text-earth" : "text-bone";
  const bgClass = (isScrolled || currentPage !== PageView.HOME) ? "bg-bone/95 backdrop-blur-md py-4 shadow-sm border-b border-earth/5" : "bg-transparent py-8";

  const navLinks = [
    { label: 'Explore', view: PageView.HOME },
    { label: 'Villas', view: PageView.ROOMS },
    { label: 'Dining', view: PageView.DINING },
    { label: 'Offers', view: PageView.PACKAGES },
  ];

  const handleNavClick = (view: PageView) => {
    setPage(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div 
            className="cursor-pointer group flex flex-col items-center md:items-start z-50" 
            onClick={() => handleNavClick(PageView.HOME)}
          >
            <div className={`text-lg md:text-xl font-serif tracking-[0.2em] uppercase transition-colors ${isMobileMenuOpen ? 'text-earth' : textClass}`}>
              Siyam World
            </div>
            <div className={`text-[7px] tracking-[0.4em] uppercase opacity-40 mt-1 transition-colors ${isMobileMenuOpen ? 'text-earth' : textClass}`}>
              Maldives Serenity Travels
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-opacity hover:opacity-100 ${textClass} ${currentPage === link.view ? 'opacity-100 border-b border-sand' : 'opacity-50'}`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick(PageView.HOME)}
              className={`px-8 py-3 border text-[10px] uppercase tracking-[0.3em] font-black transition-all ${
                (isScrolled || currentPage !== PageView.HOME)
                  ? 'border-earth text-earth hover:bg-earth hover:text-bone' 
                  : 'border-bone/20 text-bone hover:border-bone hover:bg-bone hover:text-earth'
              }`}
            >
              Inquire Now
            </button>
          </nav>

          <button 
            className={`lg:hidden z-50 p-2 transition-colors ${isMobileMenuOpen ? 'text-earth' : textClass}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 8h16M4 16h16" /></svg>
            )}
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[45] bg-bone transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col items-center justify-center space-y-8 px-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.view)}
              className="text-4xl font-serif text-earth italic hover:text-sand transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick(PageView.HOME)}
            className="w-full max-w-xs py-5 bg-earth text-bone text-[12px] uppercase tracking-[0.4em] font-black shadow-xl"
          >
            Request Instant Quote
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
