import { BookingOrder } from '@/types';

// Lưu trữ các đơn đặt hàng trong bộ nhớ server
declare global {
  // eslint-disable-next-line no-var
  var __orderStore: Map<number, BookingOrder> | undefined;
}

if (!globalThis.__orderStore) {
  globalThis.__orderStore = new Map<number, BookingOrder>();
}

export const orderStore = globalThis.__orderStore;

export function saveOrder(order: BookingOrder): void {
  orderStore.set(order.orderCode, order);
}

export function getOrder(orderCode: number): BookingOrder | undefined {
  return orderStore.get(orderCode);
}

export function updateOrderStatus(orderCode: number, status: 'PENDING' | 'PAID' | 'CANCELLED'): BookingOrder | undefined {
  const order = orderStore.get(orderCode);
  if (order) {
    order.status = status;
    if (status === 'PAID') {
      order.paidAt = new Date().toISOString();
    }
    orderStore.set(orderCode, order);
    return order;
  }
  return undefined;
}
