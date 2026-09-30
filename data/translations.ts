import { Language } from '@/types';

export const TRANSLATIONS = {
  vi: {
    // Top Bar & Navbar
    topBarInsurance: 'Bảo hiểm 100%',
    topBarDeparture: 'Khởi hành hàng ngày từ Hà Nội & TP Hà Giang',
    topBarEmergency: 'Hỗ trợ khẩn cấp 24/7:',
    navTours: 'Tour',
    navHighlights: 'Trải Nghiệm',
    navGuide: 'Cẩm Nang',
    navReviews: 'Đánh Giá',
    navFaq: 'FAQ',
    myBookings: 'Đơn của tôi',
    hotlineZalo: 'Hotline / Zalo',
    brandSubtext: 'Bản địa • Độc bản • An toàn',
    switchLangPrompt: 'English',

    // Hero Section
    heroBadge: '🏆 Top 1 Đơn Vị Tổ Chức Tour Hà Giang Loop Bản Địa Uy Tín',
    heroTitlePrefix: 'Chinh Phục',
    heroTitleHighlight: 'Hà Giang Loop',
    heroTitleSuffix: 'Mảnh Đất Địa Đầu Tổ Quốc',
    heroSubtitle:
      'Uốn lượn qua những khúc cua huyền thoại, chạm đỉnh đèo Mã Pí Lèng hùng vĩ và thả hồn trên dòng sông Nho Quế màu xanh ngọc bích. Hành trình phiêu lưu an toàn, đậm đà bản sắc cùng đội ngũ thổ địa tận tâm.',
    heroCtaTours: 'Xem Danh Sách Tour',
    heroCtaZalo: 'Tư Vấn Zalo 24/7',
    trustInsurance: 'Bảo hiểm du lịch 100tr/khách',
    trustBikes: 'Xe máy & Giáp bảo hộ đời mới 100%',
    trustDrivers: 'Xế bản địa cứng tay lái & am hiểu văn hóa',
    trustQr: 'Quét VietQR nhận vé tức thì',

    // Stats
    statTravelersLabel: 'Du khách đồng hành',
    statInsuranceLabel: 'Đã gồm bảo hiểm chuyến đi',
    statRatingLabel: 'Hơn 4,000 đánh giá thực tế',
    statRescueLabel: 'Cứu hộ khẩn cấp dọc cung Loop',

    // Features Section
    featuresTag: 'Giá Trị Cốt Lõi & Cam Kết',
    featuresTitle: 'Trải Nghiệm Đỉnh Cao Với Tiêu Chuẩn An Toàn Khắt Khe',
    featuresSubtitle:
      'Hà Giang Loop là cung đường phiêu lưu mạo hiểm, sự chuẩn bị chu đáo và an toàn của bạn luôn là kim chỉ nam trong mọi hành trình của chúng tôi.',
    feat1Title: 'Cam Kết An Toàn & Bảo Hiểm 100Tr',
    feat1Desc:
      'Tất cả du khách được trang bị bảo hiểm du lịch Bảo Việt trách nhiệm 100.000.000đ/vụ. Trang bị giáp bảo hộ 4 món và mũ bảo hiểm 3/4 đạt chuẩn an toàn cao nhất.',
    feat1Badge: 'An Toàn Tuyệt Đối',
    feat2Title: 'Xế Bản Địa (Easy Rider) Cứng Tay Lái & Có Tâm',
    feat2Desc:
      "Đội ngũ tài xế người H'Mông, Tày, Dao sinh ra tại dốc đá, am hiểu từng khúc cua tay áo, kiêm thợ chụp ảnh check-in sống ảo và hướng dẫn viên nhiệt tình.",
    feat2Badge: 'Bản Địa 100%',
    feat3Title: 'Cứu Hộ Dọc Tuyến 24/7 Trong 45 Phút',
    feat3Desc:
      'Mạng lưới trạm kỹ thuật cứu hộ túc trực tại Quản Bạ, Yên Minh, Đồng Văn và Mèo Vạc. Cam kết hỗ trợ đổi xe, vá xe hoặc xử lý sự cố trong vòng 45 phút.',
    feat3Badge: 'Phản Ứng Nhanh',
    feat4Title: 'Thanh Toán VietQR Tiện Lợi & Minh Bạch',
    feat4Desc:
      'Tích hợp cổng thanh toán VietQR & PayOS Napas247 tự động. Quét mã bằng bất kỳ ứng dụng ngân hàng nào, nhận voucher xác nhận đặt tour ngay sau 5 giây.',
    feat4Badge: 'Xác Nhận Tức Thì',

    // Tour List & Filter
    toursTag: 'Lộ Trình Độc Bản',
    toursTitle: 'Chọn Hành Trình Khám Phá Hà Giang Của Bạn',
    toursSubtitle:
      'Từ trải nghiệm tự cầm lái ôm cua, ngồi sau xế bản địa ngắm cảnh đến tour Limousine nghỉ dưỡng gia đình.',
    catAll: 'Tất Cả Gói Tour',
    catMotorbike: 'Xe Máy Tự Lái',
    catEasyRider: 'Easy Rider (Có Xế Kèm)',
    catLimousine: 'Ô Tô / Limousine',
    catTrekking: 'Trekking & Kayak',
    catRental: 'Thuê Xe Phượt',
    searchPlaceholder: 'Tìm tour, địa danh (Mã Pí Lèng, Nho Quế...)',
    sortByLabel: 'Sắp xếp:',
    sortRecommended: 'Đề xuất phổ biến',
    sortPriceAsc: 'Giá: Thấp đến Cao',
    sortPriceDesc: 'Giá: Cao đến Thấp',
    sortRating: 'Đánh giá cao nhất',
    noToursFound: 'Không tìm thấy tour phù hợp với yêu cầu tìm kiếm của bạn.',
    viewAllTours: 'Xem tất cả tour',

    // Tour Card
    priceFromLabel: 'Giá trọn gói từ:',
    perPerson: '/ khách',
    inclusiveNote: '(Trọn gói xe, ăn nghỉ, bảo hiểm)',
    viewItinerary: 'Xem Lịch Trình',
    bookTourNow: 'Đặt Tour Ngay',

    // Guide & Checklist
    guideTag: 'Cẩm Nang Phượt Bản Địa',
    guideTitle: 'Kinh Nghiệm & Checklist Hành Trang Đi Hà Giang',
    guideSubtitle:
      'Nắm vững các mùa đẹp nhất trong năm và hành trang cần thiết để chuyến chinh phục Loop của bạn an toàn, trọn vẹn và đáng nhớ.',
    checklistHeaderTag: 'Hành Trang Trước Giờ Lăn Bánh',
    checklistHeaderTitle: 'Bảng Checklist So Sánh Chuẩn Bị',
    checklistHeaderSub:
      'Đảm bảo tính minh bạch, tiện lợi để bạn không phải lo lắng bất cứ thiếu sót nào.',
    col1Heading: 'Đã có sẵn bởi ban tổ chức',
    col1Sub: '(Đã bao gồm trọn gói trong giá tour)',
    col1Note: '🛡️ Đã được kiểm định chất lượng & vệ sinh khử khuẩn trước mỗi chuyến đi.',
    col2Heading: 'Du khách cần mang theo',
    col2Sub: '(Hành lý cá nhân gọn nhẹ, tiện dụng)',
    col2Note: 'Nên để lại vali to tại văn phòng TP Hà Giang, chỉ mang balo nhỏ đi Loop.',

    // Reviews
    reviewsTag: 'Trải Nghiệm Thực Tế',
    reviewsTitle: 'Khách Hàng Nói Gì Về Chuyến Đi?',
    reviewsSubtitle:
      'Hơn 15,000 du khách trong và ngoài nước đã gửi trọn niềm tin và sự hài lòng tuyệt đối cho đội ngũ của chúng tôi.',
    verifiedTrip: 'Đã xác thực chuyến đi',

    // FAQ
    faqTag: 'Giải Đáp Thắc Mắc',
    faqTitle: 'Câu Hỏi Thường Gặp (FAQ)',
    faqSubtitle:
      'Những thông tin cần biết để bạn hoàn toàn an tâm tận hưởng trọn vẹn chuyến phiêu lưu Hà Giang Loop.',

    // Sticky Mobile Bar
    stickyCall: 'Hotline / Zalo',
    stickyBook: 'Đặt Tour Ngay',

    // Chatbot
    botTooltip: 'Hỏi mình về thời tiết & kinh nghiệm đi Loop nhé! 👋',
    botFabLabel: 'Hỏi AI Hà Giang',
    botHeaderTitle: 'Hà Giang Tourism AI',
    botHeaderSub: 'Cẩm nang du lịch bản địa',
    botInputPlaceholder: 'Hỏi về thời tiết, đèo Mã Pí Lèng, kinh nghiệm đi tour...',
    botInitialGreeting: 'Xin chào! Tôi là trợ lý du lịch AI Hà Giang Loop. Bạn cần tư vấn về thời tiết, kinh nghiệm chọn tour hay lịch trình đi phượt nào?',

    // Footer
    footerCompanyName:
      'CÔNG TY TNHH DU LỊCH & KHÁM PHÁ HÀ GIANG LOOP (HA GIANG LOOP EXPEDITION CO., LTD). Đơn vị tổ chức tour Loop bản địa uy tín, chuyên nghiệp và an toàn hàng đầu Việt Nam.',
    footerLicense: 'GP Lữ hành Quốc tế số: 02-098/2022/TCDL-GPLHQT',
    footerHeadquarters: 'Trụ sở Hà Giang:',
    footerHeadquartersAddr: 'Số 32 Đường Nguyễn Trãi, Phường Minh Khai, TP Hà Giang',
    footerHanoiBranch: 'Văn phòng Hà Nội:',
    footerHanoiBranchAddr: 'Số 18 Ngõ 198 Phố Thái Hà, Đống Đa, Hà Nội',
    footerPaymentTitle: 'Cổng Thanh Toán Điện Tử',
    footerPaymentDesc:
      'Tích hợp công nghệ thanh toán mã VietQR 24/7 và cổng thanh toán quốc gia PayOS. Tự động xác thực giao dịch chỉ sau 3-5 giây.',
    footerCopyright: 'Hà Giang Loop Expedition. Mọi quyền được bảo lưu.',
    footerPrivacy: 'Chính sách bảo mật',
    footerTerms: 'Điều khoản dịch vụ',
    footerRefund: 'Chính sách hoàn huỷ',
    footerRoutesTitle: 'Hành Trình Khám Phá',

    // Booking Modal
    modalTabDetails: 'Chi Tiết Lịch Trình',
    modalTabBook: 'Đặt Tour & Nhận Vé',
    modalHighlights: 'Điểm Nổi Bật Của Tour',
    modalDayPrefix: 'Ngày',
    modalStay: 'Nghỉ đêm:',
    modalMeals: 'Bữa ăn:',
    modalInclusions: 'Dịch Vụ Bao Gồm (Miễn phí)',
    modalExclusions: 'Dịch Vụ Không Bao Gồm',
    modalBookingInfoTitle: 'Thông Tin Đặt Tour & Thanh Toán',
    modalSelectedDate: 'Ngày Khởi Hành Mong Muốn',
    modalGuests: 'Số Lượng Khách (Người)',
    modalSelectVehicle: 'Chọn Loại Xe Mong Muốn',
    modalContactTitle: 'Thông Tin Trưởng Đoàn Nhận Vé',
    modalFullName: 'Họ và Tên',
    modalPhone: 'Số Điện Thoại / Zalo',
    modalEmail: 'Địa Chỉ Email (Nhận voucher)',
    modalNotes: 'Yêu Cầu Đặc Biệt (Ăn chay, điểm đón...)',
    modalUnitPrice: 'Đơn giá tour:',
    modalInsuranceGift: 'Bảo hiểm & Cứu hộ 24/7:',
    modalFreeGift: 'Miễn phí (Tặng kèm)',
    modalTotalPrice: 'Tổng thanh toán:',
    modalTermsAgree:
      'Tôi xác nhận thông tin đã cung cấp là chính xác, đồng ý với quy định an toàn cung đường phượt và chính sách thanh toán VietQR của ban tổ chức.',
    modalSubmitBtn: 'Tiến Hành Thanh Toán VietQR',
    modalSubmitting: 'Đang khởi tạo mã VietQR...',
    modalDynamicQrNote: 'Mã QR động sẽ được tạo tự động với đúng số tiền và nội dung chuyển khoản',
  },
  en: {
    // Top Bar & Navbar
    topBarInsurance: '100% Comprehensive Insurance',
    topBarDeparture: 'Daily Departures from Hanoi & Ha Giang City',
    topBarEmergency: '24/7 Emergency Support:',
    navTours: 'Tours',
    navHighlights: 'Highlights',
    navGuide: 'Travel Guide',
    navReviews: 'Reviews',
    navFaq: 'FAQ',
    myBookings: 'My Bookings',
    hotlineZalo: 'Hotline / WhatsApp',
    brandSubtext: 'Authentic • Epic • Safe',
    switchLangPrompt: 'Tiếng Việt',

    // Hero Section
    heroBadge: '🏆 #1 Authentic Ha Giang Loop Tour Operator',
    heroTitlePrefix: 'Conquer The',
    heroTitleHighlight: 'Ha Giang Loop',
    heroTitleSuffix: "Vietnam's Majestic Frontier",
    heroSubtitle:
      'Navigate legendary mountain hairpins, stand atop majestic Ma Pi Leng Pass, and cruise through the breathtaking emerald waters of Tu San Canyon. Safe, authentic, and unforgettable highland adventures.',
    heroCtaTours: 'Explore Tours',
    heroCtaZalo: 'Chat With Us 24/7',
    trustInsurance: 'Travel insurance 100M VND/guest',
    trustBikes: '100% brand-new motorbikes & gear',
    trustDrivers: 'Skilled local drivers & cultural guides',
    trustQr: 'Instant VietQR ticket confirmation',

    // Stats
    statTravelersLabel: 'Happy Adventurers',
    statInsuranceLabel: 'All Tours Include Insurance',
    statRatingLabel: 'Over 4,000 Verified Reviews',
    statRescueLabel: '24/7 Roadside Assistance Along Loop',

    // Features Section
    featuresTag: 'Core Values & Safety',
    featuresTitle: 'Unforgettable Journeys with Strict Safety Standards',
    featuresSubtitle:
      'The Ha Giang Loop is an exhilarating expedition. Your safety, comfort, and authentic local immersion are our top priorities at every mile.',
    feat1Title: '100M VND Insurance & Total Safety',
    feat1Desc:
      'Every traveler is protected with Bao Viet Travel Insurance (up to 100,000,000 VND coverage). Equipped with 4-piece protective gear sets and certified 3/4 helmets.',
    feat1Badge: 'Maximum Safety',
    feat2Title: 'Skilled Local Easy Riders & Photo Guides',
    feat2Desc:
      "Our native drivers (H'Mong, Tay, Dao) were born on these mountains, know every winding curve, and double as enthusiastic photographers & cultural storytellers.",
    feat2Badge: '100% Native Team',
    feat3Title: '24/7 Roadside Rescue Within 45 Mins',
    feat3Desc:
      'Emergency roadside stations situated across Quan Ba, Yen Minh, Dong Van, and Meo Vac. Quick vehicle replacement or tire repair within 45 minutes.',
    feat3Badge: 'Fast Response',
    feat4Title: 'Seamless VietQR & Instant Confirmation',
    feat4Desc:
      'Integrated dynamic VietQR & Napas247 payments. Scan with any banking app, and receive your verified electronic tour voucher in just 5 seconds.',
    feat4Badge: 'Instant Ticket',

    // Tour List & Filter
    toursTag: 'Signature Itineraries',
    toursTitle: 'Choose Your Ha Giang Loop Expedition',
    toursSubtitle:
      'From thrilling self-drive bikes to relaxed Easy Rider pillion seats and family VIP limousine tours.',
    catAll: 'All Tours',
    catMotorbike: 'Self-Drive Bike',
    catEasyRider: 'Easy Rider (Local Driver)',
    catLimousine: 'VIP Limousine / Car',
    catTrekking: 'Trekking & Kayak',
    catRental: 'Motorbike Rental',
    searchPlaceholder: 'Search tour, location (Ma Pi Leng, Nho Que...)',
    sortByLabel: 'Sort by:',
    sortRecommended: 'Recommended',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortRating: 'Top Rated',
    noToursFound: 'No tours found matching your search criteria.',
    viewAllTours: 'View All Tours',

    // Tour Card
    priceFromLabel: 'All-inclusive from:',
    perPerson: '/ guest',
    inclusiveNote: '(All-inclusive: bikes, lodging, meals & insurance)',
    viewItinerary: 'View Itinerary',
    bookTourNow: 'Book Tour Now',

    // Guide & Checklist
    guideTag: 'Local Travel Guide',
    guideTitle: 'Essential Guide & Packing Checklist for Ha Giang',
    guideSubtitle:
      'Discover the most picturesque seasons and essential packing tips to ensure your loop journey is safe, seamless, and memorable.',
    checklistHeaderTag: 'Pre-Trip Preparation',
    checklistHeaderTitle: 'Comprehensive Gear Checklist',
    checklistHeaderSub:
      'Clear, transparent breakdown of what is provided by us versus what you need to bring.',
    col1Heading: 'Provided by Organizer',
    col1Sub: '(Included with your booking package)',
    col1Note: '🛡️ Thoroughly inspected, cleaned, and sanitized before each journey.',
    col2Heading: 'What Travelers Need to Bring',
    col2Sub: '(Compact, lightweight personal essentials)',
    col2Note: 'Large luggage can be stored securely for free at our Ha Giang City office.',

    // Reviews
    reviewsTag: 'Verified Experiences',
    reviewsTitle: 'What Travelers Say About Our Journeys',
    reviewsSubtitle:
      'Over 15,000 domestic and international adventurers have shared unforgettable memories with our team.',
    verifiedTrip: 'Verified Traveler',

    // FAQ
    faqTag: 'Got Questions?',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqSubtitle:
      'Key details to help you prepare and embark on your Ha Giang Loop journey with peace of mind.',

    // Sticky Mobile Bar
    stickyCall: 'Hotline / WhatsApp',
    stickyBook: 'Book Tour Now',

    // Chatbot
    botTooltip: 'Ask me about weather, passes & Ha Giang tips! 👋',
    botFabLabel: 'Ask Ha Giang AI',
    botHeaderTitle: 'Ha Giang Travel AI',
    botHeaderSub: 'Local Expedition Assistant',
    botInputPlaceholder: 'Ask about weather, road conditions, permits, gear...',
    botInitialGreeting: 'Hello! I am your Ha Giang Loop AI Assistant. How can I help you with weather forecasts, itineraries, or packing tips?',

    // Footer
    footerCompanyName:
      'HA GIANG LOOP EXPEDITION CO., LTD. Leading provider of authentic, safe, and professional Ha Giang Loop adventure travel in Vietnam.',
    footerLicense: 'International Tour Operator License: 02-098/2022/TCDL-GPLHQT',
    footerHeadquarters: 'Ha Giang HQ:',
    footerHeadquartersAddr: '32 Nguyen Trai St, Minh Khai Ward, Ha Giang City',
    footerHanoiBranch: 'Hanoi Office:',
    footerHanoiBranchAddr: '18 Alley 198 Thai Ha St, Dong Da Dist, Hanoi',
    footerPaymentTitle: 'Electronic Payment Gateway',
    footerPaymentDesc:
      'Integrated with 24/7 VietQR dynamic payment and PayOS national payment gateway. Automatic instant transaction verification in 3-5 seconds.',
    footerCopyright: 'Ha Giang Loop Expedition. All rights reserved.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerRefund: 'Refund & Cancellation Policy',
    footerRoutesTitle: 'Explore Routes',

    // Booking Modal
    modalTabDetails: 'Itinerary Details',
    modalTabBook: 'Book Tour & Checkout',
    modalHighlights: 'Tour Highlights',
    modalDayPrefix: 'Day',
    modalStay: 'Overnight:',
    modalMeals: 'Meals:',
    modalInclusions: 'Included Services (Free of charge)',
    modalExclusions: 'Excluded Services',
    modalBookingInfoTitle: 'Booking Details & Payment',
    modalSelectedDate: 'Preferred Departure Date',
    modalGuests: 'Number of Guests',
    modalSelectVehicle: 'Select Vehicle Model',
    modalContactTitle: 'Lead Guest Information (For Voucher)',
    modalFullName: 'Full Name',
    modalPhone: 'Phone / WhatsApp',
    modalEmail: 'Email Address (Receive e-voucher)',
    modalNotes: 'Special Requests (Vegetarian, bus pickup...)',
    modalUnitPrice: 'Package unit price:',
    modalInsuranceGift: 'Insurance & 24/7 Roadside Rescue:',
    modalFreeGift: 'Complimentary (Included)',
    modalTotalPrice: 'Total Amount:',
    modalTermsAgree:
      'I confirm the information provided is accurate and agree to the loop safety regulations and VietQR payment terms.',
    modalSubmitBtn: 'Proceed to VietQR Payment',
    modalSubmitting: 'Generating dynamic VietQR code...',
    modalDynamicQrNote: 'Dynamic QR will be generated with exact amount and automated transfer reference',
  },
};

export const SEASONS_DATA = {
  vi: [
    {
      period: 'Tháng 9 - Tháng 10',
      title: 'Mùa Vàng Lúa Chín',
      desc: 'Hà Giang rực rỡ với sắc vàng óng của ruộng bậc thang Hoàng Su Phì ngút ngàn, thời tiết mát mẻ dễ chịu, nắng vàng ươm dịu nhẹ.',
    },
    {
      period: 'Tháng 10 - Tháng 12',
      title: 'Mùa Hoa Tam Giác Mạch',
      desc: 'Cả cao nguyên đá rực hồng sắc hoa tam giác mạch e ấp. Mùa lễ hội lớn nhất năm với không khí se lạnh đậm chất miền sơn cước.',
    },
    {
      period: 'Tháng 1 - Tháng 3',
      title: 'Mùa Xuân Hoa Đào - Mận',
      desc: 'Hoa mận trắng tinh khôi, hoa đào rừng nở hồng bên mái nhà trình tường cổ kính. Trải nghiệm không khí đón Tết vùng cao nồng hậu.',
    },
    {
      period: 'Tháng 5 - Tháng 6',
      title: 'Mùa Nước Đổ Kỳ Ảo',
      desc: 'Những thửa ruộng bậc thang phản chiếu trời mây như những tấm gương khổng lồ uốn lượn ngoạn mục quanh sườn núi đá vôi hùng vĩ.',
    },
  ],
  en: [
    {
      period: 'September - October',
      title: 'Golden Terraced Rice Season',
      desc: 'Hoang Su Phi terraces glow in golden sunlight. Crisp mountain breeze, pleasant weather, and ripe rice fragrant across endless ridges.',
    },
    {
      period: 'October - December',
      title: 'Buckwheat Flower Season',
      desc: 'Karst mountain slopes are painted in delicate pink and violet buckwheat petals. The most famous cultural festival season with cool autumn chill.',
    },
    {
      period: 'January - March',
      title: 'Spring Peach & Plum Blossom',
      desc: 'Pure white plum blossoms and wild pink peach trees bloom beside antique earthen rammed houses. Celebrate joyful highland Tet festivals.',
    },
    {
      period: 'May - June',
      title: 'Mirror Water Reflection Season',
      desc: 'Terraced paddies shimmer like giant mirrors reflecting sky and clouds, cascading down limestone karst cliffs in dramatic splendor.',
    },
  ],
};

export const CHECKLIST_ITEMS = {
  vi: {
    organizer: [
      'Mũ bảo hiểm 3/4 đạt chuẩn có kính chống gió, chống bụi và chống lóa',
      'Bộ giáp bảo hộ tay chân 4 món chuyên dụng ôm cua an toàn',
      'Áo mưa bộ cao cấp dẻo dai & ủng đi mưa chống ướt giày',
      'Túi bọc balo du lịch chống nước tuyệt đối 100%',
      'Túi y tế cơ bản, bông băng, cồn đỏ và thuốc sơ cấp cứu dọc đường',
    ],
    traveler: [
      'CCCD / Hộ chiếu bản gốc (bắt buộc khi lưu trú và khai báo giấy phép biên giới)',
      'Bằng lái xe máy hợp lệ A1 / A2 (đối với tour tự lái)',
      'Áo khoác gió chống nước, giữ nhiệt (ban đêm nhiệt độ đèo có thể dưới 15°C)',
      'Giày thể thao hoặc giày trekking có đế bám tốt, chống trơn trượt trên đá',
      'Thuốc cá nhân đặc trị, thuốc chống say xe, kem chống muỗi, pin sạc dự phòng',
    ],
  },
  en: {
    organizer: [
      'Quality 3/4 helmets equipped with windproof, dustproof & anti-glare visors',
      '4-piece elbow and knee protective armor sets designed for mountain riding',
      'Durable waterproof rain suits and shoe covers',
      '100% waterproof rain covers for your backpacks',
      'First-aid medical kits, bandages, antiseptic, and roadside remedies',
    ],
    traveler: [
      'Original Passport / Visa (mandatory for frontier police permit and homestays)',
      'Valid motorbike driving license / International Driving Permit (for self-drive)',
      'Windbreaker / thermal waterproof jacket (mountain nights drop below 15°C / 59°F)',
      'Sturdy athletic shoes or trekking shoes with grippy rubber soles',
      'Personal medications, motion sickness pills, insect repellent, portable power bank',
    ],
  },
};

export const FAQS_DATA = {
  vi: [
    {
      q: 'Tôi không có bằng lái xe máy hoặc không tự tin tay lái thì nên chọn gói tour nào?',
      a: 'Bạn nên chọn gói "Tour Hà Giang Easy Rider (Có xế bản địa cứng lái kèm)" hoặc "Tour Limousine Cao Nguyên Đá". Các bác xế bản địa người H\'Mông, Tày có hơn 5-10 năm kinh nghiệm ôm đèo, đảm bảo an toàn tuyệt đối và bạn chỉ việc thoải mái ngắm cảnh, chụp hình.',
    },
    {
      q: 'Thời gian khởi hành và điểm tập kết tại TP Hà Giang như thế nào?',
      a: 'Tour khởi hành vào lúc 07:30 - 08:00 sáng hàng ngày tại văn phòng trung tâm TP Hà Giang (hoặc đón tận nơi tại bến xe khách TP Hà Giang). Nếu bạn đi xe giường nằm từ Hà Nội đêm hôm trước (đến Hà Giang lúc 3h - 4h sáng), văn phòng chúng tôi có sẵn phòng nghỉ miễn phí và nhà tắm nóng lạnh để bạn nghỉ ngơi trước khi xuất phát.',
    },
    {
      q: 'Quy trình thanh toán qua VietQR / PayOS diễn ra thế nào?',
      a: 'Sau khi điền thông tin và bấm đặt tour, hệ thống sẽ tạo một mã VietQR động với đúng số tiền và nội dung chuyển khoản chuẩn Napas. Bạn chỉ cần mở bất kỳ ứng dụng ngân hàng nào (Vietcombank, MB Bank, Techcombank, Momo, BIDV...) quét mã và xác nhận chuyển khoản. Hệ thống tự động nhận diện và xuất vé Voucher điện tử ngay sau vài giây.',
    },
    {
      q: 'Nếu thời tiết xấu hoặc có việc bận đột xuất tôi có thể đổi ngày hay hoàn tiền không?',
      a: 'Chúng tôi hỗ trợ đổi ngày khởi hành hoàn toàn MIỄN PHÍ nếu báo trước 48 giờ. Trong trường hợp sạt lở hoặc bão lũ bất khả kháng do thiên tai, du khách được hỗ trợ bảo lưu chuyến đi trong 12 tháng hoặc hoàn lại 100% tiền cọc.',
    },
    {
      q: 'Một xe máy có thể chở 2 người tự lái được không?',
      a: 'Được. Tuy nhiên cung đường Hà Giang có nhiều dốc cua gắt (Dốc Thẩm Mã, Đèo Mã Pí Lèng, Dốc Chín Khoanh), người cầm lái cần có tay lái thực sự vững và kinh nghiệm đi đèo dốc để đảm bảo an toàn cho cả hai.',
    },
  ],
  en: [
    {
      q: 'I cannot ride a motorbike or have no license. Which tour should I choose?',
      a: 'We highly recommend our "Easy Rider Tour (with local driver)" or "VIP Limousine Tour". Our local ethnic drivers have over 5–10 years of experience navigating mountain passes, ensuring 100% safety so you can simply sit back, capture photos, and soak in the scenery.',
    },
    {
      q: 'What is the departure time and pickup location in Ha Giang City?',
      a: 'Tours depart daily at 07:30 - 08:00 AM from our Ha Giang City office (or we pick you up directly at the Ha Giang Bus Station). If you arrive early via overnight sleeper bus from Hanoi (typically arriving at 3:00–4:00 AM), our office provides complimentary dorm beds and hot showers to rest before the loop starts.',
    },
    {
      q: 'How does VietQR / PayOS instant payment work?',
      a: 'After filling in your details, our system generates a dynamic VietQR code with the exact amount and unique transaction reference. You can scan it with any banking app or e-wallet (Vietcombank, MBBank, Techcombank, Momo, etc.). The system verifies the payment automatically in 3-5 seconds and immediately issues your digital voucher.',
    },
    {
      q: 'Can I change my travel date or get a refund if weather is bad or plans change?',
      a: 'We offer FREE date changes if informed at least 48 hours prior to departure. In the rare event of severe weather or natural disasters, your booking is valid for 12 months or 100% refunded.',
    },
    {
      q: 'Can two people share one self-drive motorbike?',
      a: 'Yes, but the driver must be an experienced rider. Ha Giang features sharp hairpin turns and steep inclines (Tham Ma Pass, Ma Pi Leng Pass). Riding two-up requires confident brake control and downhill balance.',
    },
  ],
};
