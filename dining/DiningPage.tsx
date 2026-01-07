import React from 'react';
import { DINING_VENUES } from '../constants.tsx';

export const DiningPage: React.FC = () => (
  <div className="pt-32 pb-24 bg-bone">
    <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
      <h2 className="text-5xl md:text-9xl font-serif text-earth italic mb-8 leading-tight">World Flavours</h2>
      <p className="max-w-2xl mx-auto text-earth/60 font-light text-lg leading-relaxed">Experience a world of culinary delights with our WOW! All-Inclusive plan featuring 18 different venues, bars and lounges.</p>
    </div>

    <div className="space-y-24">
      {['Signature', 'Specialty', 'Main Dining', 'Bar'].map((category) => {
        const items = DINING_VENUES.filter(v => v.type === category);
        if (items.length === 0) return null;
        return (
          <div key={category}>
            <div className="px-6 max-w-7xl mx-auto mb-10">
              <h3 className="text-3xl md:text-4xl font-serif text-earth">{category} Venues</h3>
              <div className="w-16 h-[2px] bg-sand mt-6"></div>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 gap-8 pb-4">
              {items.map((venue, i) => (
                <div key={i} className="min-w-[280px] md:min-w-[420px] snap-start group bg-white p-10 border border-earth/5 hover:border-sand transition-all shadow-xl">
                  <h4 className="text-2xl md:text-3xl font-serif text-earth group-hover:text-sand transition-colors mb-6">{venue.name}</h4>
                  <p className="text-earth/60 text-[14px] leading-relaxed mb-8 h-16 overflow-hidden">{venue.specialty}</p>
                  <div className="text-[10px] font-black text-sand uppercase tracking-widest flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {venue.hours}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);