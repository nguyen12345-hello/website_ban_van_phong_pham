// ============================================
// PRODUCT DETAIL PAGE JAVASCRIPT
// ============================================

let currentProduct = null;
let currentQty = 1;

// Initialize Product Detail Page
document.addEventListener('DOMContentLoaded', function() {
    const productId = getQueryParam('id');
    
    if (!productId) {
        showNotification('Sản phẩm không tồn tại', 'error');
        setTimeout(() => {
            window.location.href = 'products.html';
        }, 2000);
        return;
    }

    loadProductDetail(parseInt(productId));
});

// Load Product Detail
function loadProductDetail(productId) {
    currentProduct = productsDatabase.find(p => p.id === productId);

    if (!currentProduct) {
        showNotification('Sản phẩm không tồn tại', 'error');
        window.location.href = 'products.html';
        return;
    }

    // Update breadcrumb
    document.getElementById('breadcrumbName').textContent = currentProduct.name;

    // Update product info
    document.getElementById('productName').textContent = currentProduct.name;
    document.getElementById('productImage').src = currentProduct.image;
    document.getElementById('productImage').alt = currentProduct.name;
    document.getElementById('categoryBadge').textContent = getCategoryName(currentProduct.category);
    document.getElementById('ratingValue').textContent = currentProduct.rating;
    document.getElementById('reviewCount').textContent = currentProduct.reviews;
    document.getElementById('productDescription').textContent = currentProduct.description;

    // Update pricing
    document.getElementById('oldPrice').textContent = formatPriceSimple(currentProduct.oldPrice);
    document.getElementById('currentPrice').textContent = formatPriceSimple(currentProduct.price);
    
    const discount = getDiscount(currentProduct.oldPrice, currentProduct.price);
    document.getElementById('discountBadge').textContent = `Tiết kiệm ${discount}%`;

    // Update stock
    document.getElementById('stockNumber').textContent = currentProduct.stock;
    if (currentProduct.stock > 0) {
        document.getElementById('stockStatus').textContent = 'Còn hàng';
        document.getElementById('stockStatus').style.color = '#27ae60';
    } else {
        document.getElementById('stockStatus').textContent = 'Hết hàng';
        document.getElementById('stockStatus').style.color = '#e74c3c';
    }

    // Update specs
    loadSpecs();

    // Update wishlist button
    updateWishlistButtonDetail();

    // Load related products
    loadRelatedProducts();

    // Update rating stars
    const starsCount = Math.floor(currentProduct.rating);
    const stars = '⭐'.repeat(starsCount) + '☆'.repeat(5 - starsCount);
    document.getElementById('ratingStars').textContent = stars;
}

// Load Specs
function loadSpecs() {
    const specsGrid = document.getElementById('specsGrid');
    if (!currentProduct.specs) return;

    specsGrid.innerHTML = Object.entries(currentProduct.specs).map(([key, value]) => `
        <div class="spec-item">
            <span class="spec-label">${key}:</span>
            <span class="spec-value">${value}</span>
        </div>
    `).join('');
}

// Load Related Products
function loadRelatedProducts() {
    const relatedProducts = productsDatabase
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    document.getElementById('relatedProducts').innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3>${product.name}</h3>
                <div class="product-footer">
                    <div class="product-pricing">
                        <span class="product-price">${formatPriceSimple(product.price)}</span>
                    </div>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-primary btn-small">Xem</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Quantity Control
function increaseQty() {
    const qtyInput = document.getElementById('productQty');
    const newQty = parseInt(qtyInput.value) + 1;
    if (newQty <= currentProduct.stock) {
        qtyInput.value = newQty;
    }
}

function decreaseQty() {
    const qtyInput = document.getElementById('productQty');
    const newQty = parseInt(qtyInput.value) - 1;
    if (newQty >= 1) {
        qtyInput.value = newQty;
    }
}

// Add to Cart
function addToCartDetail() {
    if (!currentProduct) return;

    const qty = parseInt(document.getElementById('productQty').value);
    if (qty < 1) {
        showNotification('Số lượng không hợp lệ', 'error');
        return;
    }

    if (qty > currentProduct.stock) {
        showNotification('Số lượng vượt quá kho', 'error');
        return;
    }

    for (let i = 0; i < qty; i++) {
        cart.addItem(currentProduct, 1);
    }

    showNotification(`Đã thêm ${qty} ${currentProduct.name} vào giỏ hàng`, 'success');
    
    // Reset quantity
    document.getElementById('productQty').value = 1;
}

// Wishlist
function toggleWishlistDetail() {
    if (!currentProduct) return;
    toggleWishlist(currentProduct.id);
    updateWishlistButtonDetail();
}

function updateWishlistButtonDetail() {
    const btn = document.getElementById('wishlistBtn');
    if (wishlist.isInWishlist(currentProduct.id)) {
        btn.innerHTML = '❤️ Yêu Thích';
        btn.classList.add('active');
    } else {
        btn.innerHTML = '🤍 Yêu Thích';
        btn.classList.remove('active');
    }
}

// Switch Product Tabs
function switchProductTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}
