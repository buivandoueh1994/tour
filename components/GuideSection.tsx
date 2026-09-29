import React from 'react';
import { Calendar, SunMedium, CloudRain, Sparkles, CheckSquare } from 'lucide-react';

const SEASONS = [
  {
    period: 'Tháng 9 - Tháng 10',
    title: 'Mùa Vàng Lúa Chín',
    desc: 'Hà Giang khoác lên mình sắc vàng óng ả của những ruộng bậc thang Hoàng Su Phì trải dài ngút ngàn, thời tiết mát mẻ khô ráo, nắng vàng ươm.',
    icon: SunMedium,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    period: 'Tháng 10 - Tháng 12',
    title: 'Mùa Hoa Tam Giác Mạch',
    desc: 'Cả cao nguyên đá rực hồng sắc hoa tam giác mạch. Đây là mùa lễ hội lớn nhất năm với không khí se lạnh đậm chất miền sơn cước.',
    icon: Sparkles,
    color: 'text-rose-600 bg-rose-50',
  },
  {
    period: 'Tháng 1 - Tháng 3',
    title: 'Mùa Xuân Hoa Đào - Hoa Mận',
    desc: 'Hoa mận trắng tinh khôi, hoa đào rừng nở hồng bên những mái nhà trình tường cổ kính. Trải nghiệm không khí Tết vùng cao ấm áp.',
    icon: Calendar,
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    period: 'Tháng 5 - Tháng 6',
    title: 'Mùa Nước Đổ Kỳ Ảo',
    desc: 'Những thửa ruộng bậc thang phản chiếu trời mây như những tấm gương khổng lồ uốn lượn quanh sườn núi đá vôi hùng vĩ.',
    icon: CloudRain,
    color: 'text-blue-600 bg-blue-50',
  },
];

const PACKING_TIPS = [
  'Căn cước công dân hoặc Hộ chiếu (bắt buộc khi làm thủ tục lưu trú và giấy phép biên giới).',
  'Bằng lái xe máy (nếu chọn tour tự lái A1/A2 còn hạn sử dụng).',
  'Áo khoác gió chống nước, khăn quàng cổ (nhiệt độ ban đêm trên đèo Đồng Văn - Mèo Vạc có thể xuống dưới 15°C).',
  'Giày thể thao có đế bám tốt hoặc giày leo núi chống trơn trượt.',
  'Thuốc say xe, kem chống muỗi/côn trùng, pin sạc dự phòng cho điện thoại chụp ảnh.',
];

export default function GuideSection() {
  return (
    <section id="guide" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Kinh Nghiệm Phượt
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mt-3 tracking-tight">
            Cẩm Nang Chinh Phục Hà Giang Loop Trọn Vẹn
          </h2>
          <p className="text-stone-600 mt-2 text-base">
            Tổng hợp thời điểm lý tưởng nhất trong năm và những lưu ý an toàn không thể bỏ qua trước chuyến đi.
          </p>
        </div>

        {/* 4 Seasons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SEASONS.map((season, idx) => {
            const Icon = season.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${season.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    {season.period}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {season.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {season.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Packing & Safety Checklist Card */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block mb-2">
                Hành Trang Cần Chuẩn Bị
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Checklist Cho Chuyến Đi Hoàn Hảo
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-3">
                Chúng tôi sẽ chuẩn bị sẵn mũ bảo hiểm 3/4, full giáp 4 món, áo mưa bộ và túi chống nước cho bạn. Bạn chỉ cần mang theo đồ dùng cá nhân gọn nhẹ.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PACKING_TIPS.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-stone-800/80 p-3.5 rounded-xl border border-stone-700 text-xs sm:text-sm text-stone-200">
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
