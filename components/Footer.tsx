'use client';

import React from 'react';
import { Compass, PhoneCall, Mail, MapPin, ShieldCheck, QrCode } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  const tourLinks = language === 'en'
    ? [
        'Self-Drive Motorbike Tour (3D2N)',
        'Ha Giang Easy Rider Tour (3D2N)',
        'Family VIP Limousine Tour (3D2N)',
        'Ma Pi Leng Trekking & Nho Que Kayak (2D1N)',
        'Motorbike Rental & Protective Gear',
      ]
    : [
        'Tour Tự Lái Xe Máy (3N2Đ)',
        'Tour Hà Giang Easy Rider (3N2Đ)',
        'Tour Limousine Nghỉ Dưỡng Gia Đình',
        'Trekking Mã Pí Lèng & Kayak Sông Nho Quế',
        'Cho Thuê Xe Côn Tay & Giáp Bảo Hộ',
      ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                HÀ GIANG LOOP
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footerCompanyName')}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/40 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{t('footerLicense')}</span>
            </div>
          </div>

          {/* Col 2: Locations & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'en' ? 'Offices & Pickups' : 'Văn Phòng & Điểm Đón'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">{t('footerHeadquarters')}</strong> {t('footerHeadquartersAddr')}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">{t('footerHanoiBranch')}</strong> {t('footerHanoiBranchAddr')}
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline 24/7: <strong className="text-white">0988.333.888</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Email: contact@hagiangloop.vn</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('footerRoutesTitle')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {tourLinks.map((label, idx) => (
                <li key={idx}>
                  <a href="#tours" className="hover:text-emerald-400 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Payment Partners */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <QrCode className="w-4 h-4 text-emerald-400" />
              {t('footerPaymentTitle')}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footerPaymentDesc')}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-center">
                <span className="text-xs font-black text-emerald-400 tracking-wider">VietQR</span>
                <span className="text-[10px] text-slate-400 font-medium">Napas 24/7</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-center">
                <span className="text-xs font-black text-blue-400 tracking-wider">PayOS</span>
                <span className="text-[10px] text-slate-400 font-medium">Payment Gateway</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-center">
                <span className="text-xs font-black text-amber-400 tracking-wider">MB Bank</span>
                <span className="text-[10px] text-slate-400 font-medium">Banking Partner</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-center">
                <span className="text-xs font-black text-white tracking-wider">Visa / MC</span>
                <span className="text-[10px] text-slate-400 font-medium">International</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {t('footerCopyright')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">{t('footerPrivacy')}</a>
            <a href="#" className="hover:text-slate-400 transition-colors">{t('footerTerms')}</a>
            <a href="#" className="hover:text-slate-400 transition-colors">{t('footerRefund')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
