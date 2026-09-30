import React from 'react';
import { Calendar, SunMedium, CloudRain, Sparkles, CheckCircle2, Luggage, ShieldAlert } from 'lucide-react';

const SEASONS = [
  {
    period: 'Tháng 9 - Tháng 10',
    title: 'Mùa Vàng Lúa Chín',
    desc: 'Hà Giang rực rỡ với sắc vàng óng của ruộng bậc thang Hoàng Su Phì ngút ngàn, thời tiết mát mẻ dễ chịu, nắng vàng ươm dịu nhẹ.',
    icon: SunMedium,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    period: 'Tháng 10 - Tháng 12',
    title: 'Mùa Hoa Tam Giác Mạch',
    desc: 'Cả cao nguyên đá rực hồng sắc hoa tam giác mạch e ấp. Mùa lễ hội lớn nhất năm với không khí se lạnh đậm chất miền sơn cước.',
    icon: Sparkles,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
  },
  {
    period: 'Tháng 1 - Tháng 3',
    title: 'Mùa Xuân Hoa Đào - Mận',
    desc: 'Hoa mận trắng tinh khôi, hoa đào rừng nở hồng bên mái nhà trình tường cổ kính. Trải nghiệm không khí đón Tết vùng cao nồng hậu.',
    icon: Calendar,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  {
    period: 'Tháng 5 - Tháng 6',
    title: 'Mùa Nước Đổ Kỳ Ảo',
    desc: 'Những thửa ruộng bậc thang phản chiếu trời mây như những tấm gương khổng lồ uốn lượn ngoạn mục quanh sườn núi đá vôi hùng vĩ.',
    icon: CloudRain,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
];

const ORGANIZER_PROVIDED = [
  'Mũ bảo hiểm 3/4 đạt chuẩn có kính chống gió, chống bụi và chống lóa',
  'Bộ giáp bảo hộ tay chân 4 món chuyên dụng ôm cua an toàn',
  'Áo mưa bộ cao cấp dẻo dai & ủng đi mưa chống ướt giày',
  'Túi bọc balo du lịch chống nước tuyệt đối 100%',
  'Túi y tế cơ bản, bông băng, cồn đỏ và thuốc sơ cấp cứu dọc đường',
];

const TRAVELER_BRING = [
  'CCCD / Hộ chiếu bản gốc (bắt buộc khi lưu trú và khai báo giấy phép biên giới)',
  'Bằng lái xe máy hợp lệ A1 / A2 (đối với tour tự lái)',
  'Áo khoác gió chống nước, giữ nhiệt (ban đêm nhiệt độ đèo có thể dưới 15°C)',
  'Giày thể thao hoặc giày trekking có đế bám tốt, chống trơn trượt trên đá',
  'Thuốc cá nhân đặc trị, thuốc chống say xe, kem chống muỗi, pin sạc dự phòng',
];

export default function GuideSection() {
  return (
    <section id="guide" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Cẩm Nang Phượt Bản Địa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Kinh Nghiệm & Checklist Hành Trang Đi Hà Giang
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Nắm vững các mùa đẹp nhất trong năm và hành trang cần thiết để chuyến chinh phục Loop của bạn an toàn, trọn vẹn và đáng nhớ.
          </p>
        </div>

        {/* 4 Seasons Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SEASONS.map((season, idx) => {
            const Icon = season.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${season.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    {season.period}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {season.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {season.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Comparative Checklist */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block mb-2">
              Hành Trang Trước Giờ Lăn Bánh
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bảng Checklist So Sánh Chuẩn Bị
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Đảm bảo tính minh bạch, tiện lợi để bạn không phải lo lắng bất cứ thiếu sót nào.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: Đã có sẵn bởi ban tổ chức */}
            <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-7 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-extrabold text-emerald-300">
                      Đã có sẵn bởi ban tổ chức
                    </h4>
                    <span className="text-xs text-slate-400">
                      (Đã bao gồm trọn gói trong giá tour)
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {ORGANIZER_PROVIDED.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <span>🛡️ Đã được kiểm định chất lượng & vệ sinh khử khuẩn trước mỗi chuyến đi.</span>
              </div>
            </div>

            {/* Column 2: Du khách cần mang theo */}
            <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-7 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Luggage className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-extrabold text-amber-300">
                      Du khách cần mang theo
                    </h4>
                    <span className="text-xs text-slate-400">
                      (Hành lý cá nhân gọn nhẹ, tiện dụng)
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {TRAVELER_BRING.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-amber-300 font-medium flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Nên để lại vali to tại văn phòng TP Hà Giang, chỉ mang balo nhỏ đi Loop.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
