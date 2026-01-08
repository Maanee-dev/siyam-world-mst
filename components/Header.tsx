
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
  
  // Keep the header bar itself slim for a modern, elegant look
  const bgClass = (isScrolled || currentPage !== PageView.HOME) 
    ? "bg-white/95 backdrop-blur-md shadow-md h-16 md:h-20" 
    : "bg-transparent h-24 md:h-28";

  const navLinks = [
    { label: 'Explore', view: PageView.HOME },
    { label: 'Villas', view: PageView.ROOMS },
    { label: 'Dining', view: PageView.DINING },
    { label: 'Offers', view: PageView.PACKAGES },
  ];

  const handleNavClick = (view: PageView) => {
    setPage(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${bgClass}`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          
          {/* Brand Identity - Oversized for High Impact */}
          <div 
            className="cursor-pointer group z-50 transition-all duration-300 relative h-full flex items-center" 
            onClick={() => handleNavClick(PageView.HOME)}
          >
            {/* The logo container is taller than the header bar to create a signature brand overhang */}
            <div className="h-28 md:h-56 flex items-center transition-all duration-500 transform origin-left">
              <img 
                src="https://maldives-serenitytravels.com/logo2.svg" 
                alt="Maldives Serenity Travels" 
                className={`h-full w-auto object-contain transition-all duration-700 transform group-hover:scale-105 ${isScrolled || currentPage !== PageView.HOME ? '' : 'brightness-0 invert'}`}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className={`text-[10px] uppercase tracking-[0.4em] font-black transition-all relative py-2 group ${textClass} ${currentPage === link.view ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-sand transition-transform duration-500 origin-left ${currentPage === link.view ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </nav>

          {/* Desktop Conversion CTA */}
          <div className="hidden lg:block">
            <button 
              onClick={() => handleNavClick(PageView.HOME)}
              className={`px-10 py-3 border-2 text-[10px] uppercase tracking-[0.4em] font-black transition-all shadow-sm active:scale-95 ${
                (isScrolled || currentPage !== PageView.HOME)
                  ? 'border-earth text-earth hover:bg-earth hover:text-bone' 
                  : 'border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-earth'
              }`}
            >
              Get Best Rate
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className={`lg:hidden z-50 p-2 transition-colors ${isMobileMenuOpen ? 'text-earth' : textClass}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" /></svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay - Centered Experience */}
      <div className={`fixed inset-0 z-[45] bg-bone transform transition-transform duration-700 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
          
          <div className="flex flex-col items-center space-y-12 mb-16">
            {navLinks.map((link, idx) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className="text-3xl md:text-5xl font-serif text-earth italic hover:text-sand transition-all tracking-[0.1em] animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Primary Mobile CTA */}
          <div className="w-full max-w-xs space-y-6 pt-8 border-t border-earth/5">
            <button 
              onClick={() => handleNavClick(PageView.HOME)}
              className="w-full py-5 bg-earth text-bone text-[11px] uppercase tracking-[0.4em] font-black shadow-2xl active:scale-95 transition-all"
            >
              Request Quick Quote
            </button>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[8px] uppercase tracking-[0.3em] text-earth/40 font-black">Official Resort Partner</p>
              <div className="w-8 h-[1px] bg-sand/30"></div>
            </div>
          </div>

          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-mist/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-sand/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
