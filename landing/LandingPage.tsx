
import React, { useState, useEffect } from 'react';
import { PageView, HighlightItem } from '../types.ts';
import { RESORT_STATS, FAQS } from '../constants.tsx';

interface LandingPageProps {
  onInquiry: () => void;
  setPage: (p: PageView) => void;
  heroAssets: { type: 'video' | 'image', src: string }[];
  highlights: HighlightItem[];
}

const HeroSection = ({ onInquiry, assets }: { onInquiry: () => void, assets: { type: 'video' | 'image', src: string }[] }) => {
  const [assetIndex, setAssetIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssetIndex((prev) => (prev + 1) % assets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [assets]);

  return (
    <section className="relative h-[85vh] md:h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        {assets.map((asset, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${idx === assetIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            {asset.type === 'video' ? (
              <video autoPlay muted loop playsInline className="w-full h-full object-cover brightness-[0.75] scale-105">
                <source src={asset.src} type="video/mp4" />
              </video>
            ) : (
              <img src={asset.src} className="w-full h-full object-cover brightness-[0.75] scale-105" alt="Siyam World Maldives" />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-earth/30 via-transparent to-earth/10"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-5xl px-6 animate-fade-in">
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] mb-4 md:mb-6 block font-bold text-mist">Premium Resort Collective</span>
        <h1 className="text-5xl md:text-9xl font-serif mb-8 md:mb-10 leading-[0.9] tracking-tight text-bone">
          Siyam World <br /> <span className="italic font-light opacity-90">Maldives</span>
        </h1>
        <div className="w-px h-12 md:h-16 bg-bone/30 mx-auto mb-8 md:mb-10 hidden md:block"></div>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-10 md:mb-12 opacity-90 max-w-md mx-auto leading-loose px-4 text-bone">
          A bold playground with an infinite collection of experiences across land, ocean, and sky.
        </p>
        <button 
          onClick={onInquiry}
          className="group relative px-10 md:px-16 py-5 md:py-6 overflow-hidden border border-bone/40 hover:border-bone transition-all duration-500"
        >
          <span className="relative z-10 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-bone">Request Bespoke Quote</span>
          <div className="absolute inset-0 bg-bone translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          <span className="absolute inset-0 flex items-center justify-center text-earth opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black">Plan Your Stay</span>
        </button>
      </div>
    </section>
  );
};

const KeywordTicker = () => {
  const keywords = [
    "WOW! ALL-INCLUSIVE", "54 HECTARES OF FUN", "MALDIVES' FIRST GO-KART", 
    "HORSE RANCH", "18 RESTAURANTS & BARS", "OVERWATER SLIDES", 
    "FLOATING WATERPARK", "BUTLER SERVICE", "RECREATIONAL PARADISE",
    "SPEEDBOAT TRANSFERS", "SEAPLANE LOUNGE", "FIFA FOOTBALL CAMP"
  ];
  return (
    <div className="bg-earth py-5 overflow-hidden border-y border-earth/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {keywords.map((word, idx) => (
              <span key={idx} className="mx-10 md:mx-16 text-[9px] font-bold uppercase tracking-[0.4em] text-mist/60">
                {word} <span className="ml-10 md:ml-16 opacity-20">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const IntroSection = () => (
  <section className="bg-bone py-24 md:py-32 px-6">
    <div className="max-w-5xl mx-auto text-center space-y-12">
      <div className="flex justify-center mb-4"><div className="w-12 h-[1.5px] bg-sand"></div></div>
      <h2 className="text-4xl md:text-6xl font-serif text-earth leading-tight italic">Where the World <br /> Revolves Around You</h2>
      <p className="max-w-3xl mx-auto text-earth/70 text-base md:text-lg font-light leading-relaxed">
        Siyam World is a striking new vision of the Maldives' rich natural wonders, a carefree playground with an exciting, diverse, and infinite collection of experiences across land, ocean, and sky. Designed for fun-loving, open-minded travellers, with the freedom to roam, socialize and engage in a vibrant island community.
      </p>
      <div className="pt-8">
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-sand px-6 py-3 border border-sand/30">Managed by Maldives Serenity Travels</span>
      </div>
    </div>
  </section>
);

const OverviewSection = () => (
  <section className="bg-white py-20 md:py-28 px-6 border-y border-earth/5">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
      {[
        { label: 'Island Size', value: RESORT_STATS.size },
        { label: 'Villa Styles', value: RESORT_STATS.villas },
        { label: 'Dining Venues', value: RESORT_STATS.dining },
        { label: 'Transfer', value: RESORT_STATS.transfer },
        { label: 'Location', value: RESORT_STATS.location }
      ].map((stat, i) => (
        <div key={i} className="text-center space-y-3 group">
          <div className="text-[9px] uppercase tracking-[0.3em] text-sand font-bold group-hover:text-earth transition-colors">{stat.label}</div>
          <div className="text-lg md:text-2xl font-serif text-earth">{stat.value}</div>
        </div>
      ))}
    </div>
  </section>
);

const HighlightsScroller = ({ highlights }: { highlights: HighlightItem[] }) => (
  <section className="bg-bone py-24 md:py-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 mb-16">
      <h2 className="text-4xl md:text-7xl font-serif text-earth leading-tight">Island <br /><span className="italic">Highlights</span></h2>
      <p className="text-[10px] uppercase tracking-widest text-sand font-bold mt-4">Infinite collection of experiences</p>
    </div>
    <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 px-6 gap-8">
      {highlights.map((item, i) => (
        <div key={i} className="min-w-[320px] md:min-w-[550px] snap-start group relative aspect-[16/10] overflow-hidden bg-white shadow-2xl transition-all duration-700 hover:shadow-mist/30">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-10 left-10 text-bone">
            <span className="text-mist text-[10px] uppercase tracking-widest font-black mb-3 block">{item.category}</span>
            <h3 className="text-3xl md:text-4xl font-serif">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const LandingPage = ({ onInquiry, setPage, heroAssets, highlights }: LandingPageProps) => (
  <>
    <HeroSection onInquiry={onInquiry} assets={heroAssets} />
    <KeywordTicker />
    <IntroSection />
    <OverviewSection />
    <HighlightsScroller highlights={highlights} />
    <section className="bg-bone py-24 md:py-40 px-6 border-t border-earth/5 relative overflow-hidden text-center">
      <div className="absolute top-0 right-0 w-96 h-96 bg-mist/30 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <h2 className="text-5xl md:text-8xl font-serif text-earth italic leading-tight mb-12">Your Infinite <br /> World Awaits</h2>
      <div className="flex flex-wrap justify-center gap-6 relative z-10">
         <button onClick={() => setPage(PageView.ROOMS)} className="px-14 py-6 bg-earth text-bone text-[11px] uppercase tracking-[0.4em] font-black shadow-2xl hover:bg-sand transition-all">Explore Collections</button>
         <button onClick={() => setPage(PageView.DINING)} className="px-14 py-6 border border-earth/20 text-earth text-[11px] uppercase tracking-[0.4em] font-black hover:bg-white transition-all">All Venues</button>
      </div>
    </section>
    <section className="bg-white py-24 md:py-32 px-6">
       <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-earth">Guest Support</h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-sand font-bold">Frequently Asked Questions</p>
          </div>
          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-bone p-8 md:p-10 cursor-pointer border border-transparent hover:border-sand/10 transition-all shadow-sm">
                <summary className="flex justify-between items-center text-earth font-serif text-xl md:text-2xl list-none">
                  {faq.question}
                  <span className="text-sand group-open:rotate-180 transition-transform duration-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </summary>
                <p className="mt-8 text-earth/60 text-lg leading-relaxed font-light border-t border-earth/5 pt-8">{faq.answer}</p>
              </details>
            ))}
          </div>
       </div>
    </section>
  </>
);
