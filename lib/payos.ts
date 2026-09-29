import { PayOS } from '@payos/node';

const clientId = process.env.PAYOS_CLIENT_ID;
const apiKey = process.env.PAYOS_API_KEY;
const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

// Kiểm tra xem PayOS credentials có được cấu hình hợp lệ hay không
export const isPayOSConfigured = Boolean(
  clientId &&
  apiKey &&
  checksumKey &&
  clientId.trim() !== '' &&
  !clientId.includes('your_client_id')
);

let payOSInstance: PayOS | null = null;

if (isPayOSConfigured) {
  try {
    payOSInstance = new PayOS({
      clientId: clientId!,
      apiKey: apiKey!,
      checksumKey: checksumKey!,
    });
  } catch (error) {
    console.warn('Không thể khởi tạo PayOS instance, chuyển sang chế độ Mock VietQR:', error);
  }
}

export const payOS = payOSInstance;
