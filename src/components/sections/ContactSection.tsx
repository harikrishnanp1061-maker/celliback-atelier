import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, MessageSquare, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { sounds } from '../../lib/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    sounds.playChime();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        topic: 'General Inquiry',
        message: '',
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 500);
  };

  return (
    <section id="contact" className="py-14 lg:py-18 relative overflow-hidden bg-[#F4ECE3] border-b border-[#E8DDD2]">
      
      {/* Decorative Ribbon Dividing Line at Top */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E88998]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        
        {/* Section Header */}
        <div className="max-w-xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8DDD2] text-xs font-semibold tracking-wider uppercase text-[#5C5455] mb-2.5">
            <MessageSquare className="w-3 h-3 text-[#C86D7A]" />
            <span>Atelier Concierge & Support</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1A1B] tracking-tight leading-snug font-serif">
            Direct dialogue with our{' '}
            <span className="italic text-[#C86D7A] font-normal">
              studio & makers.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#5C5455] mt-1.5 font-normal leading-relaxed">
            Whether inquiring about case sizing, tracking international dispatch, or reserving bridal monograms, our concierge desk responds within 4 business hours.
          </p>
        </div>

        {/* Contact Layout: Info Pillars + Quick Note Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Contact Channels Dossier (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            
            {/* VIP Concierge Desk */}
            <div className="ceramic-panel rounded-2xl p-4 sm:p-5 border border-[#E8DDD2]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FCECEF] flex items-center justify-center text-[#1F1A1B]">
                  <Mail className="w-4 h-4 text-[#C86D7A]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F1A1B] font-display">
                    Private Concierge Desk
                  </h3>
                  <p className="text-[11px] text-[#8A8182]">Orders, care advice & fittings</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="text-[#5C5455]">
                  Direct Email:{' '}
                  <a
                    href="mailto:concierge@celliback.com"
                    className="font-semibold text-[#1F1A1B] underline hover:text-[#C86D7A] transition-colors"
                  >
                    concierge@celliback.com
                  </a>
                </p>
                <p className="text-[#5C5455] text-[11px]">
                  Response window: <span className="font-semibold text-[#1F1A1B]">Under 4 business hours</span>
                </p>
              </div>
            </div>

            {/* Telephone & Studio Hours */}
            <div className="ceramic-panel rounded-2xl p-4 sm:p-5 border border-[#E8DDD2]">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FCECEF] flex items-center justify-center text-[#1F1A1B]">
                  <Phone className="w-4 h-4 text-[#C86D7A]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F1A1B] font-display">
                    Headquarters Voice Line
                  </h3>
                  <p className="text-[11px] text-[#8A8182]">Direct atelier voice assistance</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-[#5C5455]">
                  North America:{' '}
                  <a
                    href="tel:+18008422355"
                    className="font-semibold text-[#1F1A1B] hover:text-[#C86D7A] transition-colors"
                  >
                    +1 (800) 842-CELLI
                  </a>
                </p>
                <p className="text-[#5C5455]">
                  Japan & Asia:{' '}
                  <a
                    href="tel:+81354128920"
                    className="font-semibold text-[#1F1A1B] hover:text-[#C86D7A] transition-colors"
                  >
                    +81 3-5412-8920
                  </a>
                </p>
                <div className="flex items-center gap-1.5 pt-1.5 text-[11px] text-[#8A8182] border-t border-[#E8DDD2]/70">
                  <Clock className="w-3 h-3 text-[#C86D7A]" />
                  <span>Mon–Fri: 9:00 AM – 7:00 PM (Local time)</span>
                </div>
              </div>
            </div>

            {/* Bespoke Partnerships & Press */}
            <div className="ceramic-panel rounded-2xl p-4 sm:p-5 border border-[#E8DDD2]">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-[#FCECEF] flex items-center justify-center text-[#1F1A1B]">
                  <Sparkles className="w-4 h-4 text-[#C86D7A]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F1A1B] font-display">
                    Bespoke Monogram & Press
                  </h3>
                  <p className="text-[11px] text-[#8A8182]">Bridal suites & editorial loans</p>
                </div>
              </div>

              <p className="text-[11px] text-[#5C5455] leading-relaxed">
                For custom bridal runs or stylist sample loans for Paris/Tokyo fashion shoots, email{' '}
                <a
                  href="mailto:bespoke@celliback.com"
                  className="font-semibold text-[#1F1A1B] underline hover:text-[#C86D7A]"
                >
                  bespoke@celliback.com
                </a>.
              </p>
            </div>

          </div>

          {/* Right: Interactive Concierge Note Form (7 cols) */}
          <div className="lg:col-span-7 ceramic-panel rounded-2xl p-5 sm:p-7 border border-[#E8DDD2] relative shadow-2xs">
            
            <div className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86D7A]">
                Transmission Channel
              </span>
              <h3 className="text-lg font-light text-[#1F1A1B] font-serif mt-0.5">
                Transmit a note to our concierge.
              </h3>
            </div>

            {isSubmitted ? (
              <div className="py-8 px-4 rounded-xl bg-[#FAF4ED] border border-[#E8DDD2] text-center flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#1F1A1B] text-[#FFFDF9] flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-5 h-5 text-[#C86D7A]" />
                </div>
                <h4 className="text-sm font-bold text-[#1F1A1B] font-display mb-0.5">
                  Message Transmitted Successfully
                </h4>
                <p className="text-[11px] text-[#5C5455] max-w-xs leading-relaxed">
                  Thank you for writing. A concierge will follow up within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1F1A1B] mb-1 uppercase tracking-wider">
                      Your Name <span className="text-[#C86D7A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#FAF4ED] border border-[#E8DDD2] text-xs text-[#1F1A1B] placeholder-[#8A8182] focus:bg-white focus:outline-none focus:ring-1.5 focus:ring-[#C86D7A] shadow-[inset_0_2px_5px_rgba(31,26,27,0.06),0_1px_2px_rgba(255,255,255,0.7)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1F1A1B] mb-1 uppercase tracking-wider">
                      Email Address <span className="text-[#C86D7A]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@example.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-[#FAF4ED] border border-[#E8DDD2] text-xs text-[#1F1A1B] placeholder-[#8A8182] focus:bg-white focus:outline-none focus:ring-1.5 focus:ring-[#C86D7A] shadow-[inset_0_2px_5px_rgba(31,26,27,0.06),0_1px_2px_rgba(255,255,255,0.7)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1F1A1B] mb-1 uppercase tracking-wider">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF4ED] border border-[#E8DDD2] text-xs text-[#1F1A1B] focus:bg-white focus:outline-none focus:ring-1.5 focus:ring-[#C86D7A] shadow-[inset_0_2px_5px_rgba(31,26,27,0.06),0_1px_2px_rgba(255,255,255,0.7)] transition-all cursor-pointer"
                  >
                    <option value="General Inquiry">General Atelier Inquiry</option>
                    <option value="Order Tracking">Order & Dispatch Status</option>
                    <option value="Bespoke Charm Monogramming">Bespoke Charm / Monogram Fitting</option>
                    <option value="Flagship Boutique Visit">Flagship Boutique Appointment</option>
                    <option value="Press & Stylist Loans">Press & Stylist Editorial Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1F1A1B] mb-1 uppercase tracking-wider">
                    Message Details <span className="text-[#C86D7A]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your phone model or questions…"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#FAF4ED] border border-[#E8DDD2] text-xs text-[#1F1A1B] placeholder-[#8A8182] focus:bg-white focus:outline-none focus:ring-1.5 focus:ring-[#C86D7A] resize-none"
                  />
                </div>

                <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#8A8182]">
                    <ShieldAlert className="w-3 h-3 text-[#C86D7A]" />
                    <span>Your correspondence is handled strictly under atelier privacy.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#1F1A1B] hover:bg-[#342D2F] text-[#FFFDF9] text-xs font-semibold tracking-wide transition-all duration-200 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Transmitting…' : 'Send Note'}</span>
                    <Send className="w-3 h-3 text-[#DFD5C6]" />
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
