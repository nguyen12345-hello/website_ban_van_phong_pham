// ============================================
// PRODUCTS DATABASE - EXTENDED VERSION
// Dữ liệu sản phẩm chi tiết và đầy đủ
// ============================================

const productsDatabase = [
    // ========== GIẤY & TẬP ==========
    {
        id: 1,
        name: "Giấy In A4 XNine 80gsm 500 Tờ",
        category: "paper",
        price: 48000,
        oldPrice: 60000,
        image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b1?w=300&h=300&fit=crop",
        description: "Giấy in trắng tiêu chuẩn chất lượng cao",
        rating: 4.8,
        reviews: 156,
        popular: true,
        sale: true,
        stock: 250,
        specs: {
            weight: "80gsm",
            sheets: "500 tờ",
            brightness: "104%",
            whiteness: "169 CIE"
        },
        tags: ["giấy in", "văn phòng", "in ấn"]
    },
    {
        id: 2,
        name: "Tập Ghi Chép A4 100 Trang Bìa Cứng",
        category: "paper",
        price: 35000,
        oldPrice: 45000,
        image: "https://images.unsplash.com/photo-1609035026076-f92de0b61a75?w=300&h=300&fit=crop",
        description: "Tập ghi chép cao cấp với bìa cứng bảo vệ",
        rating: 4.7,
        reviews: 89,
        popular: true,
        sale: true,
        stock: 180,
        specs: {
            sheets: "100 tờ",
            size: "A4",
            lines: "Kẻ ngang",
            cover: "Cứng"
        },
        tags: ["tập ghi chép", "học tập", "văn phòng"]
    },
    {
        id: 3,
        name: "Tập Học Xinh Xắn A5 40 Trang",
        category: "paper",
        price: 12000,
        oldPrice: 15000,
        image: "https://images.unsplash.com/photo-1507842955617-d4b2e56d7d7d?w=300&h=300&fit=crop",
        description: "Tập A5 nhỏ gọn dễ mang theo",
        rating: 4.5,
        reviews: 234,
        popular: false,
        sale: false,
        stock: 500,
        specs: {
            sheets: "40 tờ",
            size: "A5",
            paper: "80gsm",
            binding: "Dán"
        },
        tags: ["tập nhỏ", "học sinh", "tiện lợi"]
    },
    {
        id: 4,
        name: "Giấy In Canon imagePaper A4 100gsm",
        category: "paper",
        price: 65000,
        oldPrice: 80000,
        image: "https://images.unsplash.com/photo-1554224311-beee415c201?w=300&h=300&fit=crop",
        description: "Giấy in chuyên dụng cho photo máy in",
        rating: 4.9,
        reviews: 108,
        popular: true,
        sale: true,
        stock: 150,
        specs: {
            weight: "100gsm",
            sheets: "500 tờ",
            resolution: "High Quality",
            type: "Glossy"
        },
        tags: ["giấy photo", "in ảnh", "chất lượng cao"]
    },

    // ========== BÚT & CHÌ ==========
    {
        id: 5,
        name: "Bút Bi Parker Jotter Premium",
        category: "pen",
        price: 45000,
        oldPrice: 60000,
        image: "https://images.unsplash.com/photo-1578992403025-612342a560ad?w=300&h=300&fit=crop",
        description: "Bút viết huyền thoại với thiết kế sang trọng",
        rating: 4.9,
        reviews: 456,
        popular: true,
        sale: true,
        stock: 200,
        specs: {
            type: "Bi xoay",
            tip: "Medium 1.0mm",
            ink: "Ballpoint",
            material: "Stainless Steel"
        },
        tags: ["bút cao cấp", "bút huyền thoại", "doanh nhân"]
    },
    {
        id: 6,
        name: "Bút Chì 2B Staedtler Noris Set 12 Cây",
        category: "pen",
        price: 58000,
        oldPrice: 72000,
        image: "https://images.unsplash.com/photo-1595432774223-ef14624120c2?w=300&h=300&fit=crop",
        description: "Bộ bút chì vẽ chuyên nghiệp đức",
        rating: 4.7,
        reviews: 178,
        popular: true,
        sale: true,
        stock: 120,
        specs: {
            quantity: "12 cây",
            grade: "2B",
            material: "Wood + Graphite",
            country: "Đức"
        },
        tags: ["bút chì", "vẽ tranh", "học sinh"]
    },
    {
        id: 7,
        name: "Bút Dạ Quang Staedtler Textsurfer Set 5",
        category: "pen",
        price: 35000,
        oldPrice: 45000,
        image: "https://images.unsplash.com/photo-1578992403025-612342a560ad?w=300&h=300&fit=crop",
        description: "Bút dạ quang nhiều màu cam, vàng, xanh, hồng",
        rating: 4.6,
        reviews: 312,
        popular: true,
        sale: true,
        stock: 300,
        specs: {
            colors: "5 màu",
            tip: "Chisel 1-4mm",
            fluorescent: "Cao",
            durability: "6 tháng"
        },
        tags: ["bút dạ quang", "nhiều màu", "học tập"]
    },
    {
        id: 8,
        name: "Bút Gel Pilot G2 Premium Gel 0.7mm",
        category: "pen",
        price: 12000,
        oldPrice: 15000,
        image: "https://images.unsplash.com/photo-1578992403025-612342a560ad?w=300&h=300&fit=crop",
        description: "Bút gel viết mịn, không chảy mực",
        rating: 4.8,
        reviews: 523,
        popular: false,
        sale: false,
        stock: 400,
        specs: {
            type: "Gel",
            tip: "0.7mm",
            ink: "Smooth Flow",
            refillable: "Có"
        },
        tags: ["bút gel", "viết mịn", "tối ưu"]
    },

    // ========== DỤNG CỤ CẬP ==========
    {
        id: 9,
        name: "Kẹp Giấy Acco 50mm Bạc Chính Hãng",
        category: "tools",
        price: 18000,
        oldPrice: 24000,
        image: "https://images.unsplash.com/photo-1611532736000-be9e63b6d3a0?w=300&h=300&fit=crop",
        description: "Kẹp giấy kim loại bền vững, cấp an toàn",
        rating: 4.7,
        reviews: 156,
        popular: true,
        sale: true,
        stock: 500,
        specs: {
            size: "50mm",
            material: "Stainless Steel",
            capacity: "Đến 10 tờ",
            pack: "Box 12 cái"
        },
        tags: ["kẹp giấy", "dụng cụ", "inox"]
    },
    {
        id: 10,
        name: "Dán Giấy 3M Post-it 76x76mm 100 Tờ",
        category: "tools",
        price: 22000,
        oldPrice: 28000,
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=300&h=300&fit=crop",
        description: "Dán giấy tạm thời cao cấp, không để vết",
        rating: 4.8,
        reviews: 289,
        popular: true,
        sale: true,
        stock: 600,
        specs: {
            size: "76x76mm",
            sheets: "100 tờ",
            adhesive: "Tự dính",
            colors: "Vàng"
        },
        tags: ["dán giấy", "post-it", "tạm thời"]
    },
    {
        id: 11,
        name: "Thước Kẻ Staedtler 30cm Nhựa Trong",
        category: "tools",
        price: 8000,
        oldPrice: 10000,
        image: "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=300&h=300&fit=crop",
        description: "Thước kẻ nhựa trong suốt, chia độ chính xác",
        rating: 4.5,
        reviews: 198,
        popular: false,
        sale: false,
        stock: 1000,
        specs: {
            length: "30cm",
            material: "Plastic",
            divisions: "Mm & Cm",
            transparency: "Cao"
        },
        tags: ["thước", "dụng cụ học tập", "vẽ"]
    },
    {
        id: 12,
        name: "Kéo Cắt Giấy Fiskars 21cm",
        category: "tools",
        price: 35000,
        oldPrice: 45000,
        image: "https://images.unsplash.com/photo-1533452819169-e1f66c71e0ee?w=300&h=300&fit=crop",
        description: "Kéo cắt giấy chuyên dụng nhẹ nhàng",
        rating: 4.6,
        reviews: 145,
        popular: true,
        sale: true,
        stock: 200,
        specs: {
            length: "21cm",
            blades: "Titanium coated",
            ergonomic: "Có",
            sharpness: "Cao 5 năm"
        },
        tags: ["kéo", "cắt giấy", "chuyên dụng"]
    },
    {
        id: 13,
        name: "Gôm Tẩy Faber-Castell 7005",
        category: "tools",
        price: 6000,
        oldPrice: 8000,
        image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=300&h=300&fit=crop",
        description: "Gôm tẩy chì chất lượng, không để vết xấu",
        rating: 4.7,
        reviews: 412,
        popular: false,
        sale: false,
        stock: 800,
        specs: {
            type: "Eraser",
            material: "PVC",
            size: "Medium",
            effectiveness: "Cao"
        },
        tags: ["gôm tẩy", "học sinh", "văn phòng"]
    },

    // ========== VĂN PHÒNG KHÁC ==========
    {
        id: 14,
        name: "Thư Mục Tài Liệu PP A4 Màu",
        category: "other",
        price: 32000,
        oldPrice: 40000,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=300&fit=crop",
        description: "Thư mục lưu trữ tài liệu chống nước",
        rating: 4.6,
        reviews: 167,
        popular: true,
        sale: true,
        stock: 300,
        specs: {
            size: "A4",
            material: "PP",
            waterproof: "Có",
            colors: "5 màu"
        },
        tags: ["thư mục", "lưu trữ", "tài liệu"]
    },
    {
        id: 15,
        name: "Hộp Lưu Trữ Carton Công Nghiệp",
        category: "other",
        price: 85000,
        oldPrice: 110000,
        image: "https://images.unsplash.com/photo-1587974682023-43bb3a0edea0?w=300&h=300&fit=crop",
        description: "Hộp carton 3 lớp chắc chắn lưu trữ",
        rating: 4.5,
        reviews: 92,
        popular: true,
        sale: true,
        stock: 100,
        specs: {
            size: "40x30x25cm",
            material: "Carton 3 lớp",
            capacity: "Cao",
            eco: "Tái chế được"
        },
        tags: ["hộp lưu trữ", "carton", "bảo vệ"]
    },
    {
        id: 16,
        name: "Dây Buộc Giấy Xoắn 50m",
        category: "other",
        price: 15000,
        oldPrice: 20000,
        image: "https://images.unsplash.com/photo-1571997477244-24f42ba271c9?w=300&h=300&fit=crop",
        description: "Dây buộc giấy xoắn cuộn 50m",
        rating: 4.4,
        reviews: 78,
        popular: false,
        sale: false,
        stock: 200,
        specs: {
            length: "50m",
            material: "Kraft Paper",
            diameter: "2-3mm",
            eco: "Tự phân hủy"
        },
        tags: ["dây buộc", "buộc tài liệu", "giấy kraft"]
    },
    {
        id: 17,
        name: "Kính Lúp Để Bàn Đọc Sách",
        category: "other",
        price: 95000,
        oldPrice: 125000,
        image: "https://images.unsplash.com/photo-1578926078328-123456789?w=300&h=300&fit=crop",
        description: "Kính lúp để bàn giúp đọc sách dễ dàng",
        rating: 4.9,
        reviews: 156,
        popular: true,
        sale: true,
        stock: 50,
        specs: {
            magnification: "3x",
            diameter: "100mm",
            base: "Nhựa chắc chắn",
            LED: "Có"
        },
        tags: ["kính lúp", "đọc sách", "hỗ trợ"]
    },
    {
        id: 18,
        name: "Bảng Ghi Chép Trí Tuệ Nhân Tạo",
        category: "other",
        price: 185000,
        oldPrice: 250000,
        image: "https://images.unsplash.com/photo-1542762862-cbed66c68fbc?w=300&h=300&fit=crop",
        description: "Bảng điện tử thông minh ghi chép lại",
        rating: 4.8,
        reviews: 234,
        popular: true,
        sale: true,
        stock: 30,
        specs: {
            type: "E-ink",
            screen: "10.3 inch",
            battery: "2 tháng",
            storage: "Tự động lưu"
        },
        tags: ["bảng điện tử", "công nghệ", "ghi chép"]
    },

    // ========== THÊM LOẠI SẢN PHẨM MỚI ==========
    {
        id: 19,
        name: "Túi Đựng Đồ Dùng Văn Phòng Da",
        category: "other",
        price: 125000,
        oldPrice: 165000,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
        description: "Túi đựng bút chì, bút viết da cao cấp",
        rating: 4.7,
        reviews: 189,
        popular: true,
        sale: true,
        stock: 75,
        specs: {
            material: "Da PU",
            capacity: "20-30 cây bút",
            compartments: "5 ngăn",
            style: "Minimalist"
        },
        tags: ["túi bút", "da", "phong cách"]
    },
    {
        id: 20,
        name: "Bàn Làm Việc Có Giá Đỡ Laptop",
        category: "other",
        price: 450000,
        oldPrice: 600000,
        image: "https://images.unsplash.com/photo-1593642632569-0c67ba42c018?w=300&h=300&fit=crop",
        description: "Bàn làm việc xếp gọn có giá đỡ laptop",
        rating: 4.6,
        reviews: 143,
        popular: true,
        sale: true,
        stock: 40,
        specs: {
            material: "Bamboo + Metal",
            foldable: "Có",
            adjustable: "3 mức",
            weight_capacity: "Đến 50kg"
        },
        tags: ["bàn làm việc", "laptop stand", "bamboo"]
    },

    // ========== COMBO TIẾT KIỆM ==========
    {
        id: 21,
        name: "Combo Văn Phòng Tiết Kiệm - Bundle",
        category: "paper",
        price: 250000,
        oldPrice: 350000,
        image: "https://images.unsplash.com/photo-1589939705066-5470989db8c0?w=300&h=300&fit=crop",
        description: "Gói combo: 2 tập, 2 bút, dán, kẹp",
        rating: 4.8,
        reviews: 267,
        popular: true,
        sale: true,
        stock: 150,
        specs: {
            items: "6 sản phẩm",
            savings: "100.000đ",
            perfect_for: "Văn phòng mới",
            gift_wrapped: "Có"
        },
        tags: ["combo", "tiết kiệm", "bundle", "quà tặng"]
    },
    {
        id: 22,
        name: "Combo Back to School - Trở Lại Trường",
        category: "pen",
        price: 180000,
        oldPrice: 260000,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop",
        description: "Gói combo cho học sinh: tập, bút, chì, gôm",
        rating: 4.9,
        reviews: 512,
        popular: true,
        sale: true,
        stock: 200,
        specs: {
            items: "8 sản phẩm",
            for_grade: "1-12",
            packaging: "Hộp quà",
            lang: "Tiếng Việt"
        },
        tags: ["combo", "học sinh", "back to school", "giá rẻ"]
    },
    {
        id: 23,
        name: "Gói Quà Tặng Nhân Viên Cao Cấp",
        category: "other",
        price: 350000,
        oldPrice: 500000,
        image: "https://images.unsplash.com/photo-1513885535751-a3b03911f5e3?w=300&h=300&fit=crop",
        description: "Quà tặng cao cấp cho nhân viên, khách hàng",
        rating: 4.7,
        reviews: 128,
        popular: true,
        sale: true,
        stock: 60,
        specs: {
            items: "Premium 5 loại",
            packaging: "Sang trọng",
            customizable: "Có thể in logo",
            min_order: "10 hộp"
        },
        tags: ["quà tặng", "nhân viên", "khách hàng", "cao cấp"]
    }
];

// Xuất dữ liệu
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productsDatabase };
}
