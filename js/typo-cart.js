// ============================================
// TYPO VN - CART & AUTH SYSTEM
// Hệ thống giỏ hàng + xác thực đăng nhập
// ============================================

// Cart array
let cart = [];

// Auth system
let auth = {
    users: {
        'user1': '123',
        'user2': '123'
    },
    currentUser: null,
    
    login(username, password) {
        if (this.users[username] === password) {
            this.currentUser = username;
            localStorage.setItem('currentUser', username);
            return true;
        }
        return false;
    },
    
    register(username, email, password) {
        if (this.users[username]) {
            return false; // User already exists
        }
        this.users[username] = password;
        localStorage.setItem('users', JSON.stringify(this.users));
        return true;
    },
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    },
    
    isLoggedIn() {
        return this.currentUser !== null;
    },
    
    init() {
        const saved = localStorage.getItem('currentUser');
        if (saved) {
            this.currentUser = saved;
        }
    }
};

// ============================================
// CART FUNCTIONS
// ============================================

/**
 * Add product to cart
 */
function addToCart(productName, price) {
    // Check if logged in
    if (!auth.isLoggedIn()) {
        showNotification('⚠️ Vui lòng đăng nhập để mua hàng!', 'warning');
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return false;
    }
    
    // Check if product already in cart
    const existing = cart.find(item => item.name === productName);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: Math.random(),
            name: productName,
            price: price,
            quantity: 1,
            image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2250%22 font-size=%2240%22 text-anchor=%22middle%22 dy=%22.3em%22%3E%F0%9F%93%A6%3C/text%3E%3C/svg%3E'
        });
    }
    
    saveCart();
    updateCart();
    showNotification(`✅ Đã thêm "${productName}" vào giỏ hàng!`, 'success');
    
    return true;
}

/**
 * Save cart to localStorage
 */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Load cart from localStorage
 */
function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}

/**
 * Update cart display
 */
function updateCart() {
    updateCartCount();
    updateCartModal();
}

/**
 * Update cart count badge
 */
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounts = document.querySelectorAll('#cartCount');
    cartCounts.forEach(el => {
        el.textContent = totalItems > 0 ? totalItems : '0';
    });
}

/**
 * Update cart modal display
 */
function updateCartModal() {
    const cartItemsBody = document.getElementById('cartItemsBody');
    const cartCountModal = document.getElementById('cartCountModal');
    const cartTotalModal = document.getElementById('cartTotalModal');
    
    if (!cartItemsBody) return;
    
    // Update count
    if (cartCountModal) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountModal.textContent = totalItems;
    }
    
    // If empty
    if (cart.length === 0) {
        cartItemsBody.innerHTML = `
            <div class="text-center py-5">
                <p style="font-size: 3rem; margin-bottom: 1rem;">🛒</p>
                <p class="text-muted fs-5">Giỏ hàng trống. Hãy thêm sản phẩm!</p>
            </div>
        `;
        if (cartTotalModal) cartTotalModal.textContent = '0 VNĐ';
        return;
    }
    
    // Render items
    cartItemsBody.innerHTML = `
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Sản Phẩm</th>
                        <th>Giá</th>
                        <th>Số Lượng</th>
                        <th>Thành Tiền</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => `
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <div style="width: 50px; height: 50px; background: #f5f5f5; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                                        📦
                                    </div>
                                    <strong>${item.name}</strong>
                                </div>
                            </td>
                            <td style="font-weight: 600;">${formatPrice(item.price)}</td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 5px;">
                                    <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" 
                                            style="padding: 5px 10px; cursor: pointer; border: 1px solid #ddd; background: #f9f9f9; border-radius: 4px;">
                                        −
                                    </button>
                                    <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                                    <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" 
                                            style="padding: 5px 10px; cursor: pointer; border: 1px solid #ddd; background: #f9f9f9; border-radius: 4px;">
                                        +
                                    </button>
                                </div>
                            </td>
                            <td style="font-weight: 600; color: #28a745;">${formatPrice(item.price * item.quantity)}</td>
                            <td>
                                <button onclick="removeFromCart('${item.id}')" 
                                        style="color: #e74c3c; background: none; border: none; cursor: pointer; font-size: 1.2rem;">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotalModal) cartTotalModal.textContent = formatPrice(total);
}

/**
 * Update quantity
 */
function updateQuantity(id, quantity) {
    if (quantity < 1) {
        removeFromCart(id);
        return;
    }
    
    const item = cart.find(p => p.id == id);
    if (item) {
        item.quantity = quantity;
        saveCart();
        updateCart();
    }
}

/**
 * Remove from cart
 */
function removeFromCart(id) {
    cart = cart.filter(item => item.id != id);
    saveCart();
    updateCart();
    showNotification('✓ Đã xóa khỏi giỏ hàng', 'info');
}

/**
 * Clear cart
 */
function clearCart() {
    if (confirm('Bạn chắc chắn muốn xóa tất cả sản phẩm?')) {
        cart = [];
        saveCart();
        updateCart();
        showNotification('✓ Đã xóa tất cả sản phẩm', 'info');
    }
}

/**
 * Format price
 */
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8';
    const textColor = type === 'warning' ? '#000' : '#fff';
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 20px;
        background: ${bgColor};
        color: ${textColor};
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// AUTHENTICATION SETUP
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize auth
    auth.init();
    
    // Load cart
    loadCart();
    updateCart();
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            if (auth.login(username, password)) {
                showNotification('✅ Đăng nhập thành công!', 'success');
                loginForm.reset();
                const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                modal.hide();
                updateAuthUI();
            } else {
                showNotification('❌ Tên đăng nhập hoặc mật khẩu không đúng!', 'error');
            }
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            
            if (auth.register(username, email, password)) {
                showNotification('✅ Đăng ký thành công! Vui lòng đăng nhập.', 'success');
                registerForm.reset();
                const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
                modal.hide();
            } else {
                showNotification('❌ Tên đăng nhập đã tồn tại!', 'error');
            }
        });
    }
    
    // Update auth UI
    updateAuthUI();
});

/**
 * Update authentication UI
 */
function updateAuthUI() {
    const authDropdown = document.getElementById('authDropdown');
    if (authDropdown) {
        if (auth.isLoggedIn()) {
            authDropdown.innerHTML = `<i class="bi bi-person-circle"></i> ${auth.currentUser}`;
            
            // Add logout option
            const dropdownMenu = authDropdown.nextElementSibling;
            if (dropdownMenu) {
                const logoutItem = document.createElement('li');
                logoutItem.innerHTML = '<a class="dropdown-item" href="#" onclick="logout(event)">Đăng xuất</a>';
                
                // Remove old logout if exists
                const oldLogout = dropdownMenu.querySelector('[onclick*="logout"]')?.parentElement;
                if (oldLogout) oldLogout.remove();
                
                if (dropdownMenu.querySelector('hr')) {
                    dropdownMenu.insertBefore(logoutItem, dropdownMenu.querySelector('hr'));
                } else {
                    dropdownMenu.appendChild(logoutItem);
                }
            }
        } else {
            authDropdown.innerHTML = `<i class="bi bi-person-circle"></i> Tài khoản`;
        }
    }
}

/**
 * Logout function
 */
function logout(e) {
    e.preventDefault();
    if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
        auth.logout();
        showNotification('✓ Đã đăng xuất', 'success');
        updateAuthUI();
    }
}

// Add animation styles
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
