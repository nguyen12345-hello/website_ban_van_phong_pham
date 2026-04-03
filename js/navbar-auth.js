/* ============================================
   NAVBAR AUTHENTICATION INTEGRATION
   ============================================ */

function initNavbarAuth() {
    // Get current user from auth manager
    const currentUser = auth ? auth.currentUser : null;
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    // Find or create nav-right container
    let navRight = navbar.querySelector('.nav-right');
    if (!navRight) {
        navRight = document.createElement('div');
        navRight.className = 'nav-right';
        navbar.appendChild(navRight);
    }
    
    // Get cart count element
    const cartCountEl = navRight.querySelector('#cartCount');
    
    // Update cart count
    updateCartCount();
    
    // Remove old auth elements
    const oldAuthContainer = navRight.querySelector('.auth-container');
    if (oldAuthContainer) {
        oldAuthContainer.remove();
    }
    
    // Create auth container
    const authContainer = document.createElement('div');
    authContainer.className = 'navbar-auth';
    authContainer.style.marginLeft = 'auto';
    authContainer.style.display = 'flex';
    authContainer.style.alignItems = 'center';
    authContainer.style.gap = '1rem';
    
    if (currentUser) {
        // User is logged in - show user menu
        authContainer.innerHTML = `
            <div class="user-menu" style="position: relative;">
                <button class="btn-user" onclick="toggleUserMenu(event)" 
                    style="background: none; border: none; cursor: pointer; font-weight: 600; color: var(--primary-color);">
                    👤 ${currentUser.name}
                </button>
                <div class="dropdown-menu" id="userDropdown" 
                    style="display: none; position: absolute; top: 100%; right: 0; background: white; 
                    border: 1px solid var(--border-color); border-radius: var(--radius); 
                    min-width: 200px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 1000;">
                    <a href="account.html" style="display: block; padding: 12px 16px; text-decoration: none; 
                        color: var(--text-color); border-bottom: 1px solid var(--border-color);">
                        📊 Tài Khoản
                    </a>
                    <a href="account.html?tab=orders" style="display: block; padding: 12px 16px; text-decoration: none; 
                        color: var(--text-color); border-bottom: 1px solid var(--border-color);">
                        📦 Đơn Hàng Của Tôi
                    </a>
                    <a href="account.html?tab=wishlist" style="display: block; padding: 12px 16px; text-decoration: none; 
                        color: var(--text-color); border-bottom: 1px solid var(--border-color);">
                        ❤️ Yêu Thích
                    </a>
                    <button onclick="logoutUser()" style="width: 100%; padding: 12px 16px; background: none; border: none; 
                        text-align: left; cursor: pointer; color: var(--danger-color); font-weight: 600;">
                        🚪 Đăng Xuất
                    </button>
                </div>
            </div>
        `;
    } else {
        // User is not logged in - show login button
        authContainer.innerHTML = `
            <a href="../home.html" style="padding: 0.5rem 1rem; text-decoration: none; background: #D4AF37; color: #2C3E50; border-radius: 4px; font-weight: 600; border: none; cursor: pointer; display: inline-block; transition: all 0.3s ease;" onmouseover="this.style.background='#C9A227'" onmouseout="this.style.background='#D4AF37'">
                Đăng Nhập
            </a>
        `;
    }
    
    // Remove cart icon if it exists in navRight, we'll re-add it
    const oldCartIcon = navRight.querySelector('.cart-icon');
    if (oldCartIcon) {
        oldCartIcon.remove();
    }
    
    // Re-add cart icon before auth container
    const cartIcon = document.createElement('a');
    cartIcon.href = 'products-premium.html';
    cartIcon.className = 'cart-icon';
    cartIcon.innerHTML = `
        <span>🛒</span>
        <span class="cart-count" id="cartCount">0</span>
    `;
    
    navRight.appendChild(cartIcon);
    navRight.appendChild(authContainer);
    
    // Update cart count
    updateCartCount();
    
    // Add event listener to close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('userDropdown');
        const userMenu = document.querySelector('.user-menu');
        
        if (!userMenu || !userMenu.contains(event.target)) {
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        }
    });
}

function toggleUserMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

function logoutUser() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        showNotification('Đã đăng xuất thành công', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

function updateCartCount() {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update all cart count displays
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => {
        el.textContent = cartCount;
        el.style.display = cartCount > 0 ? 'flex' : 'none';
    });
}

// Add page protection for authenticated pages
function requireAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showNotification('Vui lòng đăng nhập để tiếp tục', 'warning');
        setTimeout(() => {
            window.location.href = '../html/home.html';
        }, 1000);
        return false;
    }
    return true;
}

// Initialize navbar auth on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all scripts are loaded
    setTimeout(() => {
        initNavbarAuth();
    }, 100);
});

// Listen for storage changes (for multi-tab sync)
window.addEventListener('storage', function(event) {
    if (event.key === 'currentUser' || event.key === 'cart') {
        initNavbarAuth();
    }
});
