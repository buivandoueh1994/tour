import { NextRequest, NextResponse } from 'next/server';
import { getOrder, updateOrderStatus } from '@/lib/orderStore';
import { payOS, isPayOSConfigured } from '@/lib/payos';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderCodeStr = searchParams.get('orderCode');

    if (!orderCodeStr) {
      return NextResponse.json({ success: false, message: 'Thiếu mã đơn hàng orderCode' }, { status: 400 });
    }

    const orderCode = Number(orderCodeStr);
    let order = getOrder(orderCode);

    if (!order) {
      return NextResponse.json({ success: false, message: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }

    // Nếu cấu hình PayOS thật và trạng thái hiện tại đang là PENDING, kiểm tra trực tiếp qua PayOS
    if (isPayOSConfigured && payOS && order.status === 'PENDING') {
      try {
        const paymentInfo = await payOS.paymentRequests.get(orderCode);
        if (paymentInfo.status === 'PAID') {
          order = updateOrderStatus(orderCode, 'PAID');
        } else if (paymentInfo.status === 'CANCELLED') {
          order = updateOrderStatus(orderCode, 'CANCELLED');
        }
      } catch (err) {
        // Log và giữ nguyên trạng thái local
        console.warn('Không thể truy vấn trạng thái từ PayOS:', err);
      }
    }

    return NextResponse.json({
      success: true,
      status: order?.status || 'PENDING',
      order,
    });
  } catch (error: unknown) {
    console.error('Error checking payment status:', error);
    const message = error instanceof Error ? error.message : 'Lỗi kiểm tra trạng thái thanh toán';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
