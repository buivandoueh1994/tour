import { NextRequest, NextResponse } from 'next/server';
import { payOS, isPayOSConfigured } from '@/lib/payos';
import { saveOrder } from '@/lib/orderStore';
import { BookingOrder, CreatePaymentRequest } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body: CreatePaymentRequest = await request.json();
    const { tourId, tourTitle, amount, customerInfo } = body;

    if (!tourId || !amount || !customerInfo || !customerInfo.fullName || !customerInfo.phone) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin đặt tour hoặc khách hàng' },
        { status: 400 }
      );
    }

    // PayOS orderCode phải là số nguyên dương an toàn (<= 9007199254740991)
    // Dùng timestamp mili-giây chia lấy 8 số cuối kết hợp số ngẫu nhiên
    const orderCode = Number(String(Date.now()).slice(-6) + Math.floor(10 + Math.random() * 89));
    const paymentContent = `HGLOOP ${orderCode}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    let qrCodeUrl = '';
    let accountNumber = '0987654321';
    let accountName = 'CONG TY DU LICH HA GIANG LOOP';
    let bankName = 'MB Bank (Ngân hàng Quân Đội)';
    let checkoutUrl = '';
    let isMock = true;

    if (isPayOSConfigured && payOS) {
      try {
        const paymentLinkRes = await payOS.paymentRequests.create({
          orderCode,
          amount,
          description: paymentContent,
          returnUrl: `${baseUrl}/payment-status?orderCode=${orderCode}&status=PAID`,
          cancelUrl: `${baseUrl}/payment-status?orderCode=${orderCode}&status=CANCELLED`,
        });

        qrCodeUrl = paymentLinkRes.qrCode;
        accountNumber = paymentLinkRes.accountNumber;
        accountName = paymentLinkRes.accountName;
        bankName = 'MB Bank';
        checkoutUrl = paymentLinkRes.checkoutUrl;
        isMock = false;
      } catch (payOsError) {
        console.warn('PayOS API lỗi hoặc chưa cấu hình hợp lệ, tự động chuyển về VietQR Fallback Mock:', payOsError);
        isMock = true;
      }
    }

    // Nếu không cấu hình PayOS hoặc PayOS trả về lỗi -> Dùng VietQR Mock chuẩn Napas
    if (isMock) {
      // Tạo mã VietQR chuẩn qua gateway img.vietqr.io
      qrCodeUrl = `https://img.vietqr.io/image/MB-0987654321-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
        paymentContent
      )}&accountName=${encodeURIComponent(accountName)}`;
      checkoutUrl = `/payment-status?orderCode=${orderCode}`;
    }

    const order: BookingOrder = {
      orderCode,
      tourId,
      tourTitle,
      amount,
      customerInfo,
      status: 'PENDING',
      qrCodeUrl,
      bankName,
      accountNumber,
      accountName,
      paymentContent,
      createdAt: new Date().toISOString(),
      isMock,
    };

    // Lưu vào in-memory store
    saveOrder(order);

    return NextResponse.json({
      success: true,
      orderCode,
      qrCodeUrl,
      accountNumber,
      accountName,
      bankName,
      amount,
      paymentContent,
      checkoutUrl,
      isMock,
      order,
    });
  } catch (error: unknown) {
    console.error('Error creating payment link:', error);
    const message = error instanceof Error ? error.message : 'Lỗi hệ thống khi tạo liên kết thanh toán';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
