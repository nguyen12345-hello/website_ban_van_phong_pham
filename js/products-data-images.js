// ============================================
// PRODUCTS DATABASE - WITH PROFESSIONAL IMAGES
// ============================================

const productsDatabase = [
    {
        id: 1,
        name: "Premium Leather Notebook A5 - Midnight Black",
        category: "paper",
        price: 285000,
        oldPrice: 380000,
        image: "../images/data/Premium Leather Notebook A5 - Midnight Black.jpeg",
        thumbnail: "../images/data/Premium Leather Notebook A5 - Midnight Black.jpeg",
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
        image: "../images/data/Fountain Pen Set - Sapphire Blue.jpeg",
        thumbnail: "../images/data/Fountain Pen Set - Sapphire Blue.jpeg",
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
        image: "../images/data/Paper A4 Premium Bond 100gsm.jpeg",
        thumbnail: "../images/data/Paper A4 Premium Bond 100gsm.jpeg",
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
        image: "../images/data/Gel Pen Set 10 Colors - Artist Pro.jpeg",
        thumbnail: "../images/data/Gel Pen Set 10 Colors - Artist Pro.jpeg",
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
        image: "../images/data/Sticky Notes Design Collection - Pastels.jpeg",
        thumbnail: "../images/data/Sticky Notes Design Collection - Pastels.jpeg",
        icon: "📌",
        description: "Bộ giấy dán 12 món thiết kế vintage",
        rating: 4.5,
        reviews: 512,
        popular: true,
        sale: true,
        stock: 200
    },
    {
        id: 6,
        name: "Mechanical Pencil Professional Set",
        category: "pen",
        price: 185000,
        oldPrice: 260000,
        image: "../images/data/Mechanical Pencil Professional Set.jpeg",
        thumbnail: "../images/data/Mechanical Pencil Professional Set.jpeg",
        icon: "🖍",
        description: "Bộ bút chì cơ chuyên nghiệp kỹ sư",
        rating: 4.7,
        reviews: 143,
        stock: 67
    },
    {
        id: 7,
        name: "Desktop Organizer - Bamboo Natural",
        category: "tools",
        price: 320000,
        oldPrice: 450000,
        image: "../images/data/Desktop Organizer - Bamboo Natural.jpeg",
        thumbnail: "../images/data/Desktop Organizer - Bamboo Natural.jpeg",
        icon: "🏠",
        description: "Tổ chức bàn làm việc từ tre tự nhiên",
        rating: 4.8,
        reviews: 178,
        stock: 34
    },
    {
        id: 8,
        name: "Planner 2024 - Weekly Layout",
        category: "paper",
        price: 215000,
        oldPrice: 295000,
        image: "../images/data/Planner 2024 - Weekly Layout.jpeg",
        thumbnail: "../images/data/Planner 2024 - Weekly Layout.jpeg",
        icon: "📅",
        description: "Lịch lên kế hoạch tuần với thiết kế đẹp",
        rating: 4.9,
        reviews: 467,
        stock: 89
    },
    {
        id: 9,
        name: "Typewriter Desk Tape Dispenser",
        category: "tools",
        price: 165000,
        oldPrice: 230000,
        image: "../images/data/Typewriter Desk Tape Dispenser.jpeg",
        thumbnail: "../images/data/Typewriter Desk Tape Dispenser.jpeg",
        icon: "🎀",
        description: "Máy cắt băng dán hình máy chữ retro",
        rating: 4.7,
        reviews: 198,
        stock: 76
    },
    {
        id: 10,
        name: "Watercolor Paint Set - 36 Colors",
        category: "tools",
        price: 395000,
        oldPrice: 560000,
        image: "../images/data/Watercolor Paint Set - 36 Colors.jpeg",
        thumbnail: "../images/data/Watercolor Paint Set - 36 Colors.jpeg",
        icon: "🎨",
        description: "Bộ màu nước chuyên nghiệp 36 màu cao cấp",
        rating: 4.8,
        reviews: 267,
        stock: 52
    },
    {
        id: 11,
        name: "Bullet Journal Starter Kit",
        category: "paper",
        price: 275000,
        oldPrice: 390000,
        image: "../images/data/Bullet Journal Starter Kit.jpeg",
        thumbnail: "../images/data/Bullet Journal Starter Kit.jpeg",
        icon: "✨",
        description: "Bộ khởi đầu bullet journal đầy đủ công cụ",
        rating: 4.8,
        reviews: 345,
        stock: 68
    },
    {
        id: 12,
        name: "Carbon Paper Sheets - 100 sheets",
        category: "paper",
        price: 52000,
        oldPrice: 72000,
        image: "../images/data/Carbon Paper Sheets - 100 sheets.jpeg",
        thumbnail: "../images/data/Carbon Paper Sheets - 100 sheets.jpeg",
        icon: "📋",
        description: "Giấy than chuyên dùng A4 100 tờ",
        rating: 4.6,
        reviews: 123,
        stock: 300
    }
];

const utilityImages = {
    hero: "../images/hero-main.jpg",
    heroBg: "../images/hero-main.jpg",
    featureFilter: "../images/feature-1.jpg",
    featureCart: "../images/feature-2.jpg",
    featureResponsive: "../images/feature-3.jpg",
    featureShip: "../images/feature-4.jpg",
    featureSupport: "../images/feature-5.jpg",
    featureQuality: "../images/feature-6.jpg",
    categoryPaper: "../images/category-paper.jpg",
    categoryPen: "../images/category-pens.jpg",
    categoryTools: "../images/category-tools.jpg",
    categoryOther: "../images/product-5.jpg",
    aboutTeam: "../images/about-office.jpg",
    aboutStore: "../images/about-office.jpg",
    bannerSale: "../images/banner-sale.jpg",
    bannerNew: "../images/banner-new.jpg",
    testimonial1: "../images/testimonial-1.jpg",
    testimonial2: "../images/testimonial-2.jpg",
    testimonial3: "../images/testimonial-3.jpg",
    ctaBg: "../images/cta-background.jpg"
};

const categoryConfig = {
    paper: { name: "Giấy & Tập", icon: "??", color: "#E8D4C4", image: utilityImages.categoryPaper },
    pen: { name: "Bút & Chì", icon: "??", color: "#D4C4E8", image: utilityImages.categoryPen },
    tools: { name: "Dụng Cụ", icon: "??", color: "#C4E8D4", image: utilityImages.categoryTools },
    other: { name: "Sản phẩm khác", icon: "??", color: "#E8E4C4", image: utilityImages.categoryOther }
};

function formatPrice(price) { return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price); }
function formatPriceSimple(price) { return price.toLocaleString('vi-VN') + 'đ'; }
function getCategoryName(category) { return categoryConfig[category]?.name || 'Khac'; }
function getCategoryIcon(category) { return categoryConfig[category]?.icon || '??'; }
function getCategoryColor(category) { return categoryConfig[category]?.color || '#F0F0F0'; }
function getCategoryImage(category) { return categoryConfig[category]?.image || utilityImages.categoryOther; }

function createResponsiveImage(src, alt = "Product", className = "") { return `<img src="${src}" alt="${alt}" class="img-fluid ${className}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">`; }
function createImageWithPlaceholder(src, alt = "Image", width = 400, height = 400) { const placeholder = `https://via.placeholder.com/${width}x${height}?text=Loading...`; return `<img src="${src}" alt="${alt}" class="img-fluid" style="height: auto; max-width: 100%;" onerror="this.src='${placeholder}'">`; }
