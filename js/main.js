// ============================================
// MAIN JAVASCRIPT - Global Functionality
// ============================================

// Import Products Database từ products-data.js
// (Đảm bảo products-data.js được load trước main.js trong HTML)

// Nếu productsDatabase chưa được định nghĩa (từ products-data.js)
// Thì sử dụng mảng trống để tránh lỗi
if (typeof productsDatabase === 'undefined') {
    var productsDatabase = [];
}

// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }
        this.saveCart();
        this.showNotification('Đã thêm vào giỏ hàng');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cartCount');
        const count = this.getCount();
        cartCountElements.forEach(el => {
            el.textContent = count > 0 ? count : '0';
        });
    }

    showNotification(message) {
        // Simple notification
        console.log(message);
    }
}

// Initialize cart globally
const cart = new ShoppingCart();

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    cart.updateCartCount();
    
    // Check if we're on featured products section
    if (document.getElementById('featuredProducts')) {
        displayFeaturedProducts();
    }
});

// Display Featured Products on Home Page
function displayFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featured = productsDatabase.filter(p => p.popular).slice(0, 6);
    
    container.innerHTML = featured.map(product => `
        <div class="product-card ${product.sale ? 'sale' : ''}">
            <div class="product-image">${product.icon}</div>
            <div class="product-content">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))} (${product.rating})
                </div>
            </div>
            <div class="product-footer">
                <div class="product-pricing">
                    <span class="product-price old">${formatPrice(product.oldPrice)}</span>
                    <span class="product-price">${formatPrice(product.price)}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Thêm
                </button>
            </div>
        </div>
    `).join('');
}

// Add Product to Cart
function addToCart(productId) {
    // Check if user is logged in using authGuard
    if (!authGuard.checkAuth('addToCart')) {
        return; // authGuard will handle the redirect
    }

    const product = productsDatabase.find(p => p.id === productId);
    if (!product) {
        if (typeof notify !== 'undefined') {
            notify.error('❌ Sản phẩm không tồn tại');
        }
        return;
    }

    cart.addItem(product, 1);
    
    // Show success notification
    if (typeof notify !== 'undefined') {
        notify.success(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`, 3000);
    }

    // Cập nhật số lượng giỏ hàng trên bất kỳ trang nào
    cart.updateCartCount();
}

// Get Category Name
function getCategoryName(category) {
    const categories = {
        'paper': 'Giấy & Tập',
        'pen': 'Bút & Chì',
        'tools': 'Dụng Cụ',
        'other': 'Khác'
    };
    return categories[category] || category;
}

// Format Currency
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Format Price for Display (without currency symbol in some cases)
function formatPriceSimple(price) {
    const formatter = new Intl.NumberFormat('vi-VN');
    return formatter.format(price) + 'đ';
}

// Search functionality (if needed)
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const query = searchInput.value.toLowerCase();
        console.log('Searching for: ' + query);
        // Search logic would go here
    }
}

// Navbar active state
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.href.includes(currentPage) || 
            (currentPage.includes('index.html') && link.href.includes('index')) ||
            (currentPage === '/' && link.href.includes('index'))) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cart, productsDatabase, formatPrice, formatPriceSimple };
}
