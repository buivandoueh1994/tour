'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, PhoneCall, CalendarCheck, Menu, X, ShieldCheck, MapPin } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

interface NavbarProps {
  onOpenMyBookings?: () => void;
}

export default function Navbar({ onOpenMyBookings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { recentOrders } = useBooking();

  const pendingCount = recentOrders.filter((o) => o.status === 'PENDING').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
      {/* Top Banner Thông Báo */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Bảo hiểm du lịch 100% cho mọi hành trình
            </span>
            <span className="text-emerald-400">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Khởi hành hàng ngày từ TP Hà Giang & Hà Nội
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Hỗ trợ khẩn cấp 24/7:</span>
            <a href="tel:0988333888" className="font-bold text-white hover:underline flex items-center gap-1">
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Compass className="w-7 h-7 animate-spin-slow" />
            </div>
            <div>
              <div className="font-black text-xl tracking-tight text-stone-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                <span>HÀ GIANG</span>
                <span className="px-1.5 py-0.5 text-xs bg-amber-500 text-white rounded font-bold uppercase tracking-wider">
                  Loop
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium tracking-wide">
                Bản địa • Độc bản • An toàn
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-700">
            <a href="#tours" className="hover:text-emerald-600 transition-colors">
              Danh Sách Tour
            </a>
            <a href="#highlights" className="hover:text-emerald-600 transition-colors">
              Điểm Nổi Bật
            </a>
            <a href="#guide" className="hover:text-emerald-600 transition-colors">
              Cẩm Nang Loop
            </a>
            <a href="#reviews" className="hover:text-emerald-600 transition-colors">
              Đánh Giá
            </a>
            <a href="#faq" className="hover:text-emerald-600 transition-colors">
              Hỏi Đáp
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* My Bookings Button */}
            {onOpenMyBookings && (
              <button
                onClick={onOpenMyBookings}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-stone-700 hover:text-emerald-700 hover:bg-stone-100 transition-colors text-sm font-medium border border-stone-200"
                title="Đơn đặt tour của tôi"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <span>Đơn của tôi</span>
                {recentOrders.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
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
              href="tel:0988333888"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>0988.333.888</span>
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
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <a
            href="#tours"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-stone-800 hover:text-emerald-600"
          >
            Danh Sách Tour
          </a>
          <a
            href="#highlights"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-stone-800 hover:text-emerald-600"
          >
            Điểm Nổi Bật
          </a>
          <a
            href="#guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-stone-800 hover:text-emerald-600"
          >
            Cẩm Nang Phượt
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-stone-800 hover:text-emerald-600"
          >
            Đánh Giá Khách Hàng
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-stone-800 hover:text-emerald-600"
          >
            Câu Hỏi Thường Gặp
          </a>

          {onOpenMyBookings && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="w-full flex items-center justify-between py-2 text-base font-semibold text-emerald-700"
            >
              <span className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" />
                Đơn đặt tour của tôi
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full font-bold">
                {recentOrders.length} đơn
              </span>
            </button>
          )}

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <a
              href="tel:0988333888"
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-center flex items-center justify-center gap-2 shadow"
            >
              <PhoneCall className="w-4 h-4" /> Gọi Ngay: 0988.333.888
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
