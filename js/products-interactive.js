// ============================================
// PRODUCTS INTERACTIVE FEATURES
// Hiệu ứng tương tác nâng cao
// ============================================

// State Management
const ProductsState = {
    filteredProducts: [...productsDatabase],
    currentSort: 'newest',
    currentPriceFilter: 500000,
    currentCategoryFilter: ['all'],
    selectedProduct: null,
    searchQuery: ''
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    setupEventListeners();
    displayProducts();
});

function initializeProducts() {
    console.log('Initializing products system...');
    console.log('Total products:', productsDatabase.length);
    
    // Initialize modal
    createProductDetailModal();
    
    // Setup animations
    setupScrollAnimations();
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Category filters
    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryFilter);
    });
    
    // Price slider
    const priceSlider = document.getElementById('priceSlider');
    if (priceSlider) {
        priceSlider.addEventListener('input', handlePriceFilter);
    }
    
    // Sort dropdown
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Click outside modal
    document.addEventListener('click', closeModalOnBackdrop);
}

// ============================================
// PRODUCT DISPLAY
// ============================================
function displayProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    // Filter products
    applyFilters();
    
    // Sort products
    sortProductsList();
    
    if (ProductsState.filteredProducts.length === 0) {
        showNoProducts(container);
        return;
    }
    
    // Render products
    container.innerHTML = ProductsState.filteredProducts.map((product, index) => 
        createProductCardHTML(product, index)
    ).join('');
    
    // Add event listeners to product cards
    setupProductCardListeners();
    
    // Trigger animations
    animateProductCards();
}

function createProductCardHTML(product, index) {
    const discount = calculateDiscount(product.price, product.oldPrice);
    const categoryColor = getCategoryColor(product.category);
    const productImage = product.thumbnail || product.image;
    
    return `
        <div class="product-card ${product.sale ? 'sale' : ''}" 
             data-product-id="${product.id}"
             data-index="${index}"
             style="animation-delay: ${index * 0.05}s;">
            
            ${product.sale ? '<div class="sale-badge">-' + discount + '%</div>' : ''}
            ${product.popular ? '<div class="popular-badge">🌟 Phổ biến</div>' : ''}
            
            <div class="product-image" style="background: linear-gradient(135deg, ${categoryColor} 0%, #f0f0f0 100%);">
                <img src="${productImage}" alt="${product.name}" class="product-img" onload="this.style.opacity='1'" onerror="this.style.display='none'; this.parentElement.textContent='${product.icon}'" style="opacity: 0; transition: opacity 0.3s ease;">
            </div>
            
            <div class="product-content">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 title="${product.name}">${product.name}</h3>
                <p class="product-description">${truncateText(product.description, 60)}</p>
                <div class="product-rating">
                    <span>${'⭐'.repeat(Math.floor(product.rating))}</span>
                    <span>(${product.rating}) • ${product.reviews} đánh giá</span>
                </div>
            </div>
            
            <div class="product-footer">
                <div class="product-pricing">
                    <span class="product-price">${formatPriceSimple(product.price)}</span>
                    <span class="product-price old">${formatPriceSimple(product.oldPrice)}</span>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button onclick="addToCartWithEffect(${product.id})" 
                            style="flex: 1; padding: 12px; background: #2C3E50; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 1rem;">
                        🛒 Thêm
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// FILTER FUNCTIONS
// ============================================
function handleCategoryFilter(e) {
    const value = e.target.value;
    const allCheckbox = document.querySelector('.category-filter[value="all"]');
    
    if (value === 'all') {
        document.querySelectorAll('.category-filter').forEach(cb => {
            cb.checked = true;
        });
        ProductsState.currentCategoryFilter = ['all'];
    } else {
        if (allCheckbox.checked && value !== 'all') {
            allCheckbox.checked = false;
        }
        
        ProductsState.currentCategoryFilter = Array.from(
            document.querySelectorAll('.category-filter:checked')
        ).map(cb => cb.value).filter(v => v !== 'all');
        
        if (ProductsState.currentCategoryFilter.length === 0) {
            ProductsState.currentCategoryFilter = ['all'];
            allCheckbox.checked = true;
        }
    }
    
    displayProducts();
}

function handlePriceFilter(e) {
    const value = parseInt(e.target.value);
    ProductsState.currentPriceFilter = value;
    
    const priceValue = document.getElementById('priceValue');
    if (priceValue) {
        priceValue.textContent = formatPriceSimple(value).replace('đ', '');
    }
    
    displayProducts();
}

function handleSort(e) {
    ProductsState.currentSort = e.target.value;
    displayProducts();
}

function handleSearch(e) {
    ProductsState.searchQuery = e.target.value.toLowerCase();
    displayProducts();
}

function applyFilters() {
    ProductsState.filteredProducts = productsDatabase.filter(product => {
        // Category filter
        if (ProductsState.currentCategoryFilter[0] !== 'all') {
            if (!ProductsState.currentCategoryFilter.includes(product.category)) {
                return false;
            }
        }
        
        // Price filter
        if (product.price > ProductsState.currentPriceFilter) {
            return false;
        }
        
        // Search filter
        if (ProductsState.searchQuery) {
            const searchFields = [
                product.name,
                product.description,
                product.category,
                ...(product.tags || [])
            ].join(' ').toLowerCase();
            
            if (!searchFields.includes(ProductsState.searchQuery)) {
                return false;
            }
        }
        
        return true;
    });
}

function sortProductsList() {
    const sorted = [...ProductsState.filteredProducts];
    
    switch (ProductsState.currentSort) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            sorted.sort((a, b) => b.popular - a.popular || b.rating - a.rating);
            break;
        case 'newest':
        default:
            sorted.sort((a, b) => b.id - a.id);
            break;
    }
    
    ProductsState.filteredProducts = sorted;
}

// ============================================
// PRODUCT CARD INTERACTIONS
// ============================================
function setupProductCardListeners() {
    document.querySelectorAll('.product-card').forEach(card => {
        // Card click to show detail
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.add-to-cart-btn')) {
                showProductDetail(this.dataset.productId);
            }
        });
        
        // Add to cart button
        const addBtn = card.querySelector('.add-to-cart-btn');
        if (addBtn) {
            addBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                addToCartWithEffect(this.dataset.productId);
            });
        }
    });
}

function addToCartWithEffect(productId, event) {

    // ✅ Kiểm tra đăng nhập
    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
        new bootstrap.Modal(document.getElementById('loginModal')).show();
        return;
    }

    // ✅ Xử lý thêm vào giỏ
    if (typeof cart !== 'undefined' && cart && typeof cart.addItem === 'function') {
        const result = cart.addItem(productId);

        if (result) {
            showNotification('✓ Đã thêm vào giỏ hàng!', 'success');

            if (typeof updateCartCount === 'function') updateCartCount();
            if (typeof updateCartModalDisplay === 'function') updateCartModalDisplay();
            if (typeof displayCartItems === 'function') displayCartItems();

            // Hiệu ứng bay
            const product = productsDatabase.find(p => p.id == productId);
            if (!product) return;

            const floatingElement = document.createElement('div');
            floatingElement.textContent = product.icon;
            floatingElement.style.cssText = `
                position: fixed;
                pointer-events: none;
                font-size: 32px;
                animation: floatUp 1s ease-out forwards;
                z-index: 9999;
            `;

            if (event) {
                const btn = event.target.closest('button');
                if (btn) {
                    const rect = btn.getBoundingClientRect();
                    floatingElement.style.left = rect.left + 'px';
                    floatingElement.style.top = rect.top + 'px';

                    document.body.appendChild(floatingElement);
                    setTimeout(() => floatingElement.remove(), 1000);
                }
            }
        }
    } else {
        // Fallback
        const result = addToCartAndShowNotification(productId);

        if (typeof updateCartCount === 'function') updateCartCount();
        if (typeof updateCartModalDisplay === 'function') updateCartModalDisplay();
    }
}

// ============================================
// PRODUCT DETAIL MODAL
// ============================================
function createProductDetailModal() {
    if (document.getElementById('productDetailModal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'productDetailModal';
    modal.className = 'product-detail-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">✕</button>
            <div id="modalDetailContent"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', closeProductDetail);
}

function showProductDetail(productId) {
    const product = productsDatabase.find(p => p.id == productId);
    if (!product) return;
    
    const discount = calculateDiscount(product.price, product.oldPrice);
    const modal = document.getElementById('productDetailModal');
    const content = modal.querySelector('#modalDetailContent');
    
    content.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
            <!-- Left: Image -->
            <div>
                <div style="
                    background: linear-gradient(135deg, ${getCategoryColor(product.category)} 0%, #f0f0f0 100%);
                    border-radius: 8px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 400px;
                    margin-bottom: 1rem;
                    font-size: 180px;
                ">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.parentElement.textContent='${product.icon}';">
                </div>
            </div>
            
            <!-- Right: Details -->
            <div>
                <div style="display: inline-block; background: #D4AF37; color: #2C3E50; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase;">
                    ${getCategoryName(product.category)}
                </div>
                
                <h2 style="font-size: 1.8rem; color: #2C3E50; margin-bottom: 1rem; font-weight: 700;">
                    ${product.name}
                </h2>
                
                <div style="margin-bottom: 1.5rem;">
                    <div style="font-size: 0.9rem; color: #999; margin-bottom: 0.5rem;">
                        Đánh giá: ${'⭐'.repeat(Math.floor(product.rating))} (${product.rating}) • ${product.reviews} đánh giá
                    </div>
                </div>
                
                <!-- Pricing -->
                <div style="margin-bottom: 1.5rem; padding: 1rem; background: #F8F5F0; border-radius: 8px;">
                    <div style="display: flex; gap: 1rem; align-items: baseline;">
                        <span style="font-size: 2rem; color: #D4AF37; font-weight: 700;">
                            ${formatPriceSimple(product.price)}
                        </span>
                        <span style="font-size: 1.1rem; color: #999; text-decoration: line-through;">
                            ${formatPriceSimple(product.oldPrice)}
                        </span>
                        <span style="padding: 6px 12px; background: #E63946; color: white; border-radius: 4px; font-weight: 700; font-size: 0.9rem;">
                            -${discount}%
                        </span>
                    </div>
                    <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #999;">
                        Còn: ${product.stock} sản phẩm
                    </div>
                </div>
                
                <!-- Description -->
                <p style="color: #666; margin-bottom: 1.5rem; line-height: 1.6;">
                    ${product.description}
                </p>
                
                <!-- Specifications -->
                ${createSpecsHTML(product)}
                
                <!-- Features -->
                ${createFeaturesHTML(product)}
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button onclick="addToCartWithEffect(${product.id})" 
                            style="flex: 1; padding: 12px; background: #2C3E50; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 1rem;">
                        🛒 Thêm vào giỏ hàng
                    </button>
                    <button onclick="toggleWishlist(${product.id})" 
                            style="flex: 1; padding: 12px; background: transparent; color: #D4AF37; border: 2px solid #D4AF37; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 1rem;">
                        ❤️ Yêu thích
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createSpecsHTML(product) {
    if (!product.specs) return '';
    
    const specsEntries = Object.entries(product.specs);
    if (specsEntries.length === 0) return '';
    
    const specsHTML = specsEntries.map(([key, value]) => `
        <div class="spec-item">
            <div class="spec-label">${key}</div>
            <div class="spec-value">${value}</div>
        </div>
    `).join('');
    
    return `
        <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.2rem; color: #2C3E50; margin-bottom: 1rem; font-weight: 700;">
                Thông số kỹ thuật
            </h3>
            <div class="specs-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                ${specsHTML}
            </div>
        </div>
    `;
}

function createFeaturesHTML(product) {
    if (!product.features || product.features.length === 0) return '';
    
    const featuresHTML = product.features.map(feature => `
        <li style="padding: 8px 0; padding-left: 1.5rem; position: relative; color: #333;">
            <span style="position: absolute; left: 0; color: #D4AF37; font-weight: 700;">✓</span>
            ${feature}
        </li>
    `).join('');
    
    return `
        <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.2rem; color: #2C3E50; margin-bottom: 1rem; font-weight: 700;">
                Đặc điểm nổi bật
            </h3>
            <ul style="list-style: none; padding: 0;">
                ${featuresHTML}
            </ul>
        </div>
    `;
}

function closeProductDetail() {
    const modal = document.getElementById('productDetailModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function closeModalOnBackdrop(e) {
    const modal = document.getElementById('productDetailModal');
    if (modal && e.target === modal) {
        closeProductDetail();
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function calculateDiscount(currentPrice, oldPrice) {
    if (oldPrice <= currentPrice) return 0;
    return Math.round((1 - currentPrice / oldPrice) * 100);
}

function truncateText(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

function showNoProducts(container) {
    container.innerHTML = `
        <div class="no-products">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
            <p>Không tìm thấy sản phẩm phù hợp với tiêu chí lọc của bạn</p>
            <button onclick="resetFilters()" style="
                padding: 10px 20px;
                background: #2C3E50;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 700;
                margin-top: 1rem;
            ">
                Xóa bộ lọc
            </button>
        </div>
    `;
}

function resetFilters() {
    ProductsState.searchQuery = '';
    ProductsState.currentPriceFilter = 500000;
    ProductsState.currentCategoryFilter = ['all'];
    ProductsState.currentSort = 'newest';
    
    // Reset UI
    document.querySelectorAll('.category-filter').forEach(cb => cb.checked = cb.value === 'all');
    const priceSlider = document.getElementById('priceSlider');
    if (priceSlider) priceSlider.value = 500000;
    const priceValue = document.getElementById('priceValue');
    if (priceValue) priceValue.textContent = '500.000';
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'newest';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    displayProducts();
}

// ============================================
// ANIMATIONS
// ============================================
function animateProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s both`;
    });
}

function setupScrollAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes floatUp {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// WISHLIST FUNCTIONALITY
// ============================================
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('Đã xóa khỏi yêu thích', 'info');
    } else {
        wishlist.push(productId);
        showNotification('Đã thêm vào yêu thích ❤️', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        animation: slideIn 0.3s ease;
        z-index: 10000;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CODE MẪU:
