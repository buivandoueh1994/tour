'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  X, Calendar, Users, Check, AlertCircle, 
  MapPin, ShieldCheck, ArrowRight, Loader2, Info, ChevronRight, FileText
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { formatCurrency } from '@/lib/utils';
import { BookingCustomerInfo } from '@/types';

export default function BookingModal() {
  const router = useRouter();
  const { 
    selectedTour, 
    isModalOpen, 
    closeBookingModal, 
    modalTab, 
    setModalTab,
    setCurrentOrder,
    addRecentOrder
  } = useBooking();

  // Booking Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState('');
  const [vehicleChoice, setVehicleChoice] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Submission & Validation
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Default departure date to tomorrow
  useEffect(() => {
    if (!departureDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateString = tomorrow.toISOString().split('T')[0];
      setDepartureDate(dateString);
    }
  }, [departureDate]);

  // Set default vehicle option if available
  useEffect(() => {
    if (selectedTour?.vehicleOptions && selectedTour.vehicleOptions.length > 0) {
      setVehicleChoice(selectedTour.vehicleOptions[0]);
    }
  }, [selectedTour]);

  if (!isModalOpen || !selectedTour) return null;

  // Calculate total price
  const totalPrice = selectedTour.price * guests;

  // Handle Form Submit
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên của bạn');
      return;
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phone.trim())) {
      setErrorMessage('Số điện thoại không hợp lệ (Vui lòng nhập 10 chữ số)');
      return;
    }

    if (!departureDate) {
      setErrorMessage('Vui lòng chọn ngày khởi hành');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Vui lòng đồng ý với điều khoản dịch vụ và chính sách an toàn');
      return;
    }

    setIsLoading(true);

    try {
      const customerInfo: BookingCustomerInfo = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        departureDate,
        guests,
        notes: notes.trim(),
        vehicleChoice: selectedTour.vehicleOptions ? vehicleChoice : undefined,
      };

      const res = await fetch('/api/payment/create-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: selectedTour.id,
          tourTitle: selectedTour.title,
          amount: totalPrice,
          customerInfo,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Không thể tạo mã thanh toán VietQR');
      }

      // Lưu thông tin đơn đặt chỗ vào Context & Storage
      if (data.order) {
        setCurrentOrder(data.order);
        addRecentOrder(data.order);
      }

      // Đóng modal và chuyển hướng tới màn hình thanh toán VietQR
      closeBookingModal();
      router.push(`/payment-status?orderCode=${data.orderCode}`);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Get tomorrow's date string for input min
  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Modal Dialog Card */}
      <div 
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Background Thumbnail */}
        <div className="relative bg-stone-900 text-white p-5 sm:p-6 shrink-0 flex items-start justify-between">
          <div className="relative z-10 pr-10">
            <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 ${selectedTour.badgeColor || 'bg-emerald-600 text-white'}`}>
              {selectedTour.tag}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {selectedTour.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Hà Giang Loop
              </span>
              <span>•</span>
              <span>Thời lượng: <strong>{selectedTour.duration}</strong></span>
              <span>•</span>
              <span className="text-emerald-300 font-bold text-sm">
                {formatCurrency(selectedTour.price)} / người
              </span>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="relative z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Đóng modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Subdued Background Image */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src={selectedTour.image}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 shrink-0">
          <button
            onClick={() => setModalTab('book')}
            className={`py-3.5 px-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors ${
              modalTab === 'book'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Đặt Tour & Thanh Toán VietQR</span>
          </button>

          <button
            onClick={() => setModalTab('details')}
            className={`py-3.5 px-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors ${
              modalTab === 'details'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Xem Chi Tiết Lịch Trình & Tiện Ích</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {modalTab === 'details' ? (
            /* Tab 1: Detailed Itinerary & Inclusions */
            <div className="space-y-8 animate-fade-in">
              {/* Daily Itinerary */}
              <div>
                <h3 className="text-lg font-black text-stone-900 mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  Lịch Trình Chi Tiết Từng Ngày
                </h3>

                <div className="space-y-4">
                  {selectedTour.itinerary.map((day) => (
                    <div key={day.day} className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-xs font-bold">
                          Ngày {day.day}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-stone-900">
                          {day.title}
                        </h4>
                      </div>

                      <div className="space-y-2 mt-3 text-xs sm:text-sm text-stone-700 pl-2 border-l-2 border-emerald-300">
                        {day.activities.map((act, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-stone-200 flex flex-wrap gap-4 text-xs text-stone-500">
                        <span>🍽️ <strong>Bữa ăn:</strong> {day.meals.join(', ')}</span>
                        <span>🏡 <strong>Nghỉ đêm:</strong> {day.stay}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                  <h4 className="font-bold text-emerald-900 text-sm mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Giá Tour Đã Bao Gồm
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {selectedTour.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200">
                  <h4 className="font-bold text-rose-900 text-sm mb-3 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    Chưa Bao Gồm
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {selectedTour.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Switch to Booking Tab Button */}
              <div className="text-center pt-2">
                <button
                  onClick={() => setModalTab('book')}
                  className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <span>Chuyển Sang Bước Đặt Tour Này</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Tab 2: Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-6 animate-fade-in">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Top Configuration: Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                {/* Departure Date */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    Ngày Khởi Hành <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={getMinDate()}
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-stone-400 mt-1 block">Khởi hành đều đặn mỗi ngày</span>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    Số Lượng Khách <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-11 h-11 rounded-l-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-lg flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <div className="h-11 px-6 bg-white border-y border-stone-300 flex items-center justify-center font-bold text-stone-900 text-sm min-w-[70px]">
                      {guests} {guests > 1 ? 'người' : 'khách'}
                    </div>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(20, guests + 1))}
                      className="w-11 h-11 rounded-r-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-lg flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-stone-400 mt-1 block">Đoàn từ 5 khách tặng 1 buổi đốt lửa trại riêng</span>
                </div>
              </div>

              {/* Optional Vehicle Choice for Rental */}
              {selectedTour.vehicleOptions && selectedTour.vehicleOptions.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    Chọn Dòng Xe Phù Hợp:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedTour.vehicleOptions.map((v, i) => (
                      <label
                        key={i}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                          vehicleChoice === v
                            ? 'border-emerald-600 bg-emerald-50/60 font-bold text-emerald-900'
                            : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="vehicleChoice"
                          value={v}
                          checked={vehicleChoice === v}
                          onChange={(e) => setVehicleChoice(e.target.value)}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Contact Information */}
              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Thông Tin Trưởng Đoàn Nhận Vé
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Họ và Tên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  {/* Phone / Zalo */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Số Điện Thoại / Zalo <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="0912345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Địa Chỉ Email (Nhận voucher điện tử)
                    </label>
                    <input
                      type="email"
                      placeholder="vidu@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Yêu Cầu Đặc Biệt (Ăn chay, đón tại bến xe...)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Đón lúc 5h sáng tại bến xe Hà Giang..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Price Calculation Summary Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                <div className="flex items-center justify-between text-xs text-stone-600 mb-2">
                  <span>Đơn giá tour:</span>
                  <span className="font-semibold">{formatCurrency(selectedTour.price)} x {guests} khách</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-700 mb-3">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Bảo hiểm & Cứu hộ 24/7:
                  </span>
                  <span className="font-bold">Miễn phí (Tặng kèm)</span>
                </div>
                <div className="pt-2 border-t border-emerald-200/80 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-stone-900">Tổng thanh toán:</span>
                  <span className="text-2xl font-black text-emerald-800 tracking-tight">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Agreement checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-stone-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 mt-0.5"
                />
                <span>
                  Tôi xác nhận thông tin đã cung cấp là chính xác, đồng ý với quy định an toàn cung đường phượt và chính sách thanh toán VietQR của ban tổ chức.
                </span>
              </label>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang khởi tạo mã VietQR...</span>
                    </>
                  ) : (
                    <>
                      <span>Tiến Hành Thanh Toán VietQR</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 mt-2">
                  <Info className="w-3 h-3 text-emerald-600" />
                  <span>Mã QR động sẽ được tạo tự động với đúng số tiền và nội dung chuyển khoản</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
