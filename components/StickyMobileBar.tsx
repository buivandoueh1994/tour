'use client';

import React from 'react';
import { PhoneCall, Ticket } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useLanguage } from '@/context/LanguageContext';
import { TOURS_DATA } from '@/data/tours';
import { getLocalizedTour } from '@/lib/utils';

export default function StickyMobileBar() {
  const { openBookingModal } = useBooking();
  const { t, language } = useLanguage();

  const handleBookNow = () => {
    // Open booking modal for the featured best seller tour for fastest conversion
    const featuredTour = TOURS_DATA.find((t) => t.id === 'hg-loop-tu-lai-3n2d') || TOURS_DATA[0];
    if (featuredTour) {
      openBookingModal(getLocalizedTour(featuredTour, language), 'book');
    } else {
      const el = document.getElementById('tours');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside aria-label="Mobile Action Bar" className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a
          href="https://zalo.me/0988333888"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-slate-300 bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-xs shadow-sm transition-all"
        >
          <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{t('stickyCall')}</span>
        </a>
        <button
          onClick={handleBookNow}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 active:from-amber-600 active:to-orange-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/25 transition-all"
        >
          <Ticket className="w-4 h-4 shrink-0" />
          <span>{t('stickyBook')}</span>
        </button>
      </div>
    </aside>
  );
}
