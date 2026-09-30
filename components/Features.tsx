'use client';

import React from 'react';
import { ShieldCheck, HeartHandshake, Wrench, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: ShieldCheck,
      title: t('feat1Title'),
      desc: t('feat1Desc'),
      badge: t('feat1Badge'),
      iconColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      icon: HeartHandshake,
      title: t('feat2Title'),
      desc: t('feat2Desc'),
      badge: t('feat2Badge'),
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      icon: Wrench,
      title: t('feat3Title'),
      desc: t('feat3Desc'),
      badge: t('feat3Badge'),
      iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      icon: Sparkles,
      title: t('feat4Title'),
      desc: t('feat4Desc'),
      badge: t('feat4Badge'),
      iconColor: 'text-teal-700 bg-teal-50 border-teal-200',
    },
  ];

  return (
    <section id="highlights" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200">
            {t('featuresTag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            {t('featuresTitle')}
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.iconColor} group-hover:scale-110 transition-transform shadow-sm`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
