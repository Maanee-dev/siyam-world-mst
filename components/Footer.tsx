
import React from 'react';
import { PageView } from '../types.ts';

interface FooterProps {
  setPage: (view: PageView) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
    <footer className="bg-earth text-bone py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <div className="space-y-2">
            <div className="text-2xl font-serif tracking-tight text-bone">SIYAM WORLD MALDIVES</div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-sand font-bold">Authorized Agency Partner</div>
          </div>
          <p className="text-bone/60 text-sm max-w-sm leading-relaxed font-light">
            An official partner experience curated by Maldives Serenity Travels. We specialize in providing the highest conversion rates and best value for your luxury holiday at Siyam World.
          </p>
          <div className="flex space-x-6">
            {['Instagram', 'Facebook', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="text-[9px] uppercase tracking-widest font-black text-sand hover:text-bone transition-colors">{social}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-8 uppercase tracking-[0.3em] text-[10px] text-sand">Destinations</h4>
          <ul className="space-y-4 text-[11px] text-bone/60 uppercase tracking-widest">
            {['Home', 'Villas', 'Dining', 'Experiences', 'Special Offers'].map(link => (
              <li key={link}>
                <button 
                  onClick={() => {
                    const view = link.toLowerCase() === 'home' ? PageView.HOME : 
                                 link.toLowerCase() === 'villas' ? PageView.ROOMS : 
                                 link.toLowerCase() === 'dining' ? PageView.DINING : PageView.PACKAGES;
                    setPage(view);
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-sand transition-colors font-bold"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-8 uppercase tracking-[0.3em] text-[10px] text-sand">Contact</h4>
          <ul className="space-y-6 text-sm text-bone/60 font-light">
            <li className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest font-black text-sand/40">Head Office</span>
              Malé, Republic of Maldives
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest font-black text-sand/40">Inquiry Line</span>
              Official WhatsApp Priority Support
            </li>
            <li className="pt-4">
              <button 
                onClick={() => setPage(PageView.CMS)}
                className="text-[9px] uppercase tracking-widest font-black text-sand/40 hover:text-sand transition-colors border-t border-bone/5 pt-4 block"
              >
                Partner Portal
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-bone/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-bone/30 uppercase tracking-[0.2em] font-medium">
        <p>© 2024 Maldives Serenity Travels. All Rights Reserved.</p>
        <div className="flex space-x-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-bone transition-colors">Privacy</a>
          <a href="#" className="hover:text-bone transition-colors">Cookies</a>
          <a href="#" className="hover:text-bone transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
