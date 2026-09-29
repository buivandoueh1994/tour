import type { Metadata } from 'next';
import './globals.css';
import { BookingProvider } from '@/context/BookingContext';

export const metadata: Metadata = {
  title: 'Hà Giang Loop Expedition - Chinh Phục Mảnh Đất Địa Đầu Tổ Quốc | Đặt Tour & VietQR',
  description: 'Chuyên tổ chức tour Hà Giang Loop: Xe máy tự lái, Easy Rider bản địa, Tour Limousine gia đình & Trekking Mã Pí Lèng. Thanh toán VietQR động xác nhận tức thì.',
  keywords: ['Hà Giang Loop', 'Tour Hà Giang', 'Easy Rider Hà Giang', 'Mã Pí Lèng', 'Sông Nho Quế', 'VietQR', 'PayOS'],
  openGraph: {
    title: 'Hà Giang Loop Expedition - Chinh Phục Mảnh Đất Địa Đầu Tổ Quốc',
    description: 'Trải nghiệm cung đường đèo hiểm trở và tuyệt mỹ nhất Việt Nam với đội ngũ xế bản địa uy tín.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-500 selection:text-white">
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
