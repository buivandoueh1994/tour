# Hà Giang Loop Expedition - Website Đặt Tour & Thanh Toán VietQR (PayOS)

Hệ thống website mock đặt tour du lịch Hà Giang Loop hoàn chỉnh, xây dựng bằng **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, biểu tượng **Lucide-react**, và tích hợp cổng thanh toán **VietQR / PayOS**.

---

## 🌟 Tính Năng Nổi Bật

### 1. Landing Page & Giao Diện Hiện Đại
- **Hero Section:** Tiêu đề cuốn hút *"Chinh phục Hà Giang Loop - Mảnh đất địa đầu Tổ quốc"*, nút CTA chuyển nhanh đến danh sách tour và tư vấn Zalo 24/7, ảnh nền chất lượng cao và thanh thống kê uy tín (15.000+ phượt thủ, 100% bảo hiểm, 4.9/5 sao).
- **Cam Kết Dịch Vụ:** 4 trụ cột an toàn: Bảo hiểm du lịch 100.000.000đ/vụ, xế bản địa kiêm photographer, đội cứu hộ kỹ thuật 24/7 trên toàn tuyến Loop, thanh toán VietQR Napas 247 tức thì.
- **5 Gói Tour & Dịch Vụ Mẫu:**
  1. *Tour Hà Giang Loop - Xe máy Tự Lái (3N2Đ)*: 2.890.000đ
  2. *Tour Hà Giang Easy Rider - Có Xế Bản Địa Cứng Kèm (3N2Đ)*: 3.990.000đ
  3. *Tour Khám Phá Cao Nguyên Đá - Xe Limousine / Ô tô (4N3Đ)*: 4.850.000đ
  4. *Tour Trekking Đệ Nhất Hùng Quan & Chèo Kayak Hẻm Tu Sản (2N1Đ)*: 2.150.000đ
  5. *Cho Thuê Xe Côn Tay / Xe Số Phượt & Full Set Giáp Bảo Hộ*: 250.000đ/ngày
- **Bộ Lọc Nhanh:** Lọc theo phân loại (Xe máy tự lái, Easy Rider, Limousine, Trekking, Thuê xe), tìm kiếm theo từ khóa địa danh (Mã Pí Lèng, Nho Quế...), và sắp xếp giá/đánh giá.
- **Cẩm Nang & Trải Nghiệm:** Hướng dẫn 4 mùa đẹp nhất tại Hà Giang, danh sách hành trang chuẩn bị, đánh giá thực tế từ khách du lịch và hỏi đáp FAQ.

### 2. Modal & Form Đặt Tour (Booking Drawer)
- **Tab 1 - Chi tiết & Tiện ích:** Xem chi tiết lịch trình từng ngày (hoạt động, bữa ăn, điểm nghỉ) cùng danh sách những gì đã bao gồm và chưa bao gồm.
- **Tab 2 - Đặt Tour & Điền thông tin:**
  * Chọn ngày khởi hành (Date picker từ ngày mai).
  * Bộ đếm số lượng khách (+/-) tự động nhân tổng tiền theo thời gian thực.
  * Lựa chọn dòng xe (đối với dịch vụ thuê xe).
  * Nhập họ tên, số điện thoại Zalo, email, ghi chú đặc biệt.
  * Bảng tóm tắt chi phí trực quan và nút bấm tiến hành thanh toán VietQR.

### 3. Luồng Thanh Toán VietQR PayOS Động
- **Khởi tạo thanh toán động:** API `/api/payment/create-payment-link` tạo đơn hàng, tự động gọi PayOS SDK nếu có cấu hình keys hoặc kích hoạt chế độ **Fallback Mock VietQR** chuẩn Napas 247.
- **Màn hình Trạng thái Thanh toán (`/payment-status`):**
  * **Trạng thái "Đang chờ thanh toán" (PENDING):**
    - Đồng hồ đếm ngược 15:00 phút đếm ngược chính xác theo từng giây.
    - Mã VietQR động hiển thị sắc nét cùng hiệu ứng quét QR.
    - Thông tin ngân hàng: MB Bank, Số tài khoản, Chủ tài khoản, Số tiền, Nội dung chuyển khoản.
    - Nút sao chép 1 chạm (Copy) kèm thông báo toast phản hồi ngay.
    - Hướng dẫn 3 bước quét QR app ngân hàng.
    - Hệ thống Polling tự động kiểm tra mỗi 3 giây qua API `/api/payment/check-status`.
    - Nút giả lập: **"⚡ Mô phỏng khách đã thanh toán thành công"** để trải nghiệm ngay lập tức trên môi trường dev/demo.
  * **Trạng thái "Thanh toán thành công!" (PAID):**
    - Hiệu ứng pháo hoa ăn mừng (Confetti)!
    - Phiếu Đặt Chỗ Điện Tử (**Booking E-Voucher**) đầy đủ mã đặt chỗ, thông tin khách, chi tiết lịch trình, hướng dẫn đón tiếp tại TP Hà Giang.
    - Nút **In / Tải Voucher (PDF)** và nút quay về trang chủ.
- **Lịch Sử Đơn Của Tôi (My Bookings Drawer):** Cho phép xem lại các đơn đặt chỗ đã lưu trên trình duyệt, mở lại mã QR hoặc xem lại voucher bất kỳ lúc nào.

---

## 📁 Cấu Trúc Thư Mục

```
travel/
├── app/
│   ├── api/
│   │   └── payment/
│   │       ├── check-status/route.ts       # API Polling kiểm tra trạng thái thanh toán
│   │       ├── create-payment-link/route.ts # API Tạo link thanh toán VietQR PayOS
│   │       ├── simulate-success/route.ts   # API Giả lập thanh toán thành công
│   │       └── webhook/route.ts            # API Webhook PayOS & mock webhook
│   ├── payment-status/
│   │   └── page.tsx                        # Trang thanh toán VietQR, đếm ngược & E-Voucher
│   ├── globals.css                         # CSS tùy chỉnh, animations & in ấn Voucher
│   ├── layout.tsx                          # Root Layout bọc BookingProvider & SEO
│   └── page.tsx                            # Landing Page chính
├── components/
│   ├── BookingModal.tsx                    # Modal xem lịch trình & form đặt tour
│   ├── FaqSection.tsx                      # Câu hỏi thường gặp
│   ├── Features.tsx                        # 4 cam kết an toàn & chất lượng
│   ├── Footer.tsx                          # Chân trang thông tin pháp nhân & văn phòng
│   ├── GuideSection.tsx                    # Cẩm nang 4 mùa & checklist hành trang
│   ├── Hero.tsx                            # Hero banner & số liệu thống kê
│   ├── MyBookingsDrawer.tsx                # Drawer lịch sử đơn đặt chỗ của tôi
│   ├── Navbar.tsx                          # Thanh điều hướng sticky & hotline 24/7
│   ├── ReviewsSection.tsx                  # Đánh giá từ du khách
│   ├── TourCard.tsx                        # Card hiển thị tour du lịch
│   └── TourList.tsx                        # Danh sách tour, tìm kiếm & bộ lọc
├── context/
│   └── BookingContext.tsx                  # Quản lý state giỏ hàng, modal & đơn gần đây
├── data/
│   └── tours.ts                            # 5 gói tour mẫu, reviews & stats
├── lib/
│   ├── orderStore.ts                       # In-memory order storage
│   ├── payos.ts                            # Khởi tạo PayOS SDK v2 & kiểm tra cấu hình
│   └── utils.ts                            # Định dạng tiền tệ VND & ngày giờ
├── types/
│   └── index.ts                            # TypeScript types (Tour, Booking, Payment)
├── .env.example                            # Mẫu biến môi trường
├── .env.local                              # Biến môi trường local
├── next.config.mjs                         # Cấu hình Next.js (remotePatterns)
├── package.json                            # Danh sách thư viện phụ thuộc
├── tailwind.config.ts                      # Cấu hình Tailwind CSS
└── tsconfig.json                           # Cấu hình TypeScript
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Cấu hình Biến Môi Trường
File `.env.example`:
```env
# PayOS API Credentials (Đăng ký tại https://payos.vn)
PAYOS_CLIENT_ID=your_client_id
PAYOS_API_KEY=your_api_key
PAYOS_CHECKSUM_KEY=your_checksum_key

# Public App Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
> **Lưu ý:** Nếu bạn để trống các biến `PAYOS_*` trong `.env.local`, hệ thống sẽ **tự động chuyển sang chế độ Mock VietQR thông minh**, hiển thị mã QR MB Bank chuẩn Napas và cho phép thử nghiệm đầy đủ bằng nút mô phỏng thanh toán!

### 3. Chạy Server Phát Triển (Development)
```bash
npm run dev
```
Truy cập tại: `http://localhost:3000`

### 4. Build & Chạy Production
```bash
npm run build
npm run start
```
