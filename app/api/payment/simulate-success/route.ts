import { NextRequest, NextResponse } from 'next/server';
import { getOrder, updateOrderStatus } from '@/lib/orderStore';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderCode } = body;

    if (!orderCode) {
      return NextResponse.json({ success: false, message: 'Thiếu orderCode' }, { status: 400 });
    }

    const numOrderCode = Number(orderCode);
    const existing = getOrder(numOrderCode);

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }

    const updated = updateOrderStatus(numOrderCode, 'PAID');

    return NextResponse.json({
      success: true,
      message: 'Mô phỏng thanh toán thành công!',
      order: updated,
    });
  } catch (error: unknown) {
    console.error('Error simulating payment success:', error);
    const message = error instanceof Error ? error.message : 'Lỗi hệ thống';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
