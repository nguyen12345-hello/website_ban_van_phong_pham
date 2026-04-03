// ============================================
// ACCOUNT PAGE JAVASCRIPT
// ============================================

// Initialize Account Page
document.addEventListener('DOMContentLoaded', function() {
    if (!auth.isLoggedIn()) {
        window.location.href = 'auth.html';
        return;
    }

    loadUserInfo();
    updateDashboard();
});

// Load User Information
function loadUserInfo() {
    const user = auth.currentUser;
    if (!user) return;

    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;

    // Update profile form
    document.getElementById('profileName').value = user.name;
    document.getElementById('profileEmail').value = user.email;
    document.getElementById('profilePhone').value = user.phone || '';
    document.getElementById('profileAddress').value = user.address || '';
}

// Update Dashboard
function updateDashboard() {
    const orders = orderManager.getUserOrders();
    const spent = orders.reduce((sum, o) => sum + o.totalPrice, 0);

    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalSpent').textContent = formatPriceSimple(spent);
    document.getElementById('totalPoints').textContent = Math.floor(spent / 1000) || 0; // 1 điểm = 1000đ
    document.getElementById('wishlistCount').textContent = wishlist.getCount();

    // Load recent orders
    loadRecentOrders();
}

// Load Recent Orders
function loadRecentOrders() {
    const orders = orderManager.getUserOrders().slice(-3).reverse();
    const container = document.getElementById('recentOrders');

    if (orders.length === 0) {
        container.innerHTML = '<p>Không có đơn hàng nào</p>';
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="recent-order-item">
            <div class="order-header">
                <p><strong>${order.id}</strong></p>
                <p>${formatPriceSimple(order.totalPrice)}</p>
            </div>
            <p>${Formatter.date(order.createdAt)}</p>
            ${getOrderStatusBadge(order.status)}
            <a href="#orders" onclick="switchTab('orders')" class="link-text">Xem chi tiết</a>
        </div>
    `).join('');
}

// Switch Tab
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected tab
    const tab = document.getElementById(tabName);
    if (tab) {
        tab.classList.add('active');
    }

    // Mark button as active
    event.target.classList.add('active');

    // Load tab-specific content
    if (tabName === 'orders') {
        loadOrders();
    } else if (tabName === 'wishlist') {
        loadWishlistPage();
    }
}

// Load Orders
function loadOrders() {
    const orders = orderManager.getUserOrders().reverse();
    const container = document.getElementById('ordersList');

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Chưa có đơn hàng nào</p>
                <a href="products.html" class="btn btn-primary">Bắt Đầu Mua Sắm</a>
            </div>
        `;
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-card-header">
                <div>
                    <p><strong>Đơn Hàng: ${order.id}</strong></p>
                    <p>${Formatter.dateTime(order.createdAt)}</p>
                </div>
                <div class="order-actions">
                    ${getOrderStatusBadge(order.status)}
                    <button onclick="viewOrderDetail('${order.id}')" class="btn btn-small">Chi Tiết</button>
                </div>
            </div>
            <div class="order-items">
                <p><strong>${order.items.length}</strong> sản phẩm</p>
                <ul>
                    ${order.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join('')}
                </ul>
            </div>
            <div class="order-card-footer">
                <p><strong>Tổng cộng:</strong> ${formatPriceSimple(order.totalPrice)}</p>
            </div>
        </div>
    `).join('');
}

// Load Wishlist
function loadWishlistPage() {
    const container = document.getElementById('wishlistList');

    if (wishlist.items.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Danh sách yêu thích trống</p>
                <a href="products.html" class="btn btn-primary">Khám Phá Sản Phẩm</a>
            </div>
        `;
        return;
    }

    container.innerHTML = wishlist.items.map(item => `
        <div class="product-card">
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-content">
                <h3>${item.name}</h3>
                <p>${formatPriceSimple(item.price)}</p>
                <div class="product-actions">
                    <a href="product-detail.html?id=${item.id}" class="btn btn-primary btn-small">Xem</a>
                    <button onclick="wishlist.removeItem(${item.id}); loadWishlistPage();" class="btn btn-secondary btn-small">Xóa</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle Profile Update
function handleProfileUpdate(e) {
    e.preventDefault();

    const name = document.getElementById('profileName').value;
    const phone = document.getElementById('profilePhone').value;
    const address = document.getElementById('profileAddress').value;

    // Validation
    if (!Validator.isValidName(name)) {
        showNotification('Tên phải có từ 2-100 ký tự', 'error');
        return;
    }

    if (phone && !Validator.isValidPhone(phone)) {
        showNotification('Số điện thoại không hợp lệ', 'error');
        return;
    }

    const result = auth.updateProfile(name, phone, address);
    if (result.success) {
        showNotification(result.message, 'success');
        loadUserInfo();
    } else {
        showNotification(result.message, 'error');
    }
}

// Handle Change Password
function handleChangePassword(e) {
    e.preventDefault();

    const oldPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const result = auth.changePassword(oldPassword, newPassword, confirmPassword);
    if (result.success) {
        showNotification(result.message, 'success');
        e.target.reset();
    } else {
        showNotification(result.message, 'error');
    }
}

// Handle Delete Account
function handleDeleteAccount() {
    if (!confirm('Bạn chắc chắn muốn xóa tài khoản? Thao tác này không thể hoàn tác!')) {
        return;
    }

    if (!confirm('Tất cả dữ liệu sẽ bị xóa. Bạn vẫn muốn tiếp tục?')) {
        return;
    }

    // Delete account
    auth.logout();
    showNotification('Tài khoản đã được xóa', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// View Order Detail
function viewOrderDetail(orderId) {
    const order = orderManager.getOrder(orderId);
    if (!order) return;

    alert(`
Đơn Hàng: ${order.id}
Ngày: ${Formatter.dateTime(order.createdAt)}
Trạng Thái: ${order.status}
Thanh Toán: ${order.paymentStatus}
Tổng Cộng: ${formatPriceSimple(order.totalPrice)}

Chi Tiết:
${order.items.map(item => `- ${item.name} x${item.quantity} = ${formatPriceSimple(item.price * item.quantity)}`).join('\n')}
    `);
}

// Show Add Address Form
function showAddAddressForm() {
    const address = prompt('Nhập địa chỉ giao hàng mới:');
    if (address) {
        // Save address (in a real app, this would be saved to the backend)
        showNotification('Địa chỉ đã được thêm', 'success');
    }
}
