import React from 'react';
import { ShieldCheck, HeartHandshake, Wrench, Sparkles } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Cam Kết An Toàn & Bảo Hiểm 100Tr',
    desc: 'Tất cả du khách đều được mua bảo hiểm du lịch Bảo Việt mức bồi thường tối đa 100.000.000đ/vụ. Trang bị giáp 4 món và mũ bảo hiểm đạt chuẩn chất lượng.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    icon: HeartHandshake,
    title: 'Xế Bản Địa Tay Lái Cứng & Có Tâm',
    desc: 'Đội ngũ tài xế người bản địa (H\'Mông, Tày, Dao) sinh ra tại núi đá, am hiểu từng khúc cua, kiêm thợ chụp ảnh sống ảo và người kể chuyện văn hóa.',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    icon: Wrench,
    title: 'Cứu Hộ Kỹ Thuật 24/7 Dọc Tuyến Loop',
    desc: 'Hệ thống trạm liên kết cứu hộ tại Quản Bạ, Yên Minh, Đồng Văn, Mèo Vạc. Có mặt trong vòng 45 phút hỗ trợ đổi xe, vá lốp hoặc xử lý tình huống khẩn cấp.',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    icon: Sparkles,
    title: 'Thanh Toán VietQR Tiện Lợi & Minh Bạch',
    desc: 'Tạo mã QR thanh toán động tức thì qua PayOS & Napas, khớp đúng số tiền và nội dung. Nhận vé xác nhận điện tử ngay sau 5 giây không cần chờ duyệt thủ công.',
    color: 'text-teal-600 bg-teal-50 border-teal-200',
  },
];

export default function Features() {
  return (
    <section id="highlights" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Tại Sao Chọn Chúng Tôi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
            Trải Nghiệm Đỉnh Cao Với Tiêu Chuẩn An Toàn Khắt Khe
          </h2>
          <p className="text-stone-600 mt-3 text-base sm:text-lg">
            Hà Giang Loop là cung đường phiêu lưu mạo hiểm, sự chuẩn bị chu đáo và an toàn của bạn luôn là ưu tiên số 1 của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${item.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
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
