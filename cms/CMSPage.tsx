
import React, { useState, useEffect } from 'react';
import { AppContent, InquiryLead } from '../types.ts';
import { inquiryService } from '../services/inquiryService.ts';

interface CMSPageProps {
  content: AppContent;
  onUpdate: (newContent: AppContent) => void;
}

export const CMSPage: React.FC<CMSPageProps> = ({ content, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'leads'>('content');
  const [localContent, setLocalContent] = useState<AppContent>(content);
  const [leads, setLeads] = useState<InquiryLead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    if (activeTab === 'leads') {
      refreshLeads();
    }
  }, [activeTab]);

  const refreshLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const data = await inquiryService.getAllLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

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

  const handleStatusChange = async (id: string, newStatus: InquiryLead['status']) => {
    await inquiryService.updateLeadStatus(id, newStatus);
    refreshLeads();
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm('Permanently delete this lead from the live database?')) {
      await inquiryService.deleteLead(id);
      refreshLeads();
    }
  };

  return (
    <div className="pt-32 pb-24 bg-bone min-h-screen px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-earth/10 pb-8 gap-6">
          <div>
            <h1 className="text-4xl font-serif text-earth mb-2 italic">Resort Management</h1>
            <div className="flex gap-6 mt-4">
              <button 
                onClick={() => setActiveTab('content')}
                className={`text-[10px] uppercase tracking-[0.4em] font-black pb-2 border-b-2 transition-all ${activeTab === 'content' ? 'border-earth text-earth' : 'border-transparent text-earth/30'}`}
              >
                Visual Content
              </button>
              <button 
                onClick={() => setActiveTab('leads')}
                className={`text-[10px] uppercase tracking-[0.4em] font-black pb-2 border-b-2 transition-all ${activeTab === 'leads' ? 'border-earth text-earth' : 'border-transparent text-earth/30'}`}
              >
                Inquiry Database
              </button>
            </div>
          </div>
          {activeTab === 'content' && (
            <button 
              onClick={handleSave}
              className={`px-10 py-4 text-[10px] uppercase tracking-widest font-black transition-all ${status === 'saved' ? 'bg-green-600 text-white' : 'bg-earth text-bone hover:bg-sand'}`}
            >
              {status === 'saved' ? 'Synced to Cloud' : 'Publish Changes'}
            </button>
          )}
        </div>

        {activeTab === 'content' ? (
          <div className="space-y-16 max-w-4xl">
            <section>
              <h2 className="text-[12px] uppercase tracking-[0.5em] font-black text-earth mb-6 border-l-4 border-sand pl-4">Main Hero Carousel</h2>
              <div className="grid gap-4">
                {localContent.heroAssets.map((asset, i) => (
                  <div key={i} className="flex gap-4 items-center bg-white p-4 border border-earth/5 shadow-sm">
                    <div className="w-20 h-20 bg-mist/20 overflow-hidden flex-shrink-0">
                      {asset.type === 'video' ? <div className="w-full h-full bg-ocean/20 flex items-center justify-center text-[8px] font-bold uppercase">Video</div> : <img src={asset.src} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <label className="text-[9px] uppercase tracking-widest text-sand font-bold block mb-1">Asset {i + 1}</label>
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
        ) : (
          <div className="animate-fade-in space-y-8">
            <div className="flex justify-between items-center bg-white p-6 border border-earth/5">
               <div className="text-[10px] uppercase tracking-widest font-black text-earth">
                 {isLoadingLeads ? 'Updating Database...' : `Remote Database Status: Online (${leads.length} Leads)`}
               </div>
               <button onClick={refreshLeads} className="p-2 hover:bg-bone transition-colors">
                  <svg className={`w-4 h-4 text-sand ${isLoadingLeads ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
               </button>
            </div>

            <div className="overflow-x-auto bg-white border border-earth/5 shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bone border-b border-earth/5">
                    {['Guest Info', 'Stay Duration', 'Villa Selection', 'Lead Status', 'Actions'].map(h => (
                      <th key={h} className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-sand">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth/5">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-bone transition-colors group">
                      <td className="px-6 py-6">
                        <div className="text-[12px] font-bold text-earth">{lead.name}</div>
                        <div className="text-[10px] opacity-60 font-medium">{lead.email}</div>
                        <div className="text-[10px] opacity-60 font-medium">{lead.phone}</div>
                        <div className="text-[8px] mt-2 font-black text-sand uppercase tracking-tighter">Received: {new Date(lead.timestamp).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-[10px] font-bold text-earth">{lead.checkIn} — {lead.checkOut}</div>
                        <div className="text-[9px] opacity-60 mt-1 uppercase font-black">{lead.adults} ADT / {lead.children} CHD</div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-[10px] font-black text-earth uppercase tracking-widest border-b border-sand/30 inline-block">{lead.selectedVillaId?.replace(/-/g, ' ')}</div>
                        {lead.notes && <div className="text-[9px] opacity-40 mt-1 italic line-clamp-1 group-hover:line-clamp-none transition-all">"{lead.notes}"</div>}
                      </td>
                      <td className="px-6 py-6">
                        <select 
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                          className={`text-[9px] font-black uppercase px-4 py-2 rounded-none border outline-none shadow-sm ${
                            lead.status === 'new' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                            lead.status === 'contacted' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                            'bg-green-50 text-green-800 border-green-200'
                          }`}
                        >
                          <option value="new">NEW LEAD</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="booked">BOOKED</option>
                        </select>
                      </td>
                      <td className="px-6 py-6">
                        <button onClick={() => handleDeleteLead(lead.id)} className="text-earth/20 hover:text-red-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!isLoadingLeads && leads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-24 text-center text-earth/20 italic text-sm font-serif">No inquiries found in the remote database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
