'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'pill' | 'compact' | 'drawer';
}

export default function LanguageSwitcher({ className = '', variant = 'pill' }: LanguageSwitcherProps) {
  const { setLanguage, isVietnamese } = useLanguage();

  if (variant === 'drawer') {
    return (
      <div className={`flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage('vi')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            isVietnamese
              ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="text-base leading-none">🇻🇳</span>
          <span>Tiếng Việt</span>
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            !isVietnamese
              ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="text-base leading-none">🇬🇧</span>
          <span>English</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center p-1 bg-slate-100/90 rounded-full border border-slate-200/80 shadow-sm ${className}`}>
      <button
        type="button"
        onClick={() => setLanguage('vi')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
          isVietnamese
            ? 'bg-white text-emerald-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        }`}
        title="Chuyển sang Tiếng Việt"
      >
        <span className="text-xs">🇻🇳</span>
        <span>VI</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
          !isVietnamese
            ? 'bg-white text-emerald-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        }`}
        title="Switch to English"
      >
        <span className="text-xs">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
