import React from 'react';
import Image from 'next/image';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { MOCK_REVIEWS } from '@/data/tours';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Trải Nghiệm Thực Tế
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Khách Hàng Nói Gì Về Chuyến Đi?
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Hơn 15,000 du khách trong và ngoài nước đã gửi trọn niềm tin và sự hài lòng tuyệt đối cho đội ngũ của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-amber-600 ml-1.5">5.0 / 5.0</span>
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                {/* Comment Text */}
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Info & Verified Badge */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-emerald-600/30">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {review.name}
                    </h4>
                    <span className="text-[11px] text-slate-400">{review.date}</span>
                  </div>
                </div>

                {/* Verified Tag & Tour Name */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Đã xác thực chuyến đi
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[200px]">
                    {review.tourBadge || review.tour}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
