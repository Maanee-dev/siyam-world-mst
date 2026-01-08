
import React, { useState, useEffect } from 'react';
import { AppContent, InquiryLead, VillaItem } from '../types.ts';
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

  const updateBranding = (field: keyof AppContent['siteBranding'], value: string) => {
    setLocalContent({
      ...localContent,
      siteBranding: { ...localContent.siteBranding, [field]: value }
    });
  };

  const updateHero = (index: number, value: string) => {
    const newHero = [...localContent.heroAssets];
    newHero[index] = { ...newHero[index], src: value };
    setLocalContent({ ...localContent, heroAssets: newHero });
  };

  const updateVillaDetail = (id: string, field: keyof VillaItem, value: any) => {
    const newVillas = localContent.villas.map(v => v.id === id ? { ...v, [field]: value } : v);
    setLocalContent({ ...localContent, villas: newVillas });
  };

  const handleStatusChange = async (id: string, newStatus: InquiryLead['status']) => {
    await inquiryService.updateLeadStatus(id, newStatus);
    refreshLeads();
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm('Permanently delete this lead?')) {
      await inquiryService.deleteLead(id);
      refreshLeads();
    }
  };

  return (
    <div className="pt-32 pb-24 bg-bone min-h-screen px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-earth/10 pb-8 gap-6">
          <div>
            <h1 className="text-4xl font-serif text-earth mb-2 italic tracking-tight">Partner Portal</h1>
            <div className="flex gap-8 mt-6">
              <button 
                onClick={() => setActiveTab('content')}
                className={`text-[10px] uppercase tracking-[0.4em] font-black pb-4 border-b-2 transition-all ${activeTab === 'content' ? 'border-earth text-earth' : 'border-transparent text-earth/30'}`}
              >
                Visual & Text Content
              </button>
              <button 
                onClick={() => setActiveTab('leads')}
                className={`text-[10px] uppercase tracking-[0.4em] font-black pb-4 border-b-2 transition-all ${activeTab === 'leads' ? 'border-earth text-earth' : 'border-transparent text-earth/30'}`}
              >
                Leads ({leads.length})
              </button>
            </div>
          </div>
          {activeTab === 'content' && (
            <div className="flex items-center gap-4">
               {status === 'saved' && <span className="text-[9px] uppercase tracking-widest font-black text-green-600 animate-pulse">Synced Successfully</span>}
               <button 
                onClick={handleSave}
                className="px-10 py-5 bg-earth text-bone text-[10px] uppercase tracking-widest font-black transition-all shadow-2xl hover:bg-sand"
              >
                Publish Changes
              </button>
            </div>
          )}
        </div>

        {activeTab === 'content' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 animate-fade-in">
            {/* Left Column: Branding & Copy */}
            <div className="lg:col-span-1 space-y-12">
              <section className="space-y-8">
                <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-sand border-b border-earth/5 pb-4">Site Identity</h2>
                <div className="space-y-6">
                  {[
                    { id: 'heroHeadline', label: 'Main Hero Headline' },
                    { id: 'heroSubheadline', label: 'Hero Subtext (High Intent)' },
                    { id: 'trustSignal', label: 'Trust Signal Bar (Ad Mirrors)' },
                    { id: 'primaryCTA', label: 'Primary CTA Button' },
                    { id: 'partnerName', label: 'Partner Agency Name' }
                  ].map(field => (
                    <div key={field.id} className="space-y-2">
                      <label className="text-[9px] uppercase font-bold text-earth/40">{field.label}</label>
                      <input 
                        type="text" 
                        value={localContent.siteBranding[field.id as keyof AppContent['siteBranding']]} 
                        onChange={(e) => updateBranding(field.id as any, e.target.value)}
                        className="w-full bg-white border border-earth/10 px-4 py-3 text-xs outline-none focus:border-sand"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-sand border-b border-earth/5 pb-4">Hero Media</h2>
                <div className="grid gap-3">
                  {localContent.heroAssets.map((asset, i) => (
                    <div key={i} className="bg-white p-3 border border-earth/5 shadow-sm">
                      <label className="text-[8px] uppercase font-bold text-earth/30 mb-1 block">Asset {i + 1} ({asset.type})</label>
                      <input 
                        type="text" 
                        value={asset.src} 
                        onChange={(e) => updateHero(i, e.target.value)}
                        className="w-full bg-bone px-3 py-2 text-[10px] border-none outline-none font-mono"
                        placeholder="URL"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Villa Grid */}
            <div className="lg:col-span-2 space-y-12">
              <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-sand border-b border-earth/5 pb-4">Accommodation Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {localContent.villas.map((villa) => (
                  <div key={villa.id} className="bg-white p-6 border border-earth/5 shadow-lg space-y-4">
                    <div className="aspect-[16/9] overflow-hidden bg-bone">
                      <img src={villa.image} className="w-full h-full object-cover opacity-80" alt="" />
                    </div>
                    <div className="grid gap-4">
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase font-bold text-sand">Title</label>
                        <input type="text" value={villa.title} onChange={e => updateVillaDetail(villa.id, 'title', e.target.value)} className="w-full bg-bone px-3 py-2 text-xs font-bold border-none outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase font-bold text-sand">Category</label>
                          <select value={villa.category} onChange={e => updateVillaDetail(villa.id, 'category', e.target.value)} className="w-full bg-bone px-3 py-2 text-xs border-none outline-none">
                            <option value="Beach">Beach</option>
                            <option value="Water">Water</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase font-bold text-sand">Size</label>
                          <input type="text" value={villa.size} onChange={e => updateVillaDetail(villa.id, 'size', e.target.value)} className="w-full bg-bone px-3 py-2 text-xs border-none outline-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] uppercase font-bold text-sand">Image URL</label>
                        <input type="text" value={villa.image} onChange={e => updateVillaDetail(villa.id, 'image', e.target.value)} className="w-full bg-bone px-3 py-2 text-[10px] border-none outline-none font-mono" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in space-y-8">
            <div className="flex justify-between items-center bg-white p-6 border border-earth/5 shadow-sm">
               <div className="text-[10px] uppercase tracking-widest font-black text-earth">
                 {isLoadingLeads ? 'Connecting...' : `Lead Source: Supabase Realtime (${leads.length} Records)`}
               </div>
               <button onClick={refreshLeads} className="px-6 py-2 bg-bone border border-earth/5 text-[9px] uppercase tracking-widest font-black">Refresh Leads</button>
            </div>

            <div className="overflow-hidden bg-white border border-earth/5 shadow-2xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-bone border-b border-earth/5">
                    {['Guest', 'Dates & Villa', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-sand">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth/5">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-bone/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="text-sm font-bold text-earth">{lead.name}</div>
                        <div className="text-[11px] opacity-60">{lead.email}</div>
                        <div className="text-[11px] opacity-60">{lead.phone}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-xs font-bold text-earth">{lead.checkIn} → {lead.checkOut}</div>
                        <div className="text-[10px] uppercase font-black text-sand mt-1">{lead.selectedVillaId?.replace(/-/g, ' ')}</div>
                      </td>
                      <td className="px-8 py-6">
                        <select 
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                          className="text-[10px] font-black uppercase bg-white border border-earth/10 px-3 py-2 outline-none"
                        >
                          <option value="new">NEW</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="booked">BOOKED</option>
                        </select>
                      </td>
                      <td className="px-8 py-6">
                        <button onClick={() => handleDeleteLead(lead.id)} className="text-earth/20 hover:text-red-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && !isLoadingLeads && (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-earth/30 italic text-sm">No inquiries recorded yet.</td>
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
