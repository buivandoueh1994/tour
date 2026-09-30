'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Clock, Compass, CheckCircle, ArrowRight } from 'lucide-react';
import { Tour } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useBooking } from '@/context/BookingContext';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const { openBookingModal } = useBooking();

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1.5">
      {/* Image Container with Badges */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Tag Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md ${tour.badgeColor || 'bg-emerald-700 text-white'}`}>
            {tour.tag}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/70 backdrop-blur-md text-slate-200 border border-white/20">
            {tour.difficulty}
          </span>
        </div>

        {/* Bottom Duration & Rating over Image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="text-amber-300">{tour.rating}</span>
            <span className="text-slate-300 font-normal">({tour.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Transport Info */}
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">{tour.transportLabel}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-800 transition-colors mb-2 min-h-[3.5rem] leading-snug">
            {tour.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {tour.shortDesc}
          </p>

          {/* Highlights Bullets (Max 3 concise bullets) */}
          <div className="space-y-2 mb-6">
            {tour.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Price & CTA Buttons */}
        <div className="pt-4 border-t border-slate-100 mt-auto">
          {/* Price Block */}
          <div className="mb-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-medium text-slate-500 block">Giá trọn gói từ:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-800 tracking-tight">
                    {formatCurrency(tour.price)}
                  </span>
                  {tour.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatCurrency(tour.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                / khách
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 italic">
              (Trọn gói xe, ăn nghỉ, bảo hiểm)
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => openBookingModal(tour, 'details')}
              className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-semibold text-xs text-center transition-all"
            >
              Xem Lịch Trình
            </button>
            <button
              onClick={() => openBookingModal(tour, 'book')}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Đặt Tour Ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
