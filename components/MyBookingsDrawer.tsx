'use client';

import React from 'react';
import Link from 'next/link';
import { X, CalendarCheck, Clock, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { formatCurrency } from '@/lib/utils';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyBookingsDrawer({ isOpen, onClose }: MyBookingsDrawerProps) {
  const { recentOrders } = useBooking();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Đơn Đặt Chỗ Của Tôi</h3>
              <p className="text-xs text-stone-500">{recentOrders.length} đơn được lưu trên thiết bị</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {recentOrders.length === 0 ? (
            <div className="text-center py-16 text-stone-500">
              <CalendarCheck className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="font-semibold text-sm">Chưa có đơn đặt tour nào</p>
              <p className="text-xs text-stone-400 mt-1">
                Hãy chọn một hành trình khám phá Hà Giang và đặt ngay nhé!
              </p>
            </div>
          ) : (
            recentOrders.map((order) => {
              const isPaid = order.status === 'PAID';
              return (
                <div
                  key={order.orderCode}
                  className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 bg-stone-50/50 hover:bg-stone-50 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-stone-500 block">
                        Mã đơn: #{order.orderCode}
                      </span>
                      <h4 className="font-bold text-sm text-stone-900 leading-snug mt-0.5">
                        {order.tourTitle}
                      </h4>
                    </div>
                    {isPaid ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Đã thanh toán
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Chờ thanh toán
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-stone-600 space-y-1 pt-2 border-t border-stone-200/60">
                    <div className="flex justify-between">
                      <span>Khách hàng:</span>
                      <strong className="text-stone-800">{order.customerInfo.fullName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Khởi hành:</span>
                      <span className="text-stone-800 font-medium">{order.customerInfo.departureDate} ({order.customerInfo.guests} khách)</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1">
                      <span>Tổng tiền:</span>
                      <strong className="text-emerald-700 text-sm font-black">
                        {formatCurrency(order.amount)}
                      </strong>
                    </div>
                  </div>

                  <Link
                    href={`/payment-status?orderCode=${order.orderCode}`}
                    onClick={onClose}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      isPaid
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-amber-500 hover:bg-amber-600 text-white'
                    }`}
                  >
                    <span>{isPaid ? 'Xem Voucher Điện Tử' : 'Quét Mã VietQR Ngay'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 text-center">
          <p className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-stone-400" />
            Cần hỗ trợ đơn hàng? Gọi ngay 0988.333.888
          </p>
        </div>
      </div>
    </div>
  );
}
