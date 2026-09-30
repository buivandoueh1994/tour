import React from 'react';
import { ShieldCheck, HeartHandshake, Wrench, Sparkles } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Cam Kết An Toàn & Bảo Hiểm 100Tr',
    desc: 'Tất cả du khách được trang bị bảo hiểm du lịch Bảo Việt trách nhiệm 100.000.000đ/vụ. Trang bị giáp bảo hộ 4 món và mũ bảo hiểm 3/4 đạt chuẩn an toàn cao nhất.',
    badge: 'An Toàn Tuyệt Đối',
    iconColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  {
    icon: HeartHandshake,
    title: 'Xế Bản Địa (Easy Rider) Cứng Tay Lái & Có Tâm',
    desc: 'Đội ngũ tài xế người H\'Mông, Tày, Dao sinh ra tại dốc đá, am hiểu từng khúc cua tay áo, kiêm thợ chụp ảnh check-in sống ảo và hướng dẫn viên nhiệt tình.',
    badge: 'Bản Địa 100%',
    iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    icon: Wrench,
    title: 'Cứu Hộ Dọc Tuyến 24/7 Trong 45 Phút',
    desc: 'Mạng lưới trạm kỹ thuật cứu hộ túc trực tại Quản Bạ, Yên Minh, Đồng Văn và Mèo Vạc. Cam kết hỗ trợ đổi xe, vá xe hoặc xử lý sự cố trong vòng 45 phút.',
    badge: 'Phản Ứng Nhanh',
    iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    icon: Sparkles,
    title: 'Thanh Toán VietQR Tiện Lợi & Minh Bạch',
    desc: 'Tích hợp cổng thanh toán VietQR & PayOS Napas247 tự động. Quét mã bằng bất kỳ ứng dụng ngân hàng nào, nhận voucher xác nhận đặt tour ngay sau 5 giây.',
    badge: 'Xác Nhận Tức Thì',
    iconColor: 'text-teal-700 bg-teal-50 border-teal-200',
  },
];

export default function Features() {
  return (
    <section id="highlights" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Giá Trị Cốt Lõi & Cam Kết
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Trải Nghiệm Đỉnh Cao Với Tiêu Chuẩn An Toàn Khắt Khe
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Hà Giang Loop là cung đường phiêu lưu mạo hiểm, sự chuẩn bị chu đáo và an toàn của bạn luôn là kim chỉ nam trong mọi hành trình của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.iconColor} group-hover:scale-110 transition-transform shadow-sm`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
