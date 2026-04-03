// ============================================
// PRODUCTS PAGE JAVASCRIPT
// ============================================

let filteredProducts = [...productsDatabase];
let currentSort = 'newest';
let currentPriceFilter = 500000;

// Initialize Products Page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupFilters();
    setupPricing();
});

// Display Products
function displayProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="no-products" style="grid-column: 1/-1;">
                <p>Không tìm thấy sản phẩm phù hợp</p>
                <a href="products.html" class="btn btn-primary">Xem lại tất cả</a>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredProducts.map(product => `
        <a href="product-detail.html?id=${product.id}" style="text-decoration: none; color: inherit; display: flex;">
            <div class="product-card ${product.sale ? 'sale' : ''}" style="cursor: pointer; width: 100%;">
                <div class="product-image">${product.icon}</div>
                <div class="product-content">
                    <div class="product-category">${getCategoryName(product.category)}</div>
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        ${'⭐'.repeat(Math.floor(product.rating))} <span style="color: #999;">(${product.rating})</span>
                    </div>
                </div>
                <div class="product-footer">
                    <div class="product-pricing">
                        <span class="product-price old">${formatPriceSimple(product.oldPrice)}</span>
                        <span class="product-price">${formatPriceSimple(product.price)}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="event.preventDefault(); event.stopPropagation(); addToCartAndShowNotification(${product.id})">
                        <span>🛒</span> Thêm
                    </button>
                </div>
            </div>
        </a>
    `).join('');
}

// Setup Filters
function setupFilters() {
    const checkboxes = document.querySelectorAll('.category-filter');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    const priceSlider = document.getElementById('priceSlider');
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            currentPriceFilter = parseInt(this.value);
            document.getElementById('priceValue').textContent = formatPriceSimple(currentPriceFilter).replace('đ', '').trim();
            applyFilters();
        });
    }
}

// Setup Pricing Display
function setupPricing() {
    const priceSlider = document.getElementById('priceSlider');
    if (priceSlider) {
        document.getElementById('priceValue').textContent = formatPriceSimple(currentPriceFilter).replace('đ', '').trim();
    }
}

// Apply Filters
function applyFilters() {
    const selectedCategories = [];
    const checkboxes = document.querySelectorAll('.category-filter:checked');
    
    checkboxes.forEach(checkbox => {
        if (checkbox.value !== 'all') {
            selectedCategories.push(checkbox.value);
        }
    });

    // If "all" is checked or no categories selected, show all
    if (selectedCategories.length === 0) {
        const allCheckbox = document.querySelector('.category-filter[value="all"]');
        if (allCheckbox && allCheckbox.checked) {
            filteredProducts = productsDatabase.filter(p => p.price <= currentPriceFilter);
        } else {
            filteredProducts = productsDatabase.filter(p => p.price <= currentPriceFilter);
        }
    } else {
        filteredProducts = productsDatabase.filter(p => 
            selectedCategories.includes(p.category) && p.price <= currentPriceFilter
        );
    }

    // Apply current sorting
    applySorting();
    displayProducts();
}

// Sort Products
function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        currentSort = sortSelect.value;
        applySorting();
        displayProducts();
    }
}

// Apply Sorting
function applySorting() {
    switch(currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
        default:
            // Keep original order (newest products are listed first in database)
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
    }
}

// Search Products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const query = searchInput.value.toLowerCase();
        
        if (query.trim() === '') {
            applyFilters();
            return;
        }

        filteredProducts = productsDatabase.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            getCategoryName(p.category).toLowerCase().includes(query)
        );

        applySorting();
        displayProducts();
    }
}

// Add to Cart with Notification
function addToCartAndShowNotification(productId) {
    if (addToCart(productId)) {
        showNotification('✓ Đã thêm vào giỏ hàng!', 'success');
    }
}

// Animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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
document.head.appendChild(style);

// Handle category filter "all" checkbox
document.addEventListener('DOMContentLoaded', function() {
    const allCheckbox = document.querySelector('.category-filter[value="all"]');
    const otherCheckboxes = document.querySelectorAll('.category-filter:not([value="all"])');
    
    if (allCheckbox) {
        allCheckbox.addEventListener('change', function() {
            if (this.checked) {
                otherCheckboxes.forEach(cb => cb.checked = false);
            }
            applyFilters();
        });

        otherCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    allCheckbox.checked = false;
                }
                applyFilters();
            });
        });
    }
});

// Handle Enter key in search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
        
        // Live search as user types
        searchInput.addEventListener('input', function() {
            searchProducts();
        });
    }
});

// Handle Sort Change
function handleSort(event) {
    if (event) {
        currentSort = event.target.value;
    }
    sortProducts();
}

// Reset All Filters
function resetFilters() {
    // Reset category filters
    const allCheckbox = document.querySelector('.category-filter[value="all"]');
    const otherCheckboxes = document.querySelectorAll('.category-filter:not([value="all"])');
    
    if (allCheckbox) {
        allCheckbox.checked = true;
        otherCheckboxes.forEach(cb => cb.checked = false);
    }

    // Reset price filter
    const priceSlider = document.getElementById('priceSlider');
    if (priceSlider) {
        priceSlider.value = 500000;
        currentPriceFilter = 500000;
        setupPricing();
    }

    // Reset sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.value = 'newest';
        currentSort = 'newest';
    }

    // Clear search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }

    // Apply fresh filters
    applyFilters();
}
