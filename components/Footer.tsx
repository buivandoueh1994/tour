import React from 'react';
import { Compass, PhoneCall, Mail, MapPin, ShieldCheck, QrCode } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                HÀ GIANG LOOP
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              CÔNG TY TNHH DU LỊCH & KHÁM PHÁ HÀ GIANG LOOP (HA GIANG EXPEDITION CO., LTD). Đơn vị tiên phong cung cấp dịch vụ tour Loop bản địa uy tín, chuyên nghiệp và an toàn số 1 Việt Nam.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>GP Lữ hành Quốc tế số: 02-098/2022/TCDL-GPLHQT</span>
            </div>
          </div>

          {/* Col 2: Locations & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Văn Phòng & Điểm Đón
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Trụ sở Hà Giang:</strong> Số 32 Đường Nguyễn Trãi, Phường Minh Khai, TP Hà Giang
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Văn phòng Hà Nội:</strong> Số 18 Ngõ 198 Phố Thái Hà, Đống Đa, Hà Nội
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
              Khám Phá Cung Đường
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#tours" className="hover:text-emerald-400 transition-colors">
                  Tour Tự Lái Xe Máy (3N2Đ)
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-emerald-400 transition-colors">
                  Tour Hà Giang Easy Rider
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-emerald-400 transition-colors">
                  Tour Limousine Nghỉ Dưỡng Gia Đình
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-emerald-400 transition-colors">
                  Trekking Mã Pí Lèng & Kayak Sông Nho Quế
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-emerald-400 transition-colors">
                  Cho Thuê Xe Côn Tay & Giáp Bảo Hộ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment Partners */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <QrCode className="w-4 h-4 text-emerald-400" />
              Cổng Thanh Toán Điện Tử
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Tích hợp công nghệ thanh toán mã <strong>VietQR 24/7</strong> và cổng thanh toán quốc gia <strong>PayOS</strong>. Tự động xác thực giao dịch trong 3 giây.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] font-bold text-emerald-400">
                VietQR Pro
              </span>
              <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] font-bold text-blue-400">
                Napas 247
              </span>
              <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] font-bold text-amber-400">
                PayOS Gateway
              </span>
              <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] font-bold text-white">
                MB Bank
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Hà Giang Loop Expedition. Mọi quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-400">Chính sách bảo mật</a>
            <a href="#" className="hover:text-stone-400">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-stone-400">Chính sách hoàn huỷ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
