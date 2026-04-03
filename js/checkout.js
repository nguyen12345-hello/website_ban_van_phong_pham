// ============================================
// CHECKOUT PAGE JAVASCRIPT
// ============================================

let currentPaymentMethod = 'cod';

// Initialize Checkout Page
document.addEventListener('DOMContentLoaded', function() {
    if (!auth.isLoggedIn()) {
        showNotification('Vui lòng đăng nhập để tiếp tục', 'error');
        setTimeout(() => {
            window.location.href = '../html/home.html';
        }, 1500);
        return;
    }

    if (cart.items.length === 0) {
        showNotification('Giỏ hàng trống', 'error');
        setTimeout(() => {
            window.location.href = 'products.html';
        }, 1500);
        return;
    }

    loadCheckoutData();
    updateCheckoutSummary();
});

// Load Checkout Data
function loadCheckoutData() {
    const user = auth.currentUser;

    // Fill user info
    document.getElementById('shippingName').value = user.name;
    document.getElementById('shippingEmail').value = user.email;
    document.getElementById('shippingPhone').value = user.phone || '';
    document.getElementById('shippingAddress').value = user.address || '';

    // Load checkout items
    loadCheckoutItems();
}

// Load Checkout Items
function loadCheckoutItems() {
    const container = document.getElementById('checkoutItems');
    
    container.innerHTML = cart.items.map(item => `
        <div class="checkout-item">
            <div class="item-image">
                <img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name}">
            </div>
            <div class="item-info">
                <p><strong>${item.name}</strong></p>
                <p>x${item.quantity}</p>
            </div>
            <div class="item-price">
                ${formatPriceSimple(item.price * item.quantity)}
            </div>
        </div>
    `).join('');
}

// Update Checkout Summary
function updateCheckoutSummary() {
    const subtotal = cart.getTotal();
    const shipping = subtotal >= 1000000 ? 0 : 50000;
    const discount = 0; // Can be applied with promo code
    const total = subtotal + shipping - discount;

    document.getElementById('summarySubtotal').textContent = formatPriceSimple(subtotal);
    document.getElementById('summaryShipping').textContent = formatPriceSimple(shipping);
    document.getElementById('summaryDiscount').textContent = formatPriceSimple(discount);
    document.getElementById('summaryTotal').textContent = formatPriceSimple(total);

    // Update confirmation summary
    const confirmationHTML = `
        <div class="summary-items">
            ${cart.items.map(item => `
                <div class="summary-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>${formatPriceSimple(item.price * item.quantity)}</span>
                </div>
            `).join('')}
        </div>
        <div class="summary-totals">
            <div class="total-row">
                <span>Tạm Tính:</span>
                <span>${formatPriceSimple(subtotal)}</span>
            </div>
            <div class="total-row">
                <span>Vận Chuyển:</span>
                <span>${formatPriceSimple(shipping)}</span>
            </div>
            <div class="total-row highlight">
                <span>Tổng Cộng:</span>
                <span>${formatPriceSimple(total)}</span>
            </div>
        </div>
    `;
    document.getElementById('confirmationSummary').innerHTML = confirmationHTML;
}

// Update Districts
function updateDistricts() {
    const province = document.getElementById('shippingProvince').value;
    const districtSelect = document.getElementById('shippingDistrict');

    const districts = {
        'hcm': ['Quận 1', 'Quận 2', 'Quận 3', 'Bình Thạnh', 'Gò Vấp'],
        'hanoi': ['Ba Đình', 'Hoàn Kiếm', 'Tây Hồ', 'Cầu Giấy', 'Đống Đa'],
        'danang': ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn'],
        'other': ['Khác']
    };

    const options = districts[province] || [];
    districtSelect.innerHTML = options.map(d => `<option value="${d}">${d}</option>`).join('');
}

// Update Payment Method
function updatePaymentMethod() {
    currentPaymentMethod = document.querySelector('input[name="payment"]:checked').value;
}

// Apply Promo Code
function applyPromoCode() {
    const code = document.getElementById('promoCode').value;
    const input = document.getElementById('promoCode');
    
    if (!code) {
        showNotification('Vui lòng nhập mã khuyến mãi', 'warning');
        input.classList.remove('error');
        return;
    }

    // Promo code validation (demo)
    const promoCodes = {
        'SAVE10': 0.1,      // 10% discount
        'SAVE5': 0.05,      // 5% discount
        'WELCOME': 0.15     // 15% discount
    };

    if (promoCodes[code]) {
        const discount = cart.getTotal() * promoCodes[code];
        document.getElementById('summaryDiscount').textContent = formatPriceSimple(discount);
        showNotification(`Áp dụng thành công! Giảm ${formatPriceSimple(discount)}`, 'success');
        input.classList.remove('error');
        updateCheckoutSummary();
    } else {
        showNotification('Mã khuyến mãi không hợp lệ', 'error');
        input.classList.add('error');
    }
}

// Complete Checkout
function completeCheckout() {
    // Validate form
    const name = document.getElementById('shippingName').value;
    const email = document.getElementById('shippingEmail').value;
    const phone = document.getElementById('shippingPhone').value;
    const province = document.getElementById('shippingProvince').value;
    const district = document.getElementById('shippingDistrict').value;
    const address = document.getElementById('shippingAddress').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    if (!name || !email || !phone || !province || !district || !address) {
        showNotification('Vui lòng điền đầy đủ thông tin giao hàng', 'error');
        return;
    }

    if (!agreeTerms) {
        showNotification('Vui lòng đồng ý với điều khoản dịch vụ', 'error');
        return;
    }

    if (!Validator.isValidEmail(email)) {
        showNotification('Email không hợp lệ', 'error');
        return;
    }

    if (!Validator.isValidPhone(phone)) {
        showNotification('Số điện thoại không hợp lệ', 'error');
        return;
    }

    // Create order
    const shippingInfo = {
        name: name,
        email: email,
        phone: phone,
        province: province,
        district: district,
        address: address,
        note: document.getElementById('orderNote').value
    };

    const totalPrice = cart.getTotal() + (cart.getTotal() >= 1000000 ? 0 : 50000);
    
    const result = orderManager.createOrder(
        cart.items,
        totalPrice,
        shippingInfo,
        currentPaymentMethod
    );

    if (result.success) {
        showNotification('Đơn hàng đã được tạo thành công!', 'success');
        
        // Clear cart
        cart.clear();

        // Redirect to order detail or success page
        setTimeout(() => {
            window.location.href = `account.html?tab=orders&highlight=${result.order.id}`;
        }, 2000);
    } else {
        showNotification(result.message, 'error');
    }
}

// For payment method selection
document.addEventListener('DOMContentLoaded', function() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', updatePaymentMethod);
    });
});
