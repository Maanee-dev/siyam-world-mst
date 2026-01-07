import React, { useEffect } from 'react';

interface ThankYouPageProps {
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onBackToHome }) => {
  useEffect(() => {
    // Analytics Conversion Event Placeholder
    // window.dataLayer = window.dataLayer || [];
    // window.dataLayer.push({'event': 'form_submission_complete'});
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 bg-bone">
      <div className="max-w-2xl text-center space-y-10 animate-fade-in">
         <div className="w-20 h-20 bg-mist text-earth rounded-full flex items-center justify-center mx-auto shadow-2xl ring-1 ring-earth/5">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
         </div>
         <h1 className="text-6xl md:text-8xl font-serif text-earth italic">Thank You</h1>
         <p className="text-earth/60 text-xl font-light leading-relaxed">
           Your world has been re-imagined. A Siyam World specialist from <strong>Maldives Serenity Travels</strong> will reach out within 2 hours with your curated proposal.
         </p>
         <button 
           type="button" 
           onClick={onBackToHome} 
           className="px-16 py-6 bg-earth text-bone text-[11px] uppercase tracking-[0.4em] font-black shadow-2xl transition-all hover:bg-sand"
         >
           Back to Exploration
         </button>
      </div>
    </section>
  );
};