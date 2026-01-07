
import React from 'react';
import { VillaItem } from '../types.ts';

interface VillasPageProps {
  onInquiry: () => void;
  onSelectVilla: (v: VillaItem) => void;
  villas: VillaItem[];
}

export const VillasPage: React.FC<VillasPageProps> = ({ onInquiry, onSelectVilla, villas }) => {
  const beachVillas = villas.filter(v => v.category === 'Beach');
  const waterVillas = villas.filter(v => v.category === 'Water');

  const VillaCollection = ({ items, title }: { items: VillaItem[], title: string }) => (
    <div className="mb-24">
      <div className="px-6 max-w-7xl mx-auto mb-10">
        <h3 className="text-3xl md:text-5xl font-serif text-earth">{title}</h3>
        <p className="text-[10px] uppercase tracking-widest text-sand font-bold mt-2">Discover the essence of island living</p>
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 gap-8 pb-12">
        {items.map((villa) => (
          <div 
            key={villa.id} 
            className="min-w-[320px] md:min-w-[500px] snap-start group cursor-pointer" 
            onClick={() => { onSelectVilla(villa); window.scrollTo(0,0); }}
          >
            <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-mist/20 shadow-xl border border-earth/5">
              <img src={villa.image} alt={villa.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-earth/10 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button type="button" className="px-8 py-3 bg-bone text-earth text-[10px] uppercase tracking-widest font-black shadow-2xl">View Details</button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl md:text-3xl font-serif text-earth group-hover:text-sand transition-colors">{villa.title}</h4>
              <p className="text-[10px] uppercase tracking-widest text-sand font-bold">{villa.size} • {villa.category} Collection</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-24 bg-bone">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-5xl md:text-9xl font-serif text-earth italic mb-8 text-center leading-tight">Our Villa <br /> Collections</h2>
        <p className="max-w-2xl mx-auto text-center text-earth/60 font-light text-lg leading-relaxed">From beachfront residences to overwater villas with private slides, Siyam World offers 16 different categories of accommodation, each designed with freedom and fun in mind.</p>
      </div>
      <VillaCollection items={beachVillas} title="The Beach Collection" />
      <VillaCollection items={waterVillas} title="The Water Collection" />
    </div>
  );
};

interface RoomDetailViewProps {
  villa: VillaItem;
  onInquiry: () => void;
  onBack: () => void;
}

export const RoomDetailView: React.FC<RoomDetailViewProps> = ({ villa, onInquiry, onBack }) => (
  <div className="pt-32 pb-24 bg-bone animate-fade-in">
    <div className="max-w-7xl mx-auto px-6">
      <button onClick={onBack} className="flex items-center text-[10px] uppercase tracking-widest font-black text-sand hover:text-earth transition-colors mb-12 py-2">
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Collections
      </button>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-1 space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-sand">{villa.category} COLLECTION</span>
            <h1 className="text-5xl md:text-7xl font-serif text-earth leading-tight">{villa.title}</h1>
          </div>

          <div className="grid grid-cols-2 gap-8 border-y border-earth/10 py-10">
            <div>
              <div className="text-[8px] uppercase tracking-widest text-sand font-bold mb-1">Villa Size</div>
              <div className="text-xl md:text-2xl font-serif text-earth">{villa.size}</div>
            </div>
            <div>
              <div className="text-[8px] uppercase tracking-widest text-sand font-bold mb-1">Occupancy</div>
              <div className="text-xl md:text-2xl font-serif text-earth">Ideal for Groups</div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-earth">Key Features</h3>
            <ul className="grid grid-cols-2 gap-y-5">
              {villa.features.map((f, i) => (
                <li key={i} className="flex items-center text-[13px] text-earth/70">
                  <span className="w-1.5 h-1.5 bg-sand mr-3 rounded-full"></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <button 
            type="button"
            onClick={onInquiry}
            className="w-full py-6 bg-earth text-bone text-[11px] uppercase tracking-[0.4em] font-black hover:bg-sand transition-all shadow-2xl"
          >
            Inquire for Best Rates
          </button>
        </div>

        <div className="flex-1">
          <div className="aspect-[4/5] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-earth/5">
            <img src={villa.image} alt={villa.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
