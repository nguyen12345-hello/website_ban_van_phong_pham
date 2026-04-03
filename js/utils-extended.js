// ============================================
// UTILS - HELPER FUNCTIONS FOR PRODUCTS
// Hỗ trợ các chức năng chung
// ============================================

// ============================================
// CART MANAGEMENT
// ============================================

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param {number} productId - ID sản phẩm
 */
function addToCart(productId) {
    // Kiểm tra đăng nhập trước khi thêm vào giỏ hàng
    if (!auth || !auth.isLoggedIn()) {
        showNotification('Vui lòng đăng nhập để mua hàng!', 'error');
        setTimeout(() => {
            window.location.href = '../html/home.html';
        }, 2000);
        return false;
    }

    // Use the unified global cart system if available
    if (typeof cart !== 'undefined' && cart && typeof cart.addItem === 'function') {
        return cart.addItem(productId);
    }

    // Fallback to old system
    let cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    const product = productsDatabase.find(p => p.id == productId);
    
    if (!product) return false;
    
    // Check if product already in cart
    const existingItem = cartData.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartData.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || product.icon,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cartData));
    updateCartCount();
    return true;
}

/**
 * Thêm vào giỏ hàng và hiển thị thông báo
 * @param {number} productId - ID sản phẩm
 */
function addToCartAndShowNotification(productId) {
    if (addToCart(productId)) {
        showNotification('✓ Đã thêm vào giỏ hàng!', 'success');
    }
}

/**
 * Cập nhật số lượng giỏ hàng trên header
 */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

/**
 * Lấy toàn bộ giỏ hàng
 * @returns {Array} Danh sách sản phẩm trong giỏ
 */
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

/**
 * Xóa sản phẩm khỏi giỏ hàng
 * @param {number} productId - ID sản phẩm
 */
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.id != productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

/**
 * Xóa toàn bộ giỏ hàng
 */
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

/**
 * Tính tổng tiền giỏ hàng
 * @returns {number} Tổng tiền
 */
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ============================================
// FORMATTING FUNCTIONS
// ============================================

/**
 * Format giá tiền sang định dạng Việt
 * @param {number} price - Giá tiền
 * @returns {string} Giá đã format (vd: 100,000đ)
 */
function formatPrice(price) {
    if (typeof price !== 'number') price = parseFloat(price);
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

/**
 * Format giá đơn giản
 * @param {number} price - Giá tiền
 * @returns {string} Giá đơn giản (vd: 100,000đ)
 */
function formatPriceSimple(price) {
    if (typeof price !== 'number') price = parseFloat(price);
    return price.toLocaleString('vi-VN') + 'đ';
}

/**
 * Format ngày tháng
 * @param {Date|string} date - Ngày tháng
 * @returns {string} Ngày đã format
 */
function formatDate(date) {
    if (typeof date === 'string') date = new Date(date);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Format giờ
 * @param {Date|string} date - Ngày giờ
 * @returns {string} Giờ đã format
 */
function formatTime(date) {
    if (typeof date === 'string') date = new Date(date);
    return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ============================================
// PRODUCT SEARCH & FILTER HELPERS
// ============================================

/**
 * Tìm sản phẩm theo ID
 * @param {number} productId - ID sản phẩm
 * @returns {Object|null} Sản phẩm nếu tìm thấy
 */
function getProductById(productId) {
    return productsDatabase.find(p => p.id == productId) || null;
}

/**
 * Tìm sản phẩm theo tên (partial match)
 * @param {string} query - Tên tìm kiếm
 * @returns {Array} Danh sách sản phẩm
 */
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return productsDatabase.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
}

/**
 * Lọc sản phẩm theo danh mục
 * @param {string} category - Tên danh mục
 * @returns {Array} Danh sách sản phẩm
 */
function filterByCategory(category) {
    return productsDatabase.filter(p => p.category === category);
}

/**
 * Lọc sản phẩm theo giá
 * @param {number} minPrice - Giá tối thiểu
 * @param {number} maxPrice - Giá tối đa
 * @returns {Array} Danh sách sản phẩm
 */
function filterByPrice(minPrice, maxPrice) {
    return productsDatabase.filter(p => 
        p.price >= minPrice && p.price <= maxPrice
    );
}

/**
 * Lọc sản phẩm sale
 * @returns {Array} Danh sách sản phẩm đang sale
 */
function getSaleProducts() {
    return productsDatabase.filter(p => p.sale === true);
}

/**
 * Lọc sản phẩm phổ biến
 * @returns {Array} Danh sách sản phẩm phổ biến
 */
function getPopularProducts() {
    return productsDatabase.filter(p => p.popular === true);
}

/**
 * Sắp xếp sản phẩm theo giá tăng
 * @param {Array} products - Danh sách sản phẩm
 * @returns {Array} Danh sách đã sắp xếp
 */
function sortByPriceAsc(products) {
    return [...products].sort((a, b) => a.price - b.price);
}

/**
 * Sắp xếp sản phẩm theo giá giảm
 * @param {Array} products - Danh sách sản phẩm
 * @returns {Array} Danh sách đã sắp xếp
 */
function sortByPriceDesc(products) {
    return [...products].sort((a, b) => b.price - a.price);
}

/**
 * Sắp xếp sản phẩm theo rating
 * @param {Array} products - Danh sách sản phẩm
 * @returns {Array} Danh sách đã sắp xếp
 */
function sortByRating(products) {
    return [...products].sort((a, b) => b.rating - a.rating);
}

/**
 * Sắp xếp sản phẩm theo số review
 * @param {Array} products - Danh sách sản phẩm
 * @returns {Array} Danh sách đã sắp xếp
 */
function sortByReviews(products) {
    return [...products].sort((a, b) => b.reviews - a.reviews);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

/**
 * Hiển thị thông báo
 * @param {string} message - Nội dung thông báo
 * @param {string} type - Loại (success, error, info, warning)
 * @param {number} duration - Thời gian hiển thị (ms)
 */
function showNotification(message, type = 'info', duration = 3000) {
    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        info: '#2196F3',
        warning: '#FF9800'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.95rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease;
        z-index: 10000;
        max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Hiển thị lỗi
 * @param {string} message - Nội dung lỗi
 */
function showError(message) {
    showNotification(message, 'error');
}

/**
 * Hiển thị thành công
 * @param {string} message - Nội dung thông báo
 */
function showSuccess(message) {
    showNotification(message, 'success');
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Kiểm tra email hợp lệ
 * @param {string} email - Email cần kiểm tra
 * @returns {boolean} True nếu hợp lệ
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Kiểm tra số điện thoại Việt hợp lệ
 * @param {string} phone - Số điện thoại
 * @returns {boolean} True nếu hợp lệ
 */
function isValidPhoneVN(phone) {
    const regex = /^(\+84|0)[0-9]{9,10}$/;
    return regex.test(phone);
}

/**
 * Kiểm tra URL hợp lệ
 * @param {string} url - URL cần kiểm tra
 * @returns {boolean} True nếu hợp lệ
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// ============================================
// DOM MANIPULATION
// ============================================

/**
 * Lấy element theo ID
 * @param {string} id - ID của element
 * @returns {Element|null} Element nếu tìm thấy
 */
function getById(id) {
    return document.getElementById(id);
}

/**
 * Lấy element theo class
 * @param {string} className - Class name
 * @returns {NodeList} Danh sách elements
 */
function getByClass(className) {
    return document.getElementsByClassName(className);
}

/**
 * Lấy element đầu tiên theo selector
 * @param {string} selector - CSS selector
 * @returns {Element|null} Element nếu tìm thấy
 */
function getBySelector(selector) {
    return document.querySelector(selector);
}

/**
 * Lấy tất cả elements theo selector
 * @param {string} selector - CSS selector
 * @returns {NodeList} Danh sách elements
 */
function getBySelectors(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Ẩn element
 * @param {Element|string} element - Element hoặc ID
 */
function hide(element) {
    if (typeof element === 'string') element = getById(element);
    if (element) element.style.display = 'none';
}

/**
 * Hiện element
 * @param {Element|string} element - Element hoặc ID
 * @param {string} display - Loại display (block, flex, grid, etc)
 */
function show(element, display = 'block') {
    if (typeof element === 'string') element = getById(element);
    if (element) element.style.display = display;
}

/**
 * Thêm class vào element
 * @param {Element|string} element - Element hoặc ID
 * @param {string} className - Class name
 */
function addClass(element, className) {
    if (typeof element === 'string') element = getById(element);
    if (element) element.classList.add(className);
}

/**
 * Xóa class khỏi element
 * @param {Element|string} element - Element hoặc ID
 * @param {string} className - Class name
 */
function removeClass(element, className) {
    if (typeof element === 'string') element = getById(element);
    if (element) element.classList.remove(className);
}

/**
 * Toggle class
 * @param {Element|string} element - Element hoặc ID
 * @param {string} className - Class name
 */
function toggleClass(element, className) {
    if (typeof element === 'string') element = getById(element);
    if (element) element.classList.toggle(className);
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

/**
 * Lưu dữ liệu vào localStorage
 * @param {string} key - Key
 * @param {any} value - Giá trị (sẽ được convert thành JSON)
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Error saving to storage:', e);
        return false;
    }
}

/**
 * Lấy dữ liệu từ localStorage
 * @param {string} key - Key
 * @param {any} defaultValue - Giá trị mặc định nếu không tìm thấy
 * @returns {any} Giá trị được parse
 */
function getFromStorage(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
        console.error('Error reading from storage:', e);
        return defaultValue;
    }
}

/**
 * Xóa dữ liệu khỏi localStorage
 * @param {string} key - Key
 */
function removeFromStorage(key) {
    localStorage.removeItem(key);
}

/**
 * Xóa toàn bộ localStorage
 */
function clearStorage() {
    localStorage.clear();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Deep clone object
 * @param {Object} obj - Object cần clone
 * @returns {Object} Clone object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Kiểm tra object trống
 * @param {Object} obj - Object cần kiểm tra
 * @returns {boolean} True nếu trống
 */
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Delay (promise-based)
 * @param {number} ms - Milliseconds
 * @returns {Promise} Promise
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function
 * @param {Function} func - Hàm cần debounce
 * @param {number} wait - Thời gian chờ (ms)
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 * @param {Function} func - Hàm cần throttle
 * @param {number} limit - Thời gian giới hạn (ms)
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Random số từ min tới max
 * @param {number} min - Số tối thiểu
 * @param {number} max - Số tối đa
 * @returns {number} Số ngẫu nhiên
 */
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Chuyển đổi mảng thành object key-value
 * @param {Array} arr - Mảng
 * @param {string} keyName - Tên key
 * @returns {Object} Object
 */
function arrayToObject(arr, keyName = 'id') {
    return arr.reduce((obj, item) => {
        obj[item[keyName]] = item;
        return obj;
    }, {});
}

// ============================================
// ANALYTICS & LOGGING
// ============================================

/**
 * Log sự kiện
 * @param {string} eventName - Tên sự kiện
 * @param {Object} data - Dữ liệu
 */
function logEvent(eventName, data = {}) {
    console.log(`[${new Date().toLocaleTimeString()}] ${eventName}:`, data);
}

/**
 * Track page view
 * @param {string} pageName - Tên trang
 */
function trackPageView(pageName) {
    logEvent('PageView', { page: pageName });
}

/**
 * Track user action
 * @param {string} action - Action name
 * @param {Object} details - Chi tiết
 */
function trackUserAction(action, details = {}) {
    logEvent('UserAction', { action, ...details });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    console.log('✓ Utils loaded successfully');
});

// Add animation styles
const animationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

console.log('✓ All utils ready to use');
