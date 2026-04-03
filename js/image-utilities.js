/**
 * ============================================
 * BOOTSTRAP IMAGE UTILITIES
 * Hình ảnh từ mạng (Unsplash, Pexels)
 * ============================================
 */

/**
 * Tất cả hình ảnh sử dụng là từ:
 * - Unsplash.com (Free stock photos)
 * - Pexels.com (Free stock images)
 * - Placeholder services
 * 
 * Tất cả hình ảnh có license CC0 (Public Domain)
 */

// ============================================
// IMAGE SOURCES
// ============================================
const ImageSources = {
    // Product Images
    products: {
        leatherNotebook: "images/product-1.jpg",
        fountainPen: "images/product-2.jpg",
        paperA4: "images/product-3.jpg",
        gelPen: "images/product-4.jpg",
        stickyNotes: "images/product-5.jpg",
        mechanicalPencil: "images/product-6.jpg",
        desktopOrganizer: "images/product-7.jpg",
        planner: "images/product-8.jpg",
        tapeCutter: "images/product-9.jpg",
        watercolor: "images/product-10.jpg",
        bulletJournal: "images/product-11.jpg",
        carbonPaper: "images/product-12.jpg"
    },

    // Feature Icons
    features: {
        design: "images/feature-1.jpg",
        filter: "images/feature-2.jpg",
        responsive: "images/feature-3.jpg",
        effects: "images/feature-4.jpg",
        wishlist: "images/feature-5.jpg",
        cart: "images/feature-6.jpg"
    },

    // Hero & Background
    heroes: {
        main: "images/hero-main.jpg",
        cta: "images/cta-background.jpg",
        about: "images/about-office.jpg"
    },

    // Categories
    categories: {
        paper: "images/category-paper.jpg",
        pen: "images/category-pens.jpg",
        tools: "images/category-tools.jpg",
        other: "images/product-5.jpg"
    },

    // Testimonials
    testimonials: {
        avatar1: "images/testimonial-1.jpg",
        avatar2: "images/testimonial-2.jpg",
        avatar3: "images/testimonial-3.jpg"
    },

    // Banners
    banners: {
        sale: "images/banner-sale.jpg",
        new: "images/banner-new.jpg"
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Tạo URL hình ảnh thumbnail
 * @param {string} url - URL gốc
 * @param {number} width - Chiều rộng
 * @param {number} height - Chiều cao
 * @returns {string} URL thumbnail
 */
function createImageThumbnail(url, width = 300, height = 300) {
    if (!url) return "";
    
    // Nếu là Unsplash URL
    if (url.includes("unsplash.com")) {
        return url.replace(/w=\d+/g, `w=${width}`).replace(/h=\d+/g, `h=${height}`);
    }
    
    // Ngược lại trả về URL gốc
    return url;
}

/**
 * Tạo thẻ img HTML responsive
 * @param {string} src - URL hình ảnh
 * @param {string} alt - Alt text
 * @param {Object} options - Options
 * @returns {string} HTML img tag
 */
function createResponsiveImage(src, alt = "Image", options = {}) {
    const {
        className = "",
        width = "100%",
        height = "auto",
        objectFit = "cover",
        loading = "lazy",
        placeholderBg = "#f0f0f0"
    } = options;

    return `<img 
        src="${src}" 
        alt="${alt}" 
        class="img-fluid ${className}" 
        style="
            width: ${width}; 
            height: ${height}; 
            object-fit: ${objectFit};
            background-color: ${placeholderBg};
        " 
        loading="${loading}" 
        onerror="this.src='https://via.placeholder.com/400x400?text=Image+Not+Available'"
    >`;
}

/**
 * Tạo background image style
 * @param {string} url - URL hình ảnh
 * @param {Object} options - Options
 * @returns {string} CSS style
 */
function createBackgroundImage(url, options = {}) {
    const {
        backgroundSize = "cover",
        backgroundPosition = "center",
        backgroundAttachment = "scroll",
        opacity = 1
    } = options;

    return `
        background-image: url('${url}');
        background-size: ${backgroundSize};
        background-position: ${backgroundPosition};
        background-attachment: ${backgroundAttachment};
        opacity: ${opacity};
    `;
}

/**
 * Tạo card hình ảnh với overlay
 * @param {string} src - URL hình ảnh
 * @param {string} title - Tiêu đề
 * @param {Object} options - Options
 * @returns {string} HTML card
 */
function createImageCard(src, title = "", options = {}) {
    const {
        className = "",
        aspectRatio = "1 / 1",
        overlayOpacity = 0.5,
        overlayColor = "#000000"
    } = options;

    return `
        <div class="image-card ${className}" style="aspect-ratio: ${aspectRatio}; position: relative; overflow: hidden; border-radius: 8px;">
            <img src="${src}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, ${overlayOpacity});
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <span style="color: white; font-weight: 600; text-align: center; padding: 20px;">${title}</span>
            </div>
        </div>
    `;
}

/**
 * Tạo lazy load image container
 * @param {string} src - URL hình ảnh
 * @param {string} alt - Alt text
 * @returns {string} HTML container
 */
function createLazyImage(src, alt = "Image") {
    return `
        <div class="lazy-image-container" style="background: #f0f0f0; position: relative; overflow: hidden;">
            <img 
                class="lazy" 
                data-src="${src}" 
                alt="${alt}"
                style="width: 100%; height: auto; display: block;"
            >
            <noscript>
                <img src="${src}" alt="${alt}" style="width: 100%; height: auto;">
            </noscript>
        </div>
    `;
}

/**
 * Initialize lazy loading cho hình ảnh
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    }
}

/**
 * Tạo responsive image srcset
 * @param {string} baseUrl - URL base
 * @returns {string} Srcset attribute
 */
function createSrcSet(baseUrl) {
    if (!baseUrl) return "";
    
    // Nếu là Unsplash, create multiple sizes
    if (baseUrl.includes("unsplash.com")) {
        const size300 = baseUrl.replace(/w=\d+/g, 'w=300').replace(/h=\d+/g, 'h=300');
        const size600 = baseUrl.replace(/w=\d+/g, 'w=600').replace(/h=\d+/g, 'h=600');
        const size900 = baseUrl.replace(/w=\d+/g, 'w=900').replace(/h=\d+/g, 'h=900');
        
        return `${size300} 300w, ${size600} 600w, ${size900} 900w`;
    }
    
    return baseUrl;
}

/**
 * Tạo thẻ picture responsive
 * @param {Object} sources - Các source khác nhau
 * @param {string} fallbackSrc - Fallback image
 * @param {string} alt - Alt text
 * @returns {string} HTML picture tag
 */
function createPictureTag(sources = {}, fallbackSrc = "", alt = "Image") {
    let html = `<picture>`;
    
    // Add sources
    Object.entries(sources).forEach(([media, src]) => {
        html += `<source media="${media}" srcset="${src}">`;
    });
    
    // Fallback img
    html += `<img src="${fallbackSrc}" alt="${alt}" class="img-fluid">`;
    html += `</picture>`;
    
    return html;
}

/**
 * Preload hình ảnh
 * @param {string} url - URL hình ảnh
 */
function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

/**
 * Preload multiple images
 * @param {Array} urls - Array các URL
 */
function preloadImages(urls) {
    urls.forEach(url => preloadImage(url));
}

/**
 * Get image placeholder
 * @param {number} width - Chiều rộng
 * @param {number} height - Chiều cao
 * @param {string} text - Text
 * @returns {string} Placeholder URL
 */
function getPlaceholder(width = 400, height = 400, text = "Image") {
    return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
}

// ============================================
// IMAGE ATTRIBUTION
// ============================================
/**
 * Images Credit:
 * 
 * - Unsplash.com (CC0 License)
 * - Pexels.com (Public Domain)
 * - Pixabay.com (Public Domain)
 * 
 * Tất cả hình ảnh được sử dụng có quyền tự do
 * cho mục đích thương mại và cá nhân.
 */

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading if needed
    initLazyLoading();
    
    // Preload critical images
    preloadImages([
        ImageSources.heroes.main,
        ImageSources.products.leatherNotebook,
        ImageSources.products.fountainPen,
        ImageSources.products.paperA4
    ]);
    
    console.log('✓ Image utilities loaded');
});
