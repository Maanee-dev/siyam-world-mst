
import React, { useState, useRef, useEffect } from 'react';
import { InquiryData, VillaItem } from '../types.ts';

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

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-12"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(year, month, day);
      const dStr = d.toISOString().split('T')[0];
      const isPast = d < today;
      const isStart = dStr === selectedStart;
      const isEnd = dStr === selectedEnd;
      const isSelected = isStart || isEnd;
      const isInRange = selectedStart && selectedEnd && d > new Date(selectedStart) && d < new Date(selectedEnd);

      days.push(
        <button
          key={day}
          type="button"
          disabled={isPast}
          onClick={() => handleDayClick(day)}
          className={`h-10 md:h-12 flex flex-col items-center justify-center text-[10px] md:text-xs font-bold transition-all relative
            ${isPast ? 'text-earth/10 cursor-not-allowed' : 'text-earth hover:bg-sand/10'}
            ${isSelected ? 'bg-earth text-bone rounded-none z-10 shadow-xl' : ''}
            ${isInRange ? 'bg-sand/10 text-earth' : ''}
          `}
        >
          <span>{day}</span>
          {isStart && !selectedEnd && <span className="absolute -top-1 text-[6px] uppercase text-sand font-black">In</span>}
          {isEnd && <span className="absolute -top-1 text-[6px] uppercase text-sand font-black">Out</span>}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="bg-white border border-earth/5 p-6 w-full animate-fade-in shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <button type="button" onClick={prevMonth} className="p-2 hover:bg-bone text-earth transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-earth">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <button type="button" onClick={nextMonth} className="p-2 hover:bg-bone text-earth transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['S','M','T','W','T','F','S'].map((day, i) => (
          <div key={i} className="text-[9px] text-earth/20 font-black pb-4 uppercase tracking-widest">{day}</div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

const InquiryForm: React.FC<InquiryFormProps> = ({ onSuccess, variant = 'embedded', preSelectedVillaId, villas }) => {
  const [step, setStep] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<InquiryData>({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    name: '',
    email: '',
    phone: '',
    notes: '',
    selectedVillaId: preSelectedVillaId || ''
  });

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectVilla = (id: string) => {
    setFormData(prev => ({ ...prev, selectedVillaId: id }));
  };

  const handleDateSelect = (start: string, end: string) => {
    setFormData(prev => ({ ...prev, checkIn: start, checkOut: end }));
  };

  const nextStep = () => {
    if (step === 1 && (!formData.checkIn || !formData.checkOut)) {
      alert("Please select both your arrival and departure dates on the calendar.");
      return;
    }
    if (step === 2 && !formData.selectedVillaId) {
      alert("Please select your preferred villa style.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please ensure all contact details are provided.");
      return;
    }
    onSuccess();
  };

  const containerClasses = variant === 'modal' 
    ? "bg-bone p-6 md:p-14 rounded-none shadow-3xl w-full h-full md:h-auto md:max-w-2xl md:max-h-[95vh] flex flex-col border border-earth/5" 
    : "bg-white p-10 md:p-16 rounded-none shadow-sm border border-earth/5 w-full flex flex-col";

  return (
    <div className={`${containerClasses} animate-slide-up no-scrollbar`}>
      <div className="mb-10 text-center shrink-0 pt-10 md:pt-0">
        <h3 className="text-4xl md:text-5xl font-serif text-earth mb-3 italic leading-tight">Bespoke Inquiry</h3>
        <p className="text-[10px] uppercase tracking-[0.5em] text-sand font-bold">Resort Partner Booking • Step {step} of 3</p>
        <div className="mt-8 flex justify-center gap-4">
           {[1,2,3].map(i => (
             <div key={i} className={`h-[2px] w-12 transition-all duration-1000 ${step >= i ? 'bg-earth' : 'bg-earth/10'}`} />
           ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col space-y-8">
        {step === 1 && (
          <div className="space-y-8 animate-fade-in flex-1 overflow-y-auto pr-2 no-scrollbar">
            <div className="space-y-6">
              <p className="text-[11px] uppercase tracking-widest text-earth/30 font-black text-center mb-4">Dates of Exploration</p>
              <CustomCalendar 
                onSelect={handleDateSelect} 
                selectedStart={formData.checkIn} 
                selectedEnd={formData.checkOut} 
              />
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-5 text-center border border-earth/5 shadow-sm">
                  <div className="text-[9px] uppercase tracking-widest text-sand mb-2 font-black">Arrival</div>
                  <div className="text-[12px] font-bold text-earth">{formData.checkIn || 'Select Date'}</div>
                </div>
                <div className="bg-white p-5 text-center border border-earth/5 shadow-sm">
                  <div className="text-[9px] uppercase tracking-widest text-sand mb-2 font-black">Departure</div>
                  <div className="text-[12px] font-bold text-earth">{formData.checkOut || 'Select Date'}</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-sand font-black">Adults</label>
                <select name="adults" value={formData.adults} onChange={handleChange} className="w-full bg-white px-6 py-5 text-[12px] font-bold outline-none border border-earth/5 text-earth focus:border-sand transition-colors">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Adults</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-sand font-black">Children</label>
                <select name="children" value={formData.children} onChange={handleChange} className="w-full bg-white px-6 py-5 text-[12px] font-bold outline-none border border-earth/5 text-earth focus:border-sand transition-colors">
                  {[0,1,2,3,4].map(n => <option key={n} value={n}>{n} Children</option>)}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="w-full py-6 bg-earth text-bone text-[11px] font-black uppercase tracking-[0.5em] hover:bg-sand transition-all shadow-2xl mt-4"
            >
              Continue to Villa Selection
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in flex-1 flex flex-col min-h-0 overflow-hidden">
            <p className="text-[11px] uppercase tracking-widest text-earth/30 font-black px-2 text-center mb-4">Select Your Villa Category</p>
            <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8">
              {/* Beach Collection */}
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-sand mb-4 border-b border-earth/5 pb-2">Beach Collection</h4>
                <div className="grid grid-cols-1 gap-3">
                  {villas.filter(v => v.category === 'Beach').map(v => (
                    <div 
                      key={v.id}
                      onClick={() => selectVilla(v.id)}
                      className={`p-5 cursor-pointer border transition-all duration-300 ${formData.selectedVillaId === v.id ? 'bg-earth text-bone border-earth shadow-lg translate-x-1' : 'bg-white text-earth border-earth/10 hover:border-sand/50'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-serif text-lg italic leading-tight">{v.title}</div>
                          <div className={`text-[9px] uppercase tracking-widest mt-1.5 font-bold ${formData.selectedVillaId === v.id ? 'text-sand' : 'text-earth/40'}`}>
                            {v.size} • Land Based Sanctuary
                          </div>
                        </div>
                        <div className={`transition-all duration-300 ${formData.selectedVillaId === v.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                           <div className="bg-sand text-earth rounded-full p-1.5">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Water Collection */}
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-sand mb-4 border-b border-earth/5 pb-2">Water Collection</h4>
                <div className="grid grid-cols-1 gap-3">
                  {villas.filter(v => v.category === 'Water').map(v => (
                    <div 
                      key={v.id}
                      onClick={() => selectVilla(v.id)}
                      className={`p-5 cursor-pointer border transition-all duration-300 ${formData.selectedVillaId === v.id ? 'bg-earth text-bone border-earth shadow-lg translate-x-1' : 'bg-white text-earth border-earth/10 hover:border-sand/50'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-serif text-lg italic leading-tight">{v.title}</div>
                          <div className={`text-[9px] uppercase tracking-widest mt-1.5 font-bold ${formData.selectedVillaId === v.id ? 'text-sand' : 'text-earth/40'}`}>
                            {v.size} • Overwater Paradise
                          </div>
                        </div>
                        <div className={`transition-all duration-300 ${formData.selectedVillaId === v.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                           <div className="bg-sand text-earth rounded-full p-1.5">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-8 shrink-0 pb-10 md:pb-0">
               <button type="button" onClick={() => setStep(1)} className="flex-1 py-6 border border-earth/20 text-earth text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white transition-colors">Back</button>
               <button type="button" onClick={nextStep} className="flex-[2] py-6 bg-earth text-bone text-[11px] font-black uppercase tracking-[0.4em] hover:bg-sand transition-all shadow-2xl">Confirm Sanctuary</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-fade-in flex-1 overflow-y-auto pr-2 no-scrollbar pt-2">
             <p className="text-[11px] uppercase tracking-widest text-earth/30 font-black text-center mb-8">Personal Details</p>
            <div className="space-y-7">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white px-8 py-6 text-[12px] font-bold tracking-widest outline-none border border-earth/10 text-earth focus:border-sand transition-all placeholder-earth/30"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white px-8 py-6 text-[12px] font-bold tracking-widest outline-none border border-earth/10 text-earth focus:border-sand transition-all placeholder-earth/30"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="WhatsApp Number (With Country Code)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white px-8 py-6 text-[12px] font-bold tracking-widest outline-none border border-earth/10 text-earth focus:border-sand transition-all placeholder-earth/30"
                  required
                />
              </div>
              <div className="relative">
                <textarea
                  name="notes"
                  placeholder="Special requests or occasions?"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-white px-8 py-6 text-[12px] font-bold tracking-widest outline-none border border-earth/10 text-earth focus:border-sand transition-all h-36 resize-none placeholder-earth/30"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col gap-5 pb-16 md:pb-0">
              <button type="submit" className="w-full py-7 bg-earth text-bone text-[12px] font-black uppercase tracking-[0.5em] hover:bg-sand transition-all shadow-3xl">Request Instant Quote</button>
              <button type="button" onClick={() => setStep(2)} className="text-[10px] uppercase tracking-[0.4em] text-earth/40 font-black py-3 hover:text-earth transition-colors">Modify Selection</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default InquiryForm;
