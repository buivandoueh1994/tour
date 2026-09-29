import { NextRequest, NextResponse } from 'next/server';
import { payOS, isPayOSConfigured } from '@/lib/payos';
import { updateOrderStatus, getOrder } from '@/lib/orderStore';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Kiểm tra nếu là webhook PayOS thật
    if (isPayOSConfigured && payOS) {
      try {
        const webhookData = await payOS.webhooks.verify(body);
        if (webhookData && webhookData.orderCode) {
          updateOrderStatus(webhookData.orderCode, 'PAID');
          return NextResponse.json({ success: true, message: 'PayOS Webhook verified' });
        }
      } catch (verifyError) {
        console.warn('Xác thực PayOS Webhook thất bại hoặc là webhook test:', verifyError);
      }
    }

    // 2. Mock Webhook Handler
    // Nếu payload có data.orderCode hoặc orderCode
    const orderCode = body?.data?.orderCode || body?.orderCode;
    if (orderCode) {
      const order = getOrder(Number(orderCode));
      if (order) {
        updateOrderStatus(Number(orderCode), 'PAID');
        return NextResponse.json({
          success: true,
          message: `Đơn hàng #${orderCode} đã cập nhật sang trạng thái PAID qua Webhook`,
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Webhook received' });
  } catch (error: unknown) {
    console.error('Lỗi xử lý webhook:', error);
    return NextResponse.json({ success: false, message: 'Lỗi xử lý webhook' }, { status: 500 });
  }
}
