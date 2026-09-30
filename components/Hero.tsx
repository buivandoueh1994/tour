'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Star, Award, Users, CheckCircle2 } from 'lucide-react';
import { HIGHLIGHTS_STATS } from '@/data/tours';

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85"
          alt="Hà Giang Loop Đèo Mã Pí Lèng"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/30" />
        <div className="absolute inset-0 bg-radial-gradient opacity-40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg animate-fade-in">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>Top 1 Đơn Vị Tổ Chức Tour Hà Giang Loop Bản Địa Uy Tín</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mb-6">
          Chinh Phục{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
            Hà Giang Loop
          </span>
          <br />
          Mảnh Đất Địa Đầu Tổ Quốc
        </h1>

        {/* Subtitle */}
        <p className="text-stone-300 text-base sm:text-xl max-w-2xl font-light leading-relaxed mb-10">
          Uốn lượn qua những khúc cua hiểm trở, đứng trên đỉnh đèo Mã Pí Lèng nghìn trượng và thả hồn giữa dòng sông Nho Quế màu xanh ngọc bích. Trải nghiệm một lần trong đời!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <a
            href="#tours"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-base sm:text-lg shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <span>Xem Danh Sách Tour</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="https://zalo.me/0988333888"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-base flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <span>Tư Vấn Zalo 24/7</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs sm:text-sm text-stone-300 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Thanh toán VietQR tức thì</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Bảo hiểm 100tr/khách</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Xe máy & Giáp đời mới 100%</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Xế bản địa cứng tay lái</span>
          </div>
        </div>
      </div>

      {/* Floating Stats Bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-stone-900/90 backdrop-blur-md border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {HIGHLIGHTS_STATS.map((stat, idx) => (
            <div key={idx} className="border-r last:border-none border-stone-800 px-2">
              <div className="text-xl sm:text-2xl font-black text-amber-400 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-stone-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
