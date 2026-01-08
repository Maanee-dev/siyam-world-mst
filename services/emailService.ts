
import { InquiryData } from '../types.ts';

/**
 * EMAIL SERVICE
 * To enable real emails, sign up at emailjs.com (free tier available)
 * and replace the placeholders below.
 */
const EMAILJS_SERVICE_ID = 'service_serenity';
const EMAILJS_TEMPLATE_GUEST = 'template_guest_welcome';
const EMAILJS_TEMPLATE_ADMIN = 'template_admin_lead';
const EMAILJS_PUBLIC_KEY = 'user_xxxxxxxxxxxxxx';

export const emailService = {
  /**
   * Sends notifications to both guest and admin
   */
  sendNotifications: async (data: InquiryData) => {
    console.log('Initiating email dispatch for lead:', data.email);

    // In a production environment with EmailJS configured:
    /*
    try {
      const guestEmail = fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_GUEST,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            guest_name: data.name,
            guest_email: data.email,
            villa_choice: data.selectedVillaId,
            dates: `${data.checkIn} to ${data.checkOut}`
          }
        })
      });

      const adminEmail = fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ADMIN,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            admin_email: 'info@maldives-serenitytravels.com',
            lead_name: data.name,
            lead_phone: data.phone,
            lead_email: data.email,
            lead_notes: data.notes,
            villa: data.selectedVillaId
          }
        })
      });

      await Promise.all([guestEmail, adminEmail]);
    } catch (err) {
      console.error('Email dispatch failed:', err);
    }
    */

    // For now, we simulate the 1.5s network latency for visual feedback
    return new Promise((resolve) => setTimeout(resolve, 1500));
  }
};
