'use client';

import React from 'react';
import { Calendar, SunMedium, CloudRain, Sparkles, CheckCircle2, Luggage, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SEASONS_DATA, CHECKLIST_ITEMS } from '@/data/translations';

const SEASON_STYLES = [
  {
    icon: SunMedium,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    icon: Sparkles,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
  },
  {
    icon: Calendar,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  {
    icon: CloudRain,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
];

export default function GuideSection() {
  const { t, language } = useLanguage();
  const seasons = SEASONS_DATA[language];
  const checklist = CHECKLIST_ITEMS[language];

  return (
    <section id="guide" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200">
            {t('guideTag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            {t('guideTitle')}
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            {t('guideSubtitle')}
          </p>
        </div>

        {/* 4 Seasons Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {seasons.map((season, idx) => {
            const style = SEASON_STYLES[idx] || SEASON_STYLES[0];
            const Icon = style.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${style.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    {season.period}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {season.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {season.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Comparative Checklist */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block mb-2">
              {t('checklistHeaderTag')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('checklistHeaderTitle')}
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              {t('checklistHeaderSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: Organizer provided */}
            <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-7 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-extrabold text-emerald-300">
                      {t('col1Heading')}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {t('col1Sub')}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {checklist.organizer.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <span>{t('col1Note')}</span>
              </div>
            </div>

            {/* Column 2: Traveler bring */}
            <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-7 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Luggage className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-extrabold text-amber-300">
                      {t('col2Heading')}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {t('col2Sub')}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {checklist.traveler.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-amber-300 font-medium flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{t('col2Note')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
