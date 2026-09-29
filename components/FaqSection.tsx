'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Tôi không có bằng lái xe máy hoặc không tự tin tay lái thì nên chọn gói tour nào?',
    a: 'Bạn nên chọn gói "Tour Hà Giang Easy Rider (Có xế bản địa cứng lái kèm)" hoặc "Tour Limousine Cao Nguyên Đá". Các bác xế bản địa người H\'Mông, Tày có hơn 5-10 năm kinh nghiệm ôm đèo, đảm bảo an toàn tuyệt đối và bạn chỉ việc thoải mái ngắm cảnh, chụp hình.',
  },
  {
    q: 'Thời gian khởi hành và điểm tập kết tại TP Hà Giang như thế nào?',
    a: 'Tour khởi hành vào lúc 07:30 - 08:00 sáng hàng ngày tại văn phòng trung tâm TP Hà Giang (hoặc đón tận nơi tại bến xe khách TP Hà Giang). Nếu bạn đi xe giường nằm từ Hà Nội đêm hôm trước (đến Hà Giang lúc 3h - 4h sáng), văn phòng chúng tôi có sẵn phòng nghỉ miễn phí và nhà tắm nóng lạnh để bạn nghỉ ngơi trước khi xuất phát.',
  },
  {
    q: 'Quy trình thanh toán qua VietQR / PayOS diễn ra thế nào?',
    a: 'Sau khi điền thông tin và bấm đặt tour, hệ thống sẽ tạo một mã VietQR động với đúng số tiền và nội dung chuyển khoản chuẩn Napas. Bạn chỉ cần mở bất kỳ ứng dụng ngân hàng nào (Vietcombank, MB Bank, Techcombank, Momo, BIDV...) quét mã và xác nhận chuyển khoản. Hệ thống tự động nhận diện và xuất vé Voucher điện tử ngay sau vài giây.',
  },
  {
    q: 'Nếu thời tiết xấu hoặc có việc bận đột xuất tôi có thể đổi ngày hay hoàn tiền không?',
    a: 'Chúng tôi hỗ trợ đổi ngày khởi hành hoàn toàn MIỄN PHÍ nếu báo trước 48 giờ. Trong trường hợp sạt lở hoặc bão lũ bất khả kháng do thiên tai, du khách được hỗ trợ bảo lưu chuyến đi trong 12 tháng hoặc hoàn lại 100% tiền cọc.',
  },
  {
    q: 'Một xe máy có thể chở 2 người tự lái được không?',
    a: 'Được. Tuy nhiên cung đường Hà Giang có nhiều dốc cua gắt (Dốc Thẩm Mã, Đèo Mã Pí Lèng, Dốc Chín Khoanh), người cầm lái cần có tay lái thực sự vững và kinh nghiệm đi đèo dốc để đảm bảo an toàn cho cả hai.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Giải Đáp Thắc Mắc
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mt-3 tracking-tight">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-stone-600 mt-2 text-base">
            Những thông tin cần biết để bạn an tâm tận hưởng trọn vẹn chuyến phiêu lưu.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 bg-stone-50/50 hover:bg-stone-50 flex items-center justify-between gap-4 font-bold text-stone-900 text-sm sm:text-base transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 bg-white text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
