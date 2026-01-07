
import React, { useState } from 'react';
import { AppContent } from '../types.ts';

interface CMSPageProps {
  content: AppContent;
  onUpdate: (newContent: AppContent) => void;
}

export const CMSPage: React.FC<CMSPageProps> = ({ content, onUpdate }) => {
  const [localContent, setLocalContent] = useState<AppContent>(content);
  const [status, setStatus] = useState<'idle' | 'saved'>('idle');

  const handleSave = () => {
    onUpdate(localContent);
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 3000);
  };

  const updateHero = (index: number, value: string) => {
    const newHero = [...localContent.heroAssets];
    newHero[index].src = value;
    setLocalContent({ ...localContent, heroAssets: newHero });
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...localContent.highlights];
    newHighlights[index].img = value;
    setLocalContent({ ...localContent, highlights: newHighlights });
  };

  const updateVilla = (id: string, value: string) => {
    const newVillas = localContent.villas.map(v => v.id === id ? { ...v, image: value } : v);
    setLocalContent({ ...localContent, villas: newVillas });
  };

  return (
    <div className="pt-32 pb-24 bg-bone min-h-screen px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-earth/10 pb-8">
          <div>
            <h1 className="text-4xl font-serif text-earth mb-2 italic">Resort CMS</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-sand font-bold">Manage Visual Assets for Google Ads Performance</p>
          </div>
          <button 
            onClick={handleSave}
            className={`px-10 py-4 text-[10px] uppercase tracking-widest font-black transition-all ${status === 'saved' ? 'bg-green-600 text-white' : 'bg-earth text-bone hover:bg-sand'}`}
          >
            {status === 'saved' ? 'Content Synchronized' : 'Save All Changes'}
          </button>
        </div>

        <div className="space-y-16">
          {/* Hero Section */}
          <section>
            <h2 className="text-[12px] uppercase tracking-[0.5em] font-black text-earth mb-6 border-l-4 border-sand pl-4">Main Hero Carousel</h2>
            <div className="grid gap-4">
              {localContent.heroAssets.map((asset, i) => (
                <div key={i} className="flex gap-4 items-center bg-white p-4 border border-earth/5 shadow-sm">
                  <div className="w-20 h-20 bg-mist/20 overflow-hidden flex-shrink-0">
                    {asset.type === 'video' ? <div className="w-full h-full bg-ocean/20 flex items-center justify-center text-[8px] font-bold uppercase">Video</div> : <img src={asset.src} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] uppercase tracking-widest text-sand font-bold block mb-1">Hero Asset {i + 1} ({asset.type})</label>
                    <input 
                      type="text" 
                      value={asset.src} 
                      onChange={(e) => updateHero(i, e.target.value)}
                      className="w-full bg-bone px-4 py-2 text-xs font-medium border border-earth/10 focus:border-sand outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Highlights Section */}
          <section>
            <h2 className="text-[12px] uppercase tracking-[0.5em] font-black text-earth mb-6 border-l-4 border-sand pl-4">Island Highlights</h2>
            <div className="grid gap-4">
              {localContent.highlights.map((item, i) => (
                <div key={i} className="flex gap-4 items-center bg-white p-4 border border-earth/5 shadow-sm">
                  <img src={item.img} className="w-20 h-20 object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <label className="text-[9px] uppercase tracking-widest text-sand font-bold block mb-1">{item.title} ({item.category})</label>
                    <input 
                      type="text" 
                      value={item.img} 
                      onChange={(e) => updateHighlight(i, e.target.value)}
                      className="w-full bg-bone px-4 py-2 text-xs font-medium border border-earth/10 focus:border-sand outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Villas Section */}
          <section>
            <h2 className="text-[12px] uppercase tracking-[0.5em] font-black text-earth mb-6 border-l-4 border-sand pl-4">Villa Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localContent.villas.map((villa) => (
                <div key={villa.id} className="bg-white p-4 border border-earth/5 shadow-sm flex flex-col gap-3">
                  <img src={villa.image} className="w-full h-32 object-cover" />
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-sand font-bold block mb-1">{villa.title}</label>
                    <input 
                      type="text" 
                      value={villa.image} 
                      onChange={(e) => updateVilla(villa.id, e.target.value)}
                      className="w-full bg-bone px-4 py-2 text-xs font-medium border border-earth/10 focus:border-sand outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
