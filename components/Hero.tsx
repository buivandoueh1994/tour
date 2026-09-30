'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Award, Users, QrCode, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const stats = [
    { value: '15,000+', label: t('statTravelersLabel') },
    { value: '100%', label: t('statInsuranceLabel') },
    { value: '4.9/5 ★', label: t('statRatingLabel') },
    { value: '24/7', label: t('statRescueLabel') },
  ];

  return (
    <>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=2000&q=85"
            alt="Hà Giang Loop Đèo Mã Pí Lèng"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 filter brightness-70 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
          {/* Top Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg">
            <span>{t('heroBadge')}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.18] max-w-5xl mb-6">
            {t('heroTitlePrefix')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              {t('heroTitleHighlight')}
            </span>
            <br />
            {t('heroTitleSuffix')}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-3xl font-normal leading-relaxed mb-10 text-balance">
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            <a
              href="#tours"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-amber-500/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <span>{t('heroCtaTours')}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://zalo.me/0988333888"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-base flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 text-amber-300" />
              <span>{t('heroCtaZalo')}</span>
            </a>
          </div>

          {/* Trust Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-200 font-medium pt-4 border-t border-white/10 w-full max-w-4xl">
            <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('trustInsurance')}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t('trustBikes')}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <Users className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{t('trustDrivers')}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('trustQr')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Metrics Counter Cards */}
      <section className="bg-slate-50 py-8 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center flex flex-col justify-center items-center"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-800 tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
