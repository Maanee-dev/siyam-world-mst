
import React, { useState, useEffect } from 'react';
import { InquiryData, VillaItem } from '../types.ts';
import { inquiryService } from '../services/inquiryService.ts';
import { emailService } from '../services/emailService.ts';

interface InquiryFormProps {
  onSuccess: () => void;
  variant?: 'embedded' | 'modal';
  preSelectedVillaId?: string;
  villas: VillaItem[];
}

const CustomCalendar = ({ onSelect, selectedStart, selectedEnd }: { 
  onSelect: (start: string, end: string) => void,
  selectedStart: string,
  selectedEnd: string
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = clickedDate.toISOString().split('T')[0];
    if (!selectedStart || (selectedStart && selectedEnd)) {
      onSelect(dateStr, '');
    } else {
      if (new Date(dateStr) < new Date(selectedStart)) {
        onSelect(dateStr, '');
      } else {
        onSelect(selectedStart, dateStr);
      }
    }
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} className="h-10"></div>);
    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(year, month, day);
      const dStr = d.toISOString().split('T')[0];
      const isPast = d < today;
      const isSelected = dStr === selectedStart || dStr === selectedEnd;
      const isInRange = selectedStart && selectedEnd && d > new Date(selectedStart) && d < new Date(selectedEnd);
      days.push(
        <button
          key={day} type="button" disabled={isPast} onClick={() => handleDayClick(day)}
          className={`h-10 flex flex-col items-center justify-center text-[10px] font-bold transition-all relative ${isPast ? 'text-earth/10' : 'text-earth hover:bg-sand/10'} ${isSelected ? 'bg-earth text-bone' : ''} ${isInRange ? 'bg-sand/10' : ''}`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="bg-white border border-earth/5 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <button type="button" onClick={prevMonth} className="p-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" /></svg></button>
        <h4 className="text-[10px] uppercase tracking-widest font-black">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h4>
        <button type="button" onClick={nextMonth} className="p-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" /></svg></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-[9px] font-black opacity-30 uppercase mb-2">
        {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-center">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};

const InquiryForm: React.FC<InquiryFormProps> = ({ onSuccess, preSelectedVillaId, villas }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<InquiryData>({
    checkIn: '', checkOut: '', adults: 2, children: 0,
    name: '', email: '', phone: '', notes: '',
    selectedVillaId: preSelectedVillaId || ''
  });

  // Sync pre-selected villa if prop changes
  useEffect(() => {
    if (preSelectedVillaId) {
      setFormData(prev => ({ ...prev, selectedVillaId: preSelectedVillaId }));
    }
  }, [preSelectedVillaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) return setStep(2);
    setIsSubmitting(true);
    try {
      await inquiryService.saveInquiry(formData);
      await emailService.sendNotifications(formData);
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 md:p-12 space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${step >= 1 ? 'bg-earth text-bone' : 'bg-bone text-earth/20 border'}`}>01</div>
          <div className="h-px flex-1 bg-earth/10"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${step === 2 ? 'bg-earth text-bone' : 'bg-bone text-earth/20 border'}`}>02</div>
        </div>
        <h2 className="text-3xl font-serif text-earth">{step === 1 ? 'Plan Your Stay' : 'Guest Details'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 ? (
          <div className="space-y-8 animate-fade-in">
            {/* Villa Selection - Added for clarity in the funnel */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-black text-sand block">Accommodation Preference</label>
              <select 
                value={formData.selectedVillaId} 
                onChange={e => setFormData(prev => ({ ...prev, selectedVillaId: e.target.value }))}
                className="w-full bg-bone border border-earth/10 px-5 py-4 text-xs font-medium outline-none focus:border-sand appearance-none cursor-pointer"
              >
                <option value="">Let us recommend the best villa</option>
                {villas.map(v => (
                  <option key={v.id} value={v.id}>{v.title} ({v.category})</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-black text-sand">Select Your Dates</label>
              <CustomCalendar 
                selectedStart={formData.checkIn} selectedEnd={formData.checkOut}
                onSelect={(start, end) => setFormData(prev => ({ ...prev, checkIn: start, checkOut: end }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[9px] uppercase tracking-widest font-black text-sand block mb-2">Adults</label>
                <select value={formData.adults} onChange={e => setFormData(prev => ({ ...prev, adults: +e.target.value }))} className="w-full bg-white border border-earth/10 px-4 py-3 text-xs outline-none focus:border-sand transition-all">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-widest font-black text-sand block mb-2">Children</label>
                <select value={formData.children} onChange={e => setFormData(prev => ({ ...prev, children: +e.target.value }))} className="w-full bg-white border border-earth/10 px-4 py-3 text-xs outline-none focus:border-sand transition-all">
                  {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-white border border-earth/10 px-5 py-4 text-xs outline-none focus:border-sand" />
              <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-white border border-earth/10 px-5 py-4 text-xs outline-none focus:border-sand" />
            </div>
            <input required type="tel" placeholder="WhatsApp Number" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="w-full bg-white border border-earth/10 px-5 py-4 text-xs outline-none focus:border-sand" />
            <textarea placeholder="Any special requests or notes?" rows={3} value={formData.notes} onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))} className="w-full bg-white border border-earth/10 px-5 py-4 text-xs outline-none focus:border-sand" />
          </div>
        )}

        <button 
          disabled={isSubmitting || (step === 1 && (!formData.checkIn || !formData.checkOut))}
          className="w-full py-6 bg-earth text-bone text-[11px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-sand transition-all disabled:opacity-30 flex items-center justify-center gap-4"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-bone/30 border-t-bone rounded-full animate-spin"></div>
              <span>Dispatching Data...</span>
            </>
          ) : (step === 1 ? 'Continue' : 'Request Instant Quote')}
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
