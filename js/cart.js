// ============================================
// SHOPPING CART PAGE JAVASCRIPT
// ============================================




// Initialize Cart Page
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập trước khi cho phép truy cập giỏ hàng
    if (!auth || !auth.isLoggedIn()) {
        showNotification('Vui lòng đăng nhập để xem giỏ hàng', 'error');
        setTimeout(() => {
            window.location.href = '../html/home.html';
        }, 2000);
        return;
    }

    displayCartItems();
    setupCartEventListeners();
});

// Display Cart Items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (!cart || cart.items.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = 'grid';

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = cart.items.map((item, index) => {
        const imageUrl = item.image || item.icon || '../images/auth-stationery.jpg';
        return `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${imageUrl}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid #ddd;" />
                    <div>
                        <strong>${item.name}</strong><br>
                        <small style="color: #999;">${getCategoryName(item.category)}</small>
                    </div>
                </div>
            </td>
            <td>${formatPriceSimple(item.price)}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <button onclick="decreaseQuantity(${item.id})" style="padding: 5px 10px; cursor: pointer; border: 1px solid #ddd; background: #f9f9f9; border-radius: 4px;">−</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" style="width: 60px; text-align: center; padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    <button onclick="increaseQuantity(${item.id})" style="padding: 5px 10px; cursor: pointer; border: 1px solid #ddd; background: #f9f9f9; border-radius: 4px;">+</button>
                </div>
            </td>
            <td>${formatPriceSimple(item.price * item.quantity)}</td>
            <td>
                <button onclick="removeFromCart(${item.id})" style="color: #e74c3c; background: none; border: none; cursor: pointer; font-size: 1.2rem;">🗑️</button>
            </td>
        </tr>
    `;
    }).join('');

    updateCartSummary();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.getTotal();
    const shipping = subtotal >= 1000000 ? 0 : 50000;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = formatPriceSimple(subtotal);
    if (shippingEl) shippingEl.textContent = formatPriceSimple(shipping);
    if (totalEl) totalEl.textContent = formatPriceSimple(total);
}

// Update Quantity
function updateQuantity(productId, quantity) {
    const qty = parseInt(quantity);
    if (qty > 0) {
        cart.updateQuantity(productId, qty);
        displayCartItems();
    }
}

// Increase Quantity
function increaseQuantity(productId) {
    const item = cart.items.find(i => i.id === productId);
    if (item) {
        updateQuantity(productId, item.quantity + 1);
    }
}

// Decrease Quantity
function decreaseQuantity(productId) {
    const item = cart.items.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
    }
}

// Remove from Cart
function removeFromCart(productId) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        cart.removeItem(productId);
        displayCartItems();
        
        // Show notification
        showNotification('Sản phẩm đã được xóa khỏi giỏ hàng');
    }
}

// Setup Event Listeners
function setupCartEventListeners() {
    // Update price display when quantity changes
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            displayCartItems();
        });
    });
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    let bgColor = '#3498db';
    if (type === 'success') bgColor = '#27ae60';
    if (type === 'error') bgColor = '#e74c3c';
    if (type === 'warning') bgColor = '#f39c12';

    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Continue Shopping Button
function continueShopping() {
    window.location.href = 'products.html';
}

// Checkout Button
function checkout() {
    if (cart.items.length === 0) {
        alert('Giỏ hàng của bạn trống!');
        return;
    }
    
    alert('Chức năng thanh toán đang được phát triển.\nTổng tiền: ' + formatPriceSimple(cart.getTotal() + 50000));
}

// Clear Cart
function clearCart() {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
        cart.clear();
        displayCartItems();
        showNotification('Giỏ hàng đã được xóa');
    }
}

// Format currency with animation
function animatePrice(element, newPrice) {
    if (!element) return;
    
    const oldPrice = parseFloat(element.textContent);
    const diff = (newPrice - oldPrice) / 10;
    let current = oldPrice;
    
    const interval = setInterval(() => {
        current += diff;
        element.textContent = formatPriceSimple(current);
        
        if ((diff > 0 && current >= newPrice) || (diff < 0 && current <= newPrice)) {
            element.textContent = formatPriceSimple(newPrice);
            clearInterval(interval);
        }
    }, 20);
}
