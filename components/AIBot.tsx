
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const AIBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Welcome to Serenity Assistant! I am here to help you discover the wonders of Siyam World Maldives. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are a luxury travel assistant for Maldives Serenity Travels, an official partner of Siyam World Maldives.
          Siyam World is a 24-hour premium WOW! All-Inclusive resort in Noonu Atoll. 
          Key Features: 54 hectares, 16 villa categories, overwater slides, 18 restaurants/bars, Maldives' first go-kart track, horse ranch.
          Tone: Elegant, helpful, exclusive. Promote Maldives Serenity Travels as the best way to book.`,
        }
      });

      const botText = response.text || "I apologize, but I am having trouble connecting. Please try again or contact us via WhatsApp.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "Something went wrong. Please reach out to our team directly via WhatsApp for immediate assistance." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen ? (
        <div className="bg-bone w-[320px] md:w-[380px] h-[500px] shadow-2xl flex flex-col border border-earth/10 animate-slide-up overflow-hidden">
          <div className="bg-earth p-5 flex justify-between items-center">
            <div>
              <div className="text-bone text-[10px] font-black uppercase tracking-widest">Serenity Assistant</div>
              <div className="text-sand text-[8px] uppercase tracking-widest mt-1">Siyam World Expert</div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-bone/50 hover:text-bone">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-bone custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-[11px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-earth text-bone' : 'bg-white text-earth border border-earth/5'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-earth/5 p-4 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-sand rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-sand rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-sand rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t border-earth/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Siyam World..."
                className="flex-1 bg-bone px-4 py-3 text-[11px] font-medium outline-none text-earth placeholder-earth/40"
              />
              <button onClick={handleSend} disabled={isLoading} className="bg-earth text-bone p-3 hover:bg-sand transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-earth text-bone rounded-full flex items-center justify-center shadow-2xl ring-4 ring-sand/20 hover:scale-105 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
};

export default AIBot;
