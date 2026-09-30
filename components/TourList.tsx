'use client';

import React, { useState, useMemo } from 'react';
import { TOURS_DATA } from '@/data/tours';
import { TransportType } from '@/types';
import TourCard from './TourCard';
import { Bike, Car, Footprints, KeyRound, Sparkles, Search, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type FilterCategory = 'all' | TransportType;

export default function TourList() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const categories: { id: FilterCategory; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: t('catAll'), icon: Sparkles },
    { id: 'motorbike', label: t('catMotorbike'), icon: Bike },
    { id: 'easy-rider', label: t('catEasyRider'), icon: Bike },
    { id: 'limousine', label: t('catLimousine'), icon: Car },
    { id: 'trekking', label: t('catTrekking'), icon: Footprints },
    { id: 'rental', label: t('catRental'), icon: KeyRound },
  ];

  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Category match
      const matchCategory = activeFilter === 'all' || tour.transportType === activeFilter;

      // Query match (support both VI and EN search)
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        tour.title.toLowerCase().includes(query) ||
        (tour.titleEn && tour.titleEn.toLowerCase().includes(query)) ||
        tour.shortDesc.toLowerCase().includes(query) ||
        (tour.shortDescEn && tour.shortDescEn.toLowerCase().includes(query)) ||
        tour.highlights.some((h) => h.toLowerCase().includes(query)) ||
        (tour.highlightsEn && tour.highlightsEn.some((h) => h.toLowerCase().includes(query)));

      return matchCategory && matchQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended order
    });
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <section id="tours" className="py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200">
            {t('toursTag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            {t('toursTitle')}
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            {t('toursSubtitle')}
          </p>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-10 space-y-4">
          {/* Quick Categories Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all text-slate-800"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              <span className="text-xs text-slate-500 font-medium">{t('sortByLabel')}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recommended' | 'price-asc' | 'price-desc' | 'rating')}
                className="text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <option value="recommended">{t('sortRecommended')}</option>
                <option value="price-asc">{t('sortPriceAsc')}</option>
                <option value="price-desc">{t('sortPriceDesc')}</option>
                <option value="rating">{t('sortRating')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium">{t('noToursFound')}</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 shadow-sm"
            >
              {t('viewAllTours')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
