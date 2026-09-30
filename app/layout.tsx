import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { BookingProvider } from '@/context/BookingContext';
import { LanguageProvider } from '@/context/LanguageContext';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-be-vietnam-pro',
});

export const metadata: Metadata = {
  title: 'HÀ GIANG LOOP - Local & Authentic Adventure | Đặt Tour & Thanh Toán VietQR',
  description: 'Chuyên tổ chức tour Hà Giang Loop bản địa: Xe máy tự lái, Easy Rider bản địa cứng tay lái, Limousine gia đình & Trekking Mã Pí Lèng. Bảo hiểm 100tr, cứu hộ 24/7, thanh toán VietQR động tức thì.',
  keywords: ['Hà Giang Loop', 'Tour Hà Giang', 'Easy Rider Hà Giang', 'Mã Pí Lèng', 'Sông Nho Quế', 'VietQR', 'PayOS', 'Hẻm Tu Sản'],
  openGraph: {
    title: 'HÀ GIANG LOOP - Local & Authentic Adventure',
    description: 'Chinh phục cung đường đèo hiểm trở và tuyệt mỹ nhất Việt Nam với đội ngũ xế bản địa uy tín.',
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
    <html lang="vi" className={`scroll-smooth ${beVietnamPro.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white pb-16 md:pb-0">
        <LanguageProvider>
          <BookingProvider>
            {children}
          </BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
