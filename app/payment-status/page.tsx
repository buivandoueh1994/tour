'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, Clock, Copy, Check, ArrowLeft, Printer, 
  Sparkles, AlertCircle, RefreshCw, Zap,
  Calendar, Users, MapPin, PhoneCall, Info
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { BookingOrder } from '@/types';
import LanguageSwitcher from '@/components/LanguageSwitcher';

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const orderCodeParam = searchParams.get('orderCode');
  const initialStatusParam = searchParams.get('status');

  const { recentOrders, updateRecentOrderStatus } = useBooking();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [order, setOrder] = useState<BookingOrder | null>(null);
  const [status, setStatus] = useState<'PENDING' | 'PAID' | 'CANCELLED' | 'LOADING'>('LOADING');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes = 900 seconds
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Fetch Order Details from Server / Local
  const fetchOrderStatus = useCallback(async (code: number) => {
    try {
      const res = await fetch(`/api/payment/check-status?orderCode=${code}`);
      const data = await res.json();

      if (data.success && data.order) {
        setOrder(data.order);
        setStatus(data.order.status);
        if (data.order.status === 'PAID') {
          updateRecentOrderStatus(code, 'PAID');
        }
        return data.order;
      }
    } catch (err) {
      console.error('Lỗi kiểm tra trạng thái đơn:', err);
    }
    return null;
  }, [updateRecentOrderStatus]);

  useEffect(() => {
    if (!orderCodeParam) {
      setStatus('CANCELLED');
      setErrorMessage('Không tìm thấy mã đơn hàng');
      return;
    }

    const code = Number(orderCodeParam);

    // Initial check from context first for instant paint
    const localMatch = recentOrders.find((o) => o.orderCode === code);
    if (localMatch) {
      setOrder(localMatch);
      setStatus(localMatch.status);
    }

    // Fetch fresh status from server
    fetchOrderStatus(code).then((fetched) => {
      if (!fetched && !localMatch) {
        setStatus('CANCELLED');
        setErrorMessage('Không tìm thấy thông tin đơn hàng này trong hệ thống.');
      }
    });
  }, [orderCodeParam, recentOrders, fetchOrderStatus]);

  // 2. Countdown Timer for PENDING State
  useEffect(() => {
    if (status !== 'PENDING') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus('CANCELLED');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  // 3. Polling every 3 seconds for status changes when PENDING
  useEffect(() => {
    if (status !== 'PENDING' || !orderCodeParam) return;

    const code = Number(orderCodeParam);
    const interval = setInterval(async () => {
      const updated = await fetchOrderStatus(code);
      if (updated && updated.status === 'PAID') {
        setStatus('PAID');
        triggerConfetti();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [status, orderCodeParam, fetchOrderStatus]);

  // 4. Confetti Effect on PAID
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 250);
  };

  useEffect(() => {
    if (status === 'PAID' || initialStatusParam === 'PAID') {
      triggerConfetti();
    }
  }, [status, initialStatusParam]);

  // Copy to clipboard helper
  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Simulate Payment Success (Mock Test Mode)
  const handleSimulatePaymentSuccess = async () => {
    if (!order) return;
    setIsSimulating(true);

    try {
      const res = await fetch('/api/payment/simulate-success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderCode: order.orderCode }),
      });
      const data = await res.json();

      if (data.success && data.order) {
        setOrder(data.order);
        setStatus('PAID');
        updateRecentOrderStatus(order.orderCode, 'PAID');
        triggerConfetti();
      }
    } catch (err) {
      console.error('Lỗi mô phỏng thanh toán:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  // Format seconds to mm:ss
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle Print Voucher
  const handlePrint = () => {
    window.print();
  };

  if (status === 'LOADING') {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-3xl border border-stone-200 shadow-xl max-w-sm w-full">
          <RefreshCw className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-bold text-stone-900">Đang tải thông tin đơn...</h2>
          <p className="text-xs text-stone-500 mt-1">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  if (status === 'CANCELLED' || !order) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-3xl border border-stone-200 shadow-xl max-w-md w-full">
          <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Đơn hàng không tồn tại hoặc đã hết hạn</h2>
          <p className="text-xs text-stone-500 mt-2 mb-6">
            {errorMessage || 'Thời gian thanh toán của phiên giao dịch đã kết thúc. Vui lòng quay lại đặt đơn mới.'}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay về trang chủ</span>
          </Link>
        </div>
      </div>
    );
  }

  // ===================== TRẠNG THÁI: THANH TOÁN THÀNH CÔNG =====================
  if (status === 'PAID') {
    return (
      <div className="min-h-screen bg-stone-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Top Navigation & Language Switcher */}
          <div className="flex items-center justify-between mb-6 print:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isEn ? 'Back to Homepage' : 'Quay về trang chủ'}</span>
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Top Success Banner */}
          <div className="bg-emerald-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-6 text-center animate-fade-in relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white mb-2">
              {isEn ? 'Booking Confirmed' : 'Xác Nhận Đặt Chỗ Thành Công'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              {isEn ? 'Payment Successful!' : 'Thanh Toán Thành Công!'}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg mx-auto mt-2">
              {isEn 
                ? 'Thank you for choosing Ha Giang Loop Expedition. Below is your official electronic booking voucher.' 
                : 'Cảm ơn bạn đã lựa chọn Hà Giang Loop Expedition. Dưới đây là phiếu xác nhận đặt tour (Booking Voucher) của bạn.'}
            </p>
          </div>

          {/* Printable Voucher Card */}
          <div 
            id="printable-voucher" 
            className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden mb-6 print:shadow-none print:border-none"
          >
            {/* Voucher Header */}
            <div className="p-6 sm:p-8 border-b border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-xl text-stone-900 tracking-tight">
                    HÀ GIANG LOOP
                  </span>
                  <span className="text-xs bg-emerald-700 text-white px-2 py-0.5 rounded font-bold uppercase">
                    E-Voucher
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  CÔNG TY TNHH DU LỊCH & KHÁM PHÁ HÀ GIANG LOOP
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-stone-500 block">
                  {isEn ? 'Booking Reference:' : 'Mã Đặt Chỗ (Booking Code):'}
                </span>
                <span className="text-lg font-mono font-black text-emerald-700">
                  #HGLOOP-{order.orderCode}
                </span>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  {isEn ? 'Date paid:' : 'Ngày thanh toán:'} {formatDateTime(order.paidAt || new Date().toISOString())}
                </span>
              </div>
            </div>

            {/* Voucher Body Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Tour Information Box */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  {isEn ? 'Tour Package Details' : 'Thông Tin Dịch Vụ'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-3">
                  {order.tourTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>{isEn ? 'Departure:' : 'Khởi hành:'} <strong>{order.customerInfo.departureDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>{isEn ? 'Guests:' : 'Số lượng:'} <strong>{order.customerInfo.guests} {order.customerInfo.guests > 1 ? (isEn ? 'travelers' : 'khách') : (isEn ? 'traveler' : 'khách')}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{isEn ? 'Pickup:' : 'Điểm đón:'} <strong>{isEn ? 'Ha Giang City' : 'TP Hà Giang'}</strong></span>
                  </div>
                </div>

                {order.customerInfo.vehicleChoice && (
                  <div className="mt-3 pt-3 border-t border-emerald-200/60 text-xs text-stone-700">
                    <span>{isEn ? 'Selected vehicle:' : 'Phương tiện đã chọn:'} <strong>{order.customerInfo.vehicleChoice}</strong></span>
                  </div>
                )}
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <span className="text-xs text-stone-500 block mb-1">
                    {isEn ? 'Lead Traveler:' : 'Khách hàng đại diện:'}
                  </span>
                  <div className="font-bold text-stone-900 text-sm">{order.customerInfo.fullName}</div>
                  <div className="text-xs text-stone-600 mt-1">SĐT/WhatsApp: {order.customerInfo.phone}</div>
                  {order.customerInfo.email && (
                    <div className="text-xs text-stone-600">Email: {order.customerInfo.email}</div>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <span className="text-xs text-stone-500 block mb-1">
                    {isEn ? 'Payment Details:' : 'Chi tiết thanh toán:'}
                  </span>
                  <div className="font-bold text-emerald-700 text-base">
                    {formatCurrency(order.amount, language)} ({isEn ? 'Paid in full' : 'Đã thanh toán'})
                  </div>
                  <div className="text-xs text-stone-600 mt-1">
                    {isEn ? 'Method:' : 'Phương thức:'} <strong>VietQR 24/7 (PayOS Gateway)</strong>
                  </div>
                  <div className="text-xs text-stone-600">
                    {isEn ? 'Memo:' : 'Nội dung:'} <strong>{order.paymentContent}</strong>
                  </div>
                </div>
              </div>

              {/* Special Notes if any */}
              {order.customerInfo.notes && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <strong>{isEn ? 'Special requests:' : 'Ghi chú đặc biệt:'}</strong> {order.customerInfo.notes}
                </div>
              )}

              {/* Pick-up & Preparation Instructions */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
                <h4 className="font-bold text-stone-900 flex items-center gap-1.5 text-sm mb-2">
                  <Info className="w-4 h-4 text-emerald-600" />
                  {isEn ? 'Pickup & Loop Preparation Guidelines' : 'Hướng Dẫn Đón Tiếp Tại Hà Giang'}
                </h4>
                <p>
                  {isEn 
                    ? '• Please arrive at No. 32 Nguyen Trai Street, Ha Giang City by 07:30 AM on departure day (or inform your bus arrival time for station pickup).' 
                    : '• Quý khách vui lòng có mặt tại Số 32 Đường Nguyễn Trãi, TP Hà Giang lúc 07:30 sáng ngày khởi hành (hoặc thông báo xe buýt để HDV đón tại bến xe).'}
                </p>
                <p>
                  {isEn 
                    ? '• Complimentary dorm beds, hot showers, and welcome drinks are available before departure.' 
                    : '• Quý khách được phục vụ chỗ nghỉ tạm, phòng tắm nóng lạnh và đồ uống chào mừng miễn phí trước khi nhận xe.'}
                </p>
                <p>
                  {isEn 
                    ? '• Please have your original passport/ID and driving license ready.' 
                    : '• Vui lòng chuẩn bị sẵn CCCD/Hộ chiếu gốc và bằng lái xe máy (nếu tự lái).'}
                </p>
                <p className="font-semibold text-emerald-800 pt-1">
                  {isEn ? '• Emergency Tour Leader Hotline: +84 988 333 888 (24/7)' : '• Hotline Trưởng đoàn hỗ trợ khẩn cấp: 0988.333.888 (24/7)'}
                </p>
              </div>
            </div>

            {/* Voucher Footer */}
            <div className="p-4 bg-stone-100 border-t border-stone-200 text-center text-xs text-stone-500">
              {isEn 
                ? 'This digital voucher serves as official ticket confirmation. Please save or screenshot this page.' 
                : 'Voucher điện tử có giá trị như vé chính thức. Vui lòng chụp màn hình hoặc lưu lại mã đặt chỗ để xuất trình khi nhận tour.'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-stone-300 hover:border-emerald-600 bg-white text-stone-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isEn ? 'Back to homepage' : 'Quay về trang chủ'}</span>
            </Link>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>{isEn ? 'Print / Download Voucher (PDF)' : 'In / Tải Voucher (PDF)'}</span>
              </button>

              <a
                href="https://zalo.me/0988333888"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isEn ? 'Contact Tour Guide' : 'Liên hệ Zalo HDV'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================== TRẠNG THÁI: ĐANG CHỜ THANH TOÁN (PENDING) =====================
  return (
    <div className="min-h-screen bg-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link & Language Switcher Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEn ? 'Back to homepage' : 'Quay lại trang chủ'}</span>
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Top Pending Bar */}
        <div className="bg-amber-500 text-white p-4 sm:p-5 rounded-2xl shadow-md mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="font-black text-base sm:text-lg leading-tight">
                {isEn ? 'Awaiting VietQR Payment' : 'Đang Chờ Quét Mã VietQR Thanh Toán'}
              </h2>
              <p className="text-xs text-amber-100">
                {isEn ? 'System automatically confirms once the transfer is detected' : 'Hệ thống tự động kiểm tra và chuyển tiếp ngay khi tiền vào tài khoản'}
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl text-center shrink-0 border border-white/20">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">
              {isEn ? 'Hold time remaining' : 'Thời gian giữ chỗ còn'}
            </span>
            <span className="font-mono text-xl sm:text-2xl font-black tracking-wider text-white">
              {formatTimer(timeLeft)}
            </span>
          </div>
        </div>

        {/* Main Grid: QR Code & Transfer Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: VietQR Image & Scan Frame (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-md flex flex-col items-center justify-between text-center">
            <div className="w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isEn ? 'Dynamic VietQR • Napas 247' : 'Mã VietQR Động Chuẩn Napas 247'}</span>
              </div>

              {/* QR Image Box */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto p-3 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-300 shadow-inner flex items-center justify-center">
                <Image
                  src={order.qrCodeUrl}
                  alt={`VietQR ${order.amount}`}
                  fill
                  priority
                  unoptimized
                  className="object-contain p-2"
                />
              </div>

              <p className="text-xs text-stone-500 mt-3 font-medium">
                {isEn 
                  ? 'Scan code with any banking app to auto-fill amount and transfer reference' 
                  : 'Quét mã bằng app ngân hàng bất kỳ để tự động điền số tiền và nội dung'}
              </p>
            </div>

            {/* Mock Mode Notice & Fast Simulation Button */}
            <div className="w-full mt-6 pt-4 border-t border-stone-100">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-left mb-3">
                <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {isEn ? 'Testing Environment (Test Mode)' : 'Môi Trường Thử Nghiệm (Test Mode)'}
                </span>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                  {isEn 
                    ? 'If testing without real banking transfer, click below to simulate instant payment confirmation.' 
                    : 'Nếu bạn đang chạy thử nghiệm mà không thực hiện chuyển khoản thật, hãy nhấn nút bên dưới để mô phỏng hoàn tất thanh toán.'}
                </p>
              </div>

              <button
                onClick={handleSimulatePaymentSuccess}
                disabled={isSimulating}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5 disabled:opacity-70"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isEn ? 'Verifying...' : 'Đang xác thực...'}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>{isEn ? 'Simulate Successful Payment' : 'Mô Phỏng Khách Đã Thanh Toán Thành Công'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Bank Details & Instructions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Account Details Card */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md">
              <h3 className="text-base font-black text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center justify-between">
                <span>{isEn ? 'Bank Transfer Details' : 'Thông Tin Chuyển Khoản Ngân Hàng'}</span>
                <span className="text-xs font-normal text-stone-500">{isEn ? 'Use exact transfer memo' : 'Chuyển chính xác nội dung'}</span>
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                {/* Bank Name */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500">{isEn ? 'Beneficiary Bank:' : 'Ngân hàng thụ hưởng:'}</span>
                  <strong className="text-stone-900">{order.bankName}</strong>
                </div>

                {/* Account Number */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div>
                    <span className="text-stone-500 block text-xs">{isEn ? 'Account Number:' : 'Số tài khoản:'}</span>
                    <strong className="text-stone-900 font-mono text-base">{order.accountNumber}</strong>
                  </div>
                  <button
                    onClick={() => handleCopy(order.accountNumber, 'accountNumber')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:border-emerald-600 text-stone-700 text-xs font-semibold shadow-sm transition-colors"
                  >
                    {copiedField === 'accountNumber' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">{isEn ? 'Copied' : 'Đã chép'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>{isEn ? 'Copy' : 'Sao chép'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Account Holder Name */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500">{isEn ? 'Account Holder:' : 'Chủ tài khoản:'}</span>
                  <strong className="text-stone-900 uppercase font-mono">{order.accountName}</strong>
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div>
                    <span className="text-emerald-800 block text-xs font-semibold">{isEn ? 'Amount to transfer:' : 'Số tiền cần chuyển:'}</span>
                    <strong className="text-emerald-800 font-black text-xl">
                      {formatCurrency(order.amount, language)}
                    </strong>
                  </div>
                  <button
                    onClick={() => handleCopy(String(order.amount), 'amount')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    {copiedField === 'amount' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Copied' : 'Đã chép'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Copy amount' : 'Sao chép số tiền'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Transfer Content */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                  <div>
                    <span className="text-amber-900 block text-xs font-semibold">
                      {isEn ? 'Transfer Memo (Mandatory):' : 'Nội dung chuyển khoản (Bắt buộc):'}
                    </span>
                    <strong className="text-amber-950 font-mono text-base tracking-wider">
                      {order.paymentContent}
                    </strong>
                  </div>
                  <button
                    onClick={() => handleCopy(order.paymentContent, 'content')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    {copiedField === 'content' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Copied' : 'Đã chép'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Copy' : 'Sao chép'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Step Instruction Card */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">
                {isEn ? '3 Quick Payment Steps' : '3 Bước Thanh Toán Nhanh'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                    1
                  </div>
                  <h5 className="font-bold text-xs text-stone-900 mb-1">
                    {isEn ? 'Open Bank App' : 'Mở App Ngân Hàng'}
                  </h5>
                  <p className="text-[11px] text-stone-500">
                    {isEn ? 'Open Vietcombank, MB, Techcombank, MoMo or any bank app.' : 'Mở Vietcombank, MB, Techcombank, MoMo hoặc app ngân hàng bất kỳ.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                    2
                  </div>
                  <h5 className="font-bold text-xs text-stone-900 mb-1">
                    {isEn ? 'Scan VietQR' : 'Quét Mã VietQR'}
                  </h5>
                  <p className="text-[11px] text-stone-500">
                    {isEn ? 'Choose QR scan in your app and scan the code on the left.' : 'Bấm tính năng quét mã QR trên ứng dụng và quét mã bên trái.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                    3
                  </div>
                  <h5 className="font-bold text-xs text-stone-900 mb-1">
                    {isEn ? 'Confirm & Get Ticket' : 'Xác Nhận & Nhận Vé'}
                  </h5>
                  <p className="text-[11px] text-stone-500">
                    {isEn ? 'Check the amount and confirm. Screen updates in 3-5 seconds!' : 'Kiểm tra đúng số tiền và bấm chuyển. Màn hình sẽ tự động cập nhật!'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
          <div className="text-center p-8 bg-white rounded-3xl border border-stone-200 shadow-xl max-w-sm w-full">
            <RefreshCw className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-4" />
            <h2 className="text-lg font-bold text-stone-900">Đang khởi tạo phiên thanh toán...</h2>
          </div>
        </div>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}
