// ============================================
// PRODUCTS DATABASE - TYPO STYLE COLLECTION
// Sản phẩm cao cấp với hình ảnh chi tiết
// ============================================

const productsDatabase = [
    // ========== STATIONERY LUXURY COLLECTION ==========
    {
        id: 1,
        name: "Premium Leather Notebook A5 - Midnight Black",
        category: "paper",
        price: 285000,
        oldPrice: 380000,
        image: "./images/data/Premium%20Leather%20Notebook%20A5%20-%20Midnight%20Black.jpeg",
        thumbnail: "./images/data/Premium%20Leather%20Notebook%20A5%20-%20Midnight%20Black.jpeg",
        icon: "📓",
        description: "Tập ghi chép da cao cấp với lót giấy Tomoe River",
        rating: 4.9,
        reviews: 234,
        popular: true,
        sale: true,
        stock: 45,
        color: "Đen Đêm",
        specs: {
            material: "Da Ý cao cấp",
            pages: "200 trang",
            paper: "Tomoe River 52gsm",
            size: "A5 (148x210mm)"
        },
        features: [
            "Bìa da Ý tự nhiên",
            "Dây đính sách",
            "Giấy chất lượng cao",
            "Khay cardboard cao cấp"
        ],
        tags: ["notebook", "cao cấp", "da", "giftbox"]
    },
    {
        id: 2,
        name: "Fountain Pen Set - Sapphire Blue",
        category: "pen",
        price: 450000,
        oldPrice: 625000,
        image: "./images/data/Fountain%20Pen%20Set%20-%20Sapphire%20Blue.jpeg",
        thumbnail: "./images/data/Fountain%20Pen%20Set%20-%20Sapphire%20Blue.jpeg",
        icon: "🖋",
        description: "Bộ bút máy sang trọng với mực cao cấp",
        rating: 4.8,
        reviews: 156,
        popular: true,
        sale: true,
        stock: 28,
        color: "Xanh Sapphire",
        specs: {
            material: "Đồng mạ vàng",
            nib: "Vàng 14K",
            refillable: "Có",
            inkColor: "Xanh đen"
        },
        features: [
            "Nib vàng 14 carat",
            "Hộp quà tặng sang trọng",
            "Bình mực cao cấp",
            "Giấy chứng chỉ xác thực"
        ],
        tags: ["bút máy", "sang trọng", "quà tặng", "cao cấp"]
    },
    {
        id: 3,
        name: "Paper A4 Premium Bond 100gsm",
        category: "paper",
        price: 95000,
        oldPrice: 135000,
        image: "./images/data/Paper%20A4%20Premium%20Bond%20100gsm.jpeg",
        icon: "📄",
        description: "Giấy bond cao cấp, trắng sáng 110%",
        rating: 4.7,
        reviews: 389,
        popular: true,
        sale: true,
        stock: 500,
        specs: {
            weight: "100gsm",
            sheets: "500 tờ",
            brightness: "110%",
            whiteness: "176 CIE"
        },
        features: [
            "In đặc biệt sắc nét",
            "Chống lem",
            "Tuổi thọ lâu dài",
            "Thân thiện môi trường"
        ],
        tags: ["giấy", "in ấn", "văn phòng", "bền"]
    },
    {
        id: 4,
        name: "Gel Pen Set 10 Colors - Artist Pro",
        category: "pen",
        price: 125000,
        oldPrice: 175000,
        image: "./images/data/Gel%20Pen%20Set%2010%20Colors%20-%20Artist%20Pro.jpeg",
        icon: "✏️",
        description: "Bộ 10 bút gel màu sinh động chất lượng cao",
        rating: 4.6,
        reviews: 287,
        popular: true,
        sale: false,
        stock: 120,
        colors: ["Đỏ", "Xanh", "Vàng", "Hồng", "Tím", "Cam", "Lục", "Nâu", "Đen", "Trắng"],
        specs: {
            tipSize: "0.7mm",
            colors: "10 màu",
            refillable: "Có",
            type: "Gel"
        },
        features: [
            "Mực gel mượt mà",
            "Màu sinh động",
            "Hộp kim loại cao cấp",
            "Có thể thay ruột bút"
        ],
        tags: ["bút", "màu", "nghệ thuật", "sáng tạo"]
    },
    {
        id: 5,
        name: "Sticky Notes Design Collection - Pastels",
        category: "other",
        price: 45000,
        oldPrice: 65000,
        image: "./images/data/Sticky%20Notes%20Design%20Collection%20-%20Pastels.jpeg",
        icon: "📌",
        description: "Bộ giấy dán 12 món thiết kế vintage",
        rating: 4.5,
        reviews: 512,
        popular: true,
        sale: true,
        stock: 200,
        specs: {
            sets: "12 loại",
            perSet: "100 tờ",
            size: "76x76mm",
            materials: "Giấy recyclable"
        },
        features: [
            "Thiết kế vintage đẹp",
            "Mực in không độc hại",
            "Dễ dán và tách",
            "Hộp giấy tự nhiên"
        ],
        tags: ["sticky notes", "thiết kế", "sáng tạo", "đẹp"]
    },
    {
        id: 6,
        name: "Mechanical Pencil Professional Set",
        category: "pen",
        price: 185000,
        oldPrice: 260000,
        image: "./images/data/Mechanical%20Pencil%20Professional%20Set.jpeg",
        icon: "🖍",
        description: "Bộ bút chì cơ chuyên nghiệp kỹ sư",
        rating: 4.7,
        reviews: 143,
        popular: false,
        sale: true,
        stock: 67,
        specs: {
            leadSize: "0.5mm, 0.7mm, 0.9mm",
            material: "Nhôm",
            includes: "Dẫn chì + tẩy + mô ngàm"
        },
        features: [
            "Cấu trúc nhôm bền",
            "Độ chính xác cao",
            "Bộ phụ kiện đầy đủ",
            "Hộp gỗ sang trọng"
        ],
        tags: ["bút chì", "cơ", "chuyên nghiệp", "kỹ sư"]
    },
    {
        id: 7,
        name: "Desktop Organizer - Bamboo Natural",
        category: "tools",
        price: 320000,
        oldPrice: 450000,
        image: "./images/data/Desktop%20Organizer%20-%20Bamboo%20Natural.jpeg",
        icon: "🏠",
        description: "Tổ chức bàn làm việc từ tre tự nhiên",
        rating: 4.8,
        reviews: 178,
        popular: true,
        sale: true,
        stock: 34,
        material: "Tre Moso",
        specs: {
            size: "45x25x35cm",
            compartments: "8",
            material: "Tre tự nhiên",
            weight: "2.5kg"
        },
        features: [
            "Tre Moso nguyên chất",
            "Thiết kế tối giản hiện đại",
            "Không hóa chất độc hại",
            "Dễ vệ sinh và bảo trì"
        ],
        tags: ["tổ chức", "bàn làm việc", "tre", "tự nhiên"]
    },
    {
        id: 8,
        name: "Planner 2024 - Weekly Layout",
        category: "paper",
        price: 215000,
        oldPrice: 295000,
        image: "./images/data/Planner%202024%20-%20Weekly%20Layout.jpeg",
        icon: "📅",
        description: "Lịch lên kế hoạch tuần với thiết kế đẹp",
        rating: 4.9,
        reviews: 467,
        popular: true,
        sale: true,
        stock: 89,
        specs: {
            format: "Tuần",
            pages: "365 trang",
            size: "A4 (210x297mm)",
            binding: "Xoắn"
        },
        features: [
            "Bố cục tuần chi tiết",
            "Giấy chất lượng cao",
            "Bìa cứng 500gsm",
            "Đặc trang trang ch chủ đề"
        ],
        tags: ["lịch", "kế hoạch", "tổ chức", "2024"]
    },
    {
        id: 9,
        name: "Typewriter Desk Tape Dispenser",
        category: "tools",
        price: 165000,
        oldPrice: 230000,
        image: "./images/data/Typewriter%20Desk%20Tape%20Dispenser.jpeg",
        icon: "🎀",
        description: "Máy cắt băng dán hình máy chữ retro",
        rating: 4.7,
        reviews: 198,
        popular: true,
        sale: true,
        stock: 76,
        specs: {
            material: "Nhôm + Thép",
            size: "18x10x8cm",
            tapeWidth: "18-25mm",
            color: "Vàng đồng"
        },
        features: [
            "Thiết kế retro thời thượng",
            "Cắt băng ngang gọn",
            "Cơ chế chắc chắn",
            "Trang trí bàn làm việc"
        ],
        tags: ["băng dán", "máy cắt", "retro", "trang trí"]
    },
    {
        id: 10,
        name: "Watercolor Paint Set - 36 Colors",
        category: "tools",
        price: 395000,
        oldPrice: 560000,
        image: "./images/data/Watercolor%20Paint%20Set%20-%2036%20Colors.jpeg",
        icon: "🎨",
        description: "Bộ màu nước chuyên nghiệp 36 màu cao cấp",
        rating: 4.8,
        reviews: 267,
        popular: true,
        sale: true,
        stock: 52,
        specs: {
            colors: "36 màu",
            type: "Water-based",
            container: "Hộp sơn gỗ",
            solubility: "Cao"
        },
        features: [
            "Hộp gỗ thiết kế đẹp",
            "Màu pigment tự nhiên",
            "Độ tinh khiết cao",
            "Có bàn trộn màu"
        ],
        tags: ["màu nước", "mỹ thuật", "chuyên nghiệp", "sáng tạo"]
    },
    {
        id: 11,
        name: "Bullet Journal Starter Kit",
        category: "paper",
        price: 275000,
        oldPrice: 390000,
        image: "./images/data/Bullet%20Journal%20Starter%20Kit.jpeg",
        icon: "✨",
        description: "Bộ khởi đầu bullet journal đầy đủ công cụ",
        rating: 4.8,
        reviews: 345,
        popular: true,
        sale: true,
        stock: 68,
        includes: [
            "Notebook dotted 250 trang",
            "Bút lông 10 màu",
            "Bút highlight 6 màu",
            "Thước và sticker"
        ],
        specs: {
            notebooks: "1",
            pens: "16",
            accessories: "Đầy đủ",
            packaging: "Giftbox"
        },
        features: [
            "Bộ hoàn chỉnh cho người mới",
            "Hộp quà tặng đẹp",
            "Hướng dẫn tiếng Việt",
            "Giá ưu đãi bundle"
        ],
        tags: ["bullet journal", "starter kit", "giftbox", "kế hoạch"]
    },
    {
        id: 12,
        name: "Carbon Paper Sheets - 100 sheets",
        category: "paper",
        price: 52000,
        oldPrice: 72000,
        image: "./images/data/Carbon%20Paper%20Sheets%20-%20100%20sheets.jpeg",
        icon: "📋",
        description: "Giấy than chuyên dùng A4 100 tờ",
        rating: 4.6,
        reviews: 123,
        popular: false,
        sale: true,
        stock: 300,
        specs: {
            sheets: "100 tờ",
            size: "A4 (210x297mm)",
            color: "Đen",
            thickness: "0.08mm"
        },
        features: [
            "Than chất lượng cao",
            "In sắc nét",
            "Dễ tách rời",
            "Giá cạnh tranh"
        ],
        tags: ["giấy than", "bản sao", "văn phòng", "chuyên dùng"]
    }
];

// ============================================
// Category Configuration
// ============================================
const categoryConfig = {
    paper: { name: "Giấy & Tập", icon: "📄", color: "#E8D4C4" },
    pen: { name: "Bút & Chì", icon: "✏️", color: "#D4C4E8" },
    tools: { name: "Dụng Cụ & Tổ Chức", icon: "🛠", color: "#C4E8D4" },
    other: { name: "Mục Khác", icon: "📌", color: "#E8E4C4" }
};

// ============================================
// Format Functions
// ============================================
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function formatPriceSimple(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}

function getCategoryName(category) {
    return categoryConfig[category]?.name || 'Khác';
}

function getCategoryIcon(category) {
    return categoryConfig[category]?.icon || '📦';
}

function getCategoryColor(category) {
    return categoryConfig[category]?.color || '#F0F0F0';
}
