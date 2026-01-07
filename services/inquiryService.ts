import { InquiryData, InquiryLead } from '../types.ts';

/**
 * CONFIGURATION
 * Note: Replace SUPABASE_URL with your actual Supabase project URL.
 * The API key provided is sb_publishable_1cfPo0FZkVbdwR4_8N_s8g_8kwrZJKw.
 */
const SUPABASE_URL = 'https://your-project-id.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_1cfPo0FZkVbdwR4_8N_s8g_8kwrZJKw';

// EmailJS Configuration (Required for sending actual emails)
const EMAILJS_SERVICE_ID = 'service_siyam';
const EMAILJS_TEMPLATE_ADMIN = 'template_admin_notify';
const EMAILJS_TEMPLATE_USER = 'template_user_welcome';
const EMAILJS_PUBLIC_KEY = 'your-emailjs-public-key';

export const inquiryService = {
  // Database: Save lead to Supabase via REST API
  saveInquiry: async (data: InquiryData): Promise<InquiryLead> => {
    const newLead: InquiryLead = {
      ...data,
      id: `lead_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: 'new',
      source: 'google-ads'
    };

    // Helper to backup data locally if the remote database fails
    const backupLocally = () => {
      try {
        const existing = inquiryService.getLocalBackups();
        localStorage.setItem('backup_leads', JSON.stringify([newLead, ...existing]));
      } catch (err) {
        console.error('Fail-safe local storage backup failed:', err);
      }
    };

    try {
      // 1. Attempt to save to Supabase
      // If SUPABASE_URL is invalid (e.g., placeholder), this will throw "Failed to fetch"
      const dbResponse = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(newLead)
      });

      if (!dbResponse.ok) {
        throw new Error(`DB Connection Issue: ${dbResponse.statusText}`);
      }

      // 2. Trigger Email Notifications (non-blocking for the user)
      inquiryService.sendEmailNotifications(newLead).catch(err => 
        console.warn('Notification dispatch delayed:', err)
      );

      return newLead;
    } catch (error) {
      // Log the error but DO NOT throw. Procedural fallback ensures conversion is captured.
      console.warn('Inquiry Storage Warning (Network/DB Connection):', error);
      
      // Save locally so the lead isn't lost
      backupLocally();
      
      // Return the lead anyway to trigger the Thank You page/onSuccess flow.
      // This is crucial for Google Ads conversion optimization (avoiding bounce on error).
      return newLead;
    }
  },

  // Email: Dispatch via EmailJS API
  sendEmailNotifications: async (lead: InquiryLead) => {
    const commonParams = {
      user_name: lead.name,
      user_email: lead.email,
      user_phone: lead.phone,
      check_in: lead.checkIn,
      check_out: lead.checkOut,
      villa_type: lead.selectedVillaId?.replace(/-/g, ' ').toUpperCase(),
      notes: lead.notes || 'None',
      pax: `${lead.adults} Adults, ${lead.children} Children`
    };

    try {
      // Send to Admin Notification
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ADMIN,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: { ...commonParams }
        })
      });

      // Send to Guest Auto-Responder
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_USER,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: { ...commonParams }
        })
      });
    } catch (e) {
      console.error('Email service currently unavailable:', e);
    }
  },

  // CMS: Fetch all leads from live database
  getAllLeads: async (): Promise<InquiryLead[]> => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*&order=timestamp.desc`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      return response.ok ? await response.json() : inquiryService.getLocalBackups();
    } catch {
      return inquiryService.getLocalBackups();
    }
  },

  getLocalBackups: (): InquiryLead[] => {
    try {
      const data = localStorage.getItem('backup_leads');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  updateLeadStatus: async (id: string, status: InquiryLead['status']) => {
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
      console.error('Update operation failed:', e);
    }
  },

  deleteLead: async (id: string) => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
    } catch (e) {
      console.error('Delete operation failed:', e);
    }
  }
};