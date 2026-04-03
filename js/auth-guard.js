// ============================================
// AUTH GUARD - Protect features behind login
// Bảo vệ các tính năng phía sau login
// ============================================

class AuthGuard {
    constructor() {
        this.requiredAuthFeatures = [
            'addToCart',
            'viewWishlist',
            'checkout',
            'viewOrders',
            'viewAccountPage'
        ];
    }

    /**
     * Kiểm tra xem người dùng đã đăng nhập
     * Nếu chưa, hiện dialog yêu cầu đăng nhập
     * @param {string} feature - Tính năng muốn sử dụng
     * @returns {boolean} - true nếu đã đăng nhập, false nếu chưa
     */
    checkAuth(feature = 'addToCart') {
        if (!auth || !auth.currentUser) {
            this.showLoginRequired(feature);
            return false;
        }
        return true;
    }

    /**
     * Hiện dialog yêu cầu đăng nhập
     * @param {string} feature - Tính năng muốn sử dụng
     */
    showLoginRequired(feature) {
        const message = this.getFeatureMessage(feature);
        
        const shouldLogin = confirm(
            `${message}\n\n` +
            `Bạn cần đăng nhập để tiếp tục.\n\n` +
            `Nhấn OK để đi đến trang đăng nhập.`
        );

        if (shouldLogin) {
            // Redirect to auth page
            const authUrl = this.getAuthPageUrl();
            window.location.href = authUrl;
        }
    }

    /**
     * Lấy thông báo tương ứng với từng tính năng
     * @param {string} feature - Tính năng
     * @returns {string} - Thông báo
     */
    getFeatureMessage(feature) {
        const messages = {
            'addToCart': '🛒 Thêm vào giỏ hàng',
            'viewWishlist': '❤️ Xem danh sách yêu thích',
            'checkout': '💳 Thanh toán',
            'viewOrders': '📦 Xem đơn hàng của bạn',
            'viewAccountPage': '👤 Truy cập trang tài khoản'
        };

        return messages[feature] || '🔐 Tính năng này';
    }

    /**
     * Lấy URL trang auth (tương ứng với trang hiện tại)
     * @returns {string} - URL trang auth
     */
    getAuthPageUrl() {
        const currentPath = window.location.pathname;
        
        // If in html/ folder, just go to auth.html
        if (currentPath.includes('/html/')) {
            return './auth.html';
        }
        
        // If in root, go to html/auth.html
        return './html/auth.html';
    }

    /**
     * Kiểm tra xem người dùng có thể mua hàng
     * Yêu cầu: đã đăng nhập + có địa chỉ giao hàng
     * @returns {boolean}
     */
    canPurchase() {
        if (!this.checkAuth('checkout')) {
            return false;
        }

        if (!auth.currentUser.address) {
            alert('⚠️ Vui lòng cập nhật địa chỉ giao hàng trước khi mua hàng.\n\nĐi đến Tài Khoản > Cập nhật hồ sơ');
            window.location.href = this.getAuthPageUrl().replace('auth.html', 'account-page.html');
            return false;
        }

        return true;
    }

    /**
     * Check permission with custom callback
     * @param {string} feature - Feature name
     * @param {function} callback - Callback nếu user đã đăng nhập
     */
    checkAuthWithCallback(feature, callback) {
        if (this.checkAuth(feature)) {
            if (typeof callback === 'function') {
                callback(auth.currentUser);
            }
            return true;
        }
        return false;
    }

    /**
     * Hiện thông báo user cần đăng nhập với UI tốt hơn
     */
    showLoginModal() {
        // Tạo modal HTML
        const modalHTML = `
            <div class="auth-guard-modal" id="authGuardModal">
                <div class="auth-guard-overlay"></div>
                <div class="auth-guard-content">
                    <button class="auth-guard-close" onclick="document.getElementById('authGuardModal').remove()">✕</button>
                    <h2>🔐 Yêu Cầu Đăng Nhập</h2>
                    <p>Bạn cần đăng nhập để sử dụng tính năng này</p>
                    <div class="auth-guard-buttons">
                        <a href="${this.getAuthPageUrl()}" class="auth-guard-btn auth-guard-btn-primary">Đăng Nhập / Đăng Ký</a>
                        <button class="auth-guard-btn auth-guard-btn-secondary" onclick="document.getElementById('authGuardModal').remove()">Đóng</button>
                    </div>
                </div>
            </div>
        `;

        // Thêm CSS nếu chưa có
        this.injectStyles();

        // Thêm modal vào body
        const div = document.createElement('div');
        div.innerHTML = modalHTML;
        document.body.appendChild(div.firstElementChild);
    }

    /**
     * Inject CSS cho modal
     */
    injectStyles() {
        if (document.getElementById('authGuardStyles')) {
            return; // CSS đã được thêm
        }

        const style = document.createElement('style');
        style.id = 'authGuardStyles';
        style.textContent = `
            .auth-guard-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .auth-guard-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
            }

            .auth-guard-content {
                position: relative;
                background: white;
                border-radius: 12px;
                padding: 2rem;
                max-width: 400px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                text-align: center;
            }

            .auth-guard-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
                transition: color 0.3s;
            }

            .auth-guard-close:hover {
                color: #333;
            }

            .auth-guard-content h2 {
                color: #2C3E50;
                margin-bottom: 1rem;
            }

            .auth-guard-content p {
                color: #666;
                margin-bottom: 2rem;
                line-height: 1.6;
            }

            .auth-guard-buttons {
                display: flex;
                gap: 1rem;
                flex-direction: column;
            }

            .auth-guard-btn {
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                cursor: pointer;
                border: none;
                transition: all 0.3s;
                font-size: 1rem;
            }

            .auth-guard-btn-primary {
                background: linear-gradient(135deg, #D4AF37, #F0E68C);
                color: #2C3E50;
            }

            .auth-guard-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
            }

            .auth-guard-btn-secondary {
                background: #e9ecef;
                color: #495057;
            }

            .auth-guard-btn-secondary:hover {
                background: #dee2e6;
            }

            @media (max-width: 768px) {
                .auth-guard-content {
                    margin: 1rem;
                    padding: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize global auth guard
const authGuard = new AuthGuard();

// Helper function để sử dụng trong inline handlers
function requireAuth(feature = 'addToCart') {
    return authGuard.checkAuth(feature);
}

function requireAuthCallback(feature, callback) {
    return authGuard.checkAuthWithCallback(feature, callback);
}
