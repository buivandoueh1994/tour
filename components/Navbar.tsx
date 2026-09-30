'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, PhoneCall, CalendarCheck, Menu, X, ShieldCheck, MapPin } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface NavbarProps {
  onOpenMyBookings?: () => void;
}

export default function Navbar({ onOpenMyBookings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { recentOrders } = useBooking();
  const { t } = useLanguage();

  const pendingCount = recentOrders.filter((o) => o.status === 'PENDING').length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Banner Thông Báo */}
      <div className="bg-emerald-800 text-emerald-100 text-xs py-1.5 px-4 hidden md:block border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {t('topBarInsurance')}
            </span>
            <span className="text-emerald-400">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {t('topBarDeparture')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>{t('topBarEmergency')}</span>
            <a href="tel:0988333888" className="font-bold text-amber-300 hover:text-white hover:underline flex items-center gap-1 transition-colors">
              <PhoneCall className="w-3 h-3 text-amber-400" /> 0988.333.888
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <Compass className="w-7 h-7 animate-spin-slow" />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1.5">
                <span>HÀ GIANG</span>
                <span className="px-1.5 py-0.5 text-xs bg-amber-500 text-slate-950 rounded-full font-bold uppercase tracking-wider">
                  Loop
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                {t('brandSubtext')}
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#tours" className="hover:text-emerald-700 transition-colors">
              {t('navTours')}
            </a>
            <a href="#highlights" className="hover:text-emerald-700 transition-colors">
              {t('navHighlights')}
            </a>
            <a href="#guide" className="hover:text-emerald-700 transition-colors">
              {t('navGuide')}
            </a>
            <a href="#reviews" className="hover:text-emerald-700 transition-colors">
              {t('navReviews')}
            </a>
            <a href="#faq" className="hover:text-emerald-700 transition-colors">
              {t('navFaq')}
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* My Bookings Button */}
            {onOpenMyBookings && (
              <button
                onClick={onOpenMyBookings}
                className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-slate-100 transition-colors text-sm font-semibold border border-slate-200"
                title={t('myBookings')}
              >
                <CalendarCheck className="w-4 h-4 text-emerald-700" />
                <span>{t('myBookings')}</span>
                {recentOrders.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center font-bold">
                    {recentOrders.length}
                  </span>
                )}
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                )}
              </button>
            )}

            {/* Hotline Call Button */}
            <a
              href="https://zalo.me/0988333888"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-bold shadow-md shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('hotlineZalo')}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenMyBookings && recentOrders.length > 0 && (
              <button
                onClick={onOpenMyBookings}
                className="p-2 text-stone-700 hover:text-emerald-600 relative"
              >
                <CalendarCheck className="w-6 h-6 text-emerald-600" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {recentOrders.length}
                </span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {/* Language Switcher in Mobile Drawer */}
          <div className="pb-1 border-b border-slate-100">
            <LanguageSwitcher variant="drawer" />
          </div>

          <a
            href="#tours"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
          >
            {t('navTours')}
          </a>
          <a
            href="#highlights"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
          >
            {t('navHighlights')}
          </a>
          <a
            href="#guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
          >
            {t('navGuide')}
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
          >
            {t('navReviews')}
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-emerald-700"
          >
            {t('navFaq')}
          </a>

          {onOpenMyBookings && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="w-full flex items-center justify-between py-2 text-base font-semibold text-emerald-800"
            >
              <span className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" />
                {t('myBookings')}
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full font-bold">
                {recentOrders.length}
              </span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://zalo.me/0988333888"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl text-center flex items-center justify-center gap-2 shadow"
            >
              <PhoneCall className="w-4 h-4" /> {t('hotlineZalo')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
