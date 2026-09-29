import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { MOCK_REVIEWS } from '@/data/tours';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Trải Nghiệm Thực Tế
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mt-3 tracking-tight">
            Khách Hàng Nói Gì Về Chuyến Đi?
          </h2>
          <p className="text-stone-600 mt-2 text-base">
            Hơn 15.000 du khách trong và ngoài nước đã gửi trọn niềm tin và sự phấn khích cho chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300" />
                </div>

                {/* Comment Text */}
                <p className="text-stone-700 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-stone-200">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 leading-tight">
                    {review.name}
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium mt-0.5 line-clamp-1">
                    {review.tour}
                  </p>
                  <span className="text-[11px] text-stone-400">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
