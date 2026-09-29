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
    <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5">
      {/* Image Container with Badges */}
      <div className="relative h-64 w-full overflow-hidden bg-stone-100">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Top Tag Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-md ${tour.badgeColor || 'bg-emerald-600 text-white'}`}>
            {tour.tag}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-stone-200 border border-white/20">
            {tour.difficulty}
          </span>
        </div>

        {/* Bottom Duration & Rating over Image */}
        <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-stone-900/70 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1 bg-stone-900/70 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-amber-300">{tour.rating}</span>
            <span className="text-stone-300">({tour.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Transport Info */}
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span className="truncate">{tour.transportLabel}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-stone-900 line-clamp-2 group-hover:text-emerald-700 transition-colors mb-2.5">
            {tour.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
            {tour.shortDesc}
          </p>

          {/* Highlights Bullets */}
          <div className="space-y-1.5 mb-6">
            {tour.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Price & CTA Buttons */}
        <div className="pt-4 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-xs text-stone-500 block">Giá trọn gói từ:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-700 tracking-tight">
                  {formatCurrency(tour.price)}
                </span>
                {tour.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatCurrency(tour.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <span className="text-[11px] text-stone-500 font-medium bg-stone-100 px-2 py-0.5 rounded">
              / người
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openBookingModal(tour, 'details')}
              className="py-2.5 px-3 rounded-xl border border-stone-300 hover:border-emerald-600 text-stone-700 hover:text-emerald-700 font-semibold text-xs text-center transition-colors"
            >
              Xem Lịch Trình
            </button>
            <button
              onClick={() => openBookingModal(tour, 'book')}
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg"
            >
              <span>Đặt Tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
