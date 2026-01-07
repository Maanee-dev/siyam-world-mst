
import { InquiryData, InquiryLead } from '../types.ts';

/**
 * CONFIGURATION
 * Note: To use a remote database, create a Supabase project and update these values.
 */
const SUPABASE_URL = 'https://gkhhuoorczwhblthknjm.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_1cfPo0FZkVbdwR4_8N_s8g_8kwrZJKw';

const isPlaceholder = () => SUPABASE_URL.includes('your-project-id');

export const inquiryService = {
  // Helper: Get local backups
  getLocalLeads: (): InquiryLead[] => {
    try {
      const data = localStorage.getItem('serenity_leads');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Helper: Save local leads
  saveLocalLeads: (leads: InquiryLead[]) => {
    try {
      localStorage.setItem('serenity_leads', JSON.stringify(leads));
    } catch (err) {
      console.error('LocalStorage write error:', err);
    }
  },

  // Database: Save lead
  saveInquiry: async (data: InquiryData): Promise<InquiryLead> => {
    const newLead: InquiryLead = {
      ...data,
      id: `lead_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: 'new',
      source: 'google-ads'
    };

    // 1. Always save locally first (Reliability First)
    const localLeads = inquiryService.getLocalLeads();
    inquiryService.saveLocalLeads([newLead, ...localLeads]);

    // 2. Attempt to save to Supabase if not placeholder
    if (!isPlaceholder()) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newLead)
        });
      } catch (error) {
        console.warn('Remote sync failed, using local copy:', error);
      }
    }

    return newLead;
  },

  // CMS: Fetch all leads (Hybrid Remote + Local)
  getAllLeads: async (): Promise<InquiryLead[]> => {
    let remoteLeads: InquiryLead[] = [];
    
    if (!isPlaceholder()) {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*&order=timestamp.desc`, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        if (response.ok) {
          remoteLeads = await response.json();
        }
      } catch (err) {
        console.warn('Could not fetch remote leads:', err);
      }
    }

    const localLeads = inquiryService.getLocalLeads();
    
    // Merge and Deduplicate (prefer remote status if it exists)
    const leadMap = new Map<string, InquiryLead>();
    localLeads.forEach(l => leadMap.set(l.id, l));
    remoteLeads.forEach(l => leadMap.set(l.id, l));

    return Array.from(leadMap.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  // CMS: Update Status
  updateLeadStatus: async (id: string, status: InquiryLead['status']) => {
    // Update Local
    const local = inquiryService.getLocalLeads();
    const updatedLocal = local.map(l => l.id === id ? { ...l, status } : l);
    inquiryService.saveLocalLeads(updatedLocal);

    // Update Remote
    if (!isPlaceholder()) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        });
      } catch (e) {
        console.error('Remote update failed:', e);
      }
    }
  },

  // CMS: Delete
  deleteLead: async (id: string) => {
    // Delete Local
    const local = inquiryService.getLocalLeads();
    inquiryService.saveLocalLeads(local.filter(l => l.id !== id));

    // Delete Remote
    if (!isPlaceholder()) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}`, {
          method: 'DELETE',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
      } catch (e) {
        console.error('Remote delete failed:', e);
      }
    }
  }
};
