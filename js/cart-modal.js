// ============================================
// CART MODAL MANAGEMENT
// Quản lý modal giỏ hàng hiển thị trực tiếp trên trang
// ============================================

/**
 * Cập nhật giao diện modal giỏ hàng
 */
function updateCartModalDisplay() {
    const cartItemsBody = document.getElementById('cartItemsBody');
    const cartCountModal = document.getElementById('cartCountModal');
    const cartTotalModal = document.getElementById('cartTotalModal');
    
    if (!cartItemsBody) return;
    
    // Cập nhật số lượng
    if (cartCountModal) {
        cartCountModal.textContent = cart.getItemCount ? cart.getItemCount() : cart.items.length;
    }
    
    // Nếu giỏ trống
    if (cart.items.length === 0) {
        cartItemsBody.innerHTML = `
            <div class="text-center py-5">
                <p style="font-size: 3rem; margin-bottom: 1rem;">🛒</p>
                <p class="text-muted fs-5">Giỏ hàng trống. Hãy thêm sản phẩm!</p>
                <a href="#products" class="btn btn-primary mt-3" data-bs-dismiss="modal">Khám phá sản phẩm</a>
            </div>
        `;
        if (cartTotalModal) cartTotalModal.textContent = '0 VNĐ';
        return;
    }
    
    // Render từng item trong giỏ
    cartItemsBody.innerHTML = `
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-light" style="background: #f5f5f5;">
                    <tr>
                        <th>Sản Phẩm</th>
                        <th>Giá</th>
                        <th>Số Lượng</th>
                        <th>Thành Tiền</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.items.map(item => `
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <div style="
                                        width: 60px; 
                                        height: 60px; 
                                        border-radius: 8px; 
                                        background: #f5f5f5; 
                                        display: flex; 
                                        align-items: center; 
                                        justify-content: center;
                                        font-size: 28px;
                                        flex-shrink: 0;
                                    ">
                                        <img src="${item.image || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E'}" 
                                             alt="${item.name}" 
                                             style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"
                                             onerror="this.parentElement.textContent='${item.icon || '📦'}'" />
                                    </div>
                                    <div>
                                        <strong style="display: block; margin-bottom: 4px;">
                                            ${item.name}
                                        </strong>
                                        <small style="color: #999;">${item.category ? (item.category === 'paper' ? 'Giấy & Tập' : item.category === 'pen' ? 'Bút & Chì' : item.category === 'tools' ? 'Dụng Cụ' : 'Khác') : 'N/A'}</small>
                                    </div>
                                </div>
                            </td>
                            <td style="font-weight: 600;">
                                ${window.formatPriceSimple ? window.formatPriceSimple(item.price) : item.price.toLocaleString() + 'đ'}
                            </td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 5px; justify-content: center;">
                                    <button onclick="cart.updateQuantity(${item.id}, ${Math.max(1, item.quantity - 1)}); updateCartModalDisplay(); updateCartCount();" 
                                            style="padding: 5px 10px; cursor: pointer; border: 1px solid #ddd; background: #f9f9f9; border-radius: 4px; font-weight: bold;">
                                        −
                                    </button>
                                    <span style="min-width: 30px; text-align: center; font-weight: 600;">
                                        ${item.quantity}
                                    </span>
                                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1}); updateCartModalDisplay(); updateCartCount();" 
                                            style="padding: 5px 10px; cursor: pointer; border: 1px solid #ddd; background: #f9f9f9; border-radius: 4px; font-weight: bold;">
                                        +
                                    </button>
                                </div>
                            </td>
                            <td style="font-weight: 600; color: #D4AF37;">
                                ${window.formatPriceSimple ? window.formatPriceSimple(item.price * item.quantity) : (item.price * item.quantity).toLocaleString() + 'đ'}
                            </td>
                            <td style="text-align: center;">
                                <button onclick="cart.removeItem(${item.id}); updateCartModalDisplay(); updateCartCount();" 
                                        style="
                                            color: #e74c3c; 
                                            background: none; 
                                            border: none; 
                                            cursor: pointer; 
                                            font-size: 1.2rem;
                                            padding: 5px 10px;
                                            border-radius: 4px;
                                            transition: all 0.3s ease;
                                        "
                                        onmouseover="this.style.background='#ffe0e0';" 
                                        onmouseout="this.style.background='none';"
                                        title="Xóa sản phẩm">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Cập nhật tổng tiền
    if (cartTotalModal) {
        const total = cart.getTotal ? cart.getTotal() : cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalModal.textContent = window.formatPriceSimple ? window.formatPriceSimple(total) : total.toLocaleString() + 'đ';
    }
}

/**
 * Lắng nghe sự kiện khi modal được mở
 */
function setupCartModalListeners() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', function() {
            updateCartModalDisplay();
        });
    }
}

/**
 * Khởi tạo modal giỏ hàng
 */
document.addEventListener('DOMContentLoaded', function() {
    setupCartModalListeners();
});
