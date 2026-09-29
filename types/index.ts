export type TransportType = 'motorbike' | 'easy-rider' | 'limousine' | 'trekking' | 'rental';

export type TourDifficulty = 'Dễ' | 'Trung bình' | 'Thử thách' | 'Nhiều đèo dốc';

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  stay: string;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  duration: string;
  transportType: TransportType;
  transportLabel: string;
  difficulty: TourDifficulty;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  tag: string; // e.g. "Bán chạy nhất", "Mạo hiểm", "Gia đình"
  badgeColor?: string;
  shortDesc: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  vehicleOptions?: string[];
}

export interface BookingCustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  departureDate: string;
  guests: number;
  notes?: string;
  vehicleChoice?: string;
}

export interface BookingOrder {
  orderCode: number;
  tourId: string;
  tourTitle: string;
  amount: number;
  customerInfo: BookingCustomerInfo;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  qrCodeUrl: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  paymentContent: string;
  createdAt: string;
  paidAt?: string;
  isMock: boolean;
}

export interface CreatePaymentRequest {
  tourId: string;
  tourTitle: string;
  amount: number;
  customerInfo: BookingCustomerInfo;
}

export interface CreatePaymentResponse {
  success: boolean;
  orderCode: number;
  qrCodeUrl: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  amount: number;
  paymentContent: string;
  checkoutUrl?: string;
  isMock: boolean;
  message?: string;
}
