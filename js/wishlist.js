// ============================================
// WISHLIST & FAVORITES MANAGEMENT
// Quản lý danh sách yêu thích
// ============================================

class WishlistManager {
    constructor() {
        this.items = this.loadWishlist();
    }

    loadWishlist() {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
    }

    addItem(product) {
        // Kiểm tra sản phẩm đã có trong wishlist
        if (this.items.find(item => item.id === product.id)) {
            return { success: false, message: 'Sản phẩm đã có trong danh sách yêu thích' };
        }

        this.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            addedAt: new Date()
        });

        this.saveWishlist();
        return { success: true, message: 'Thêm vào danh sách yêu thích' };
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveWishlist();
    }

    isInWishlist(productId) {
        return this.items.some(item => item.id === productId);
    }

    getCount() {
        return this.items.length;
    }

    clear() {
        this.items = [];
        this.saveWishlist();
    }
}

// Initialize Wishlist
const wishlist = new WishlistManager();

// Hàm toggle wishlist
function toggleWishlist(productId) {
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return;

    if (wishlist.isInWishlist(productId)) {
        wishlist.removeItem(productId);
        showNotification('Đã xóa khỏi danh sách yêu thích', 'info');
    } else {
        wishlist.addItem(product);
        showNotification('Đã thêm vào danh sách yêu thích ❤️', 'success');
    }

    updateWishlistUI();
}

// Cập nhật UI wishlist
function updateWishlistUI() {
    // Cập nhật wishlist icon
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.getCount();
    }

    // Cập nhật trạng thái các nút wishlist
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        if (wishlist.isInWishlist(productId)) {
            btn.classList.add('active');
            btn.innerHTML = '❤️';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '🤍';
        }
    });
    
    // Cập nhật wishlist modal
    updateWishlistModal();
}

// Cập nhật wishlist modal display
function updateWishlistModal() {
    const wishlistCountModal = document.querySelector('#wishlistCountModal');
    const wishlistItemsBody = document.querySelector('#wishlistItemsBody');
    
    if (wishlistCountModal) {
        wishlistCountModal.textContent = wishlist.getCount();
    }
    
    if (wishlistItemsBody) {
        if (wishlist.items.length === 0) {
            wishlistItemsBody.innerHTML = `
                <div class="text-center py-5">
                    <p style="font-size: 3rem; margin-bottom: 1rem;">❤️</p>
                    <p class="text-muted fs-5">Danh sách yêu thích trống. Hãy thêm sản phẩm!</p>
                </div>
            `;
        } else {
            let html = '<div class="wishlist-items-list">';
            wishlist.items.forEach(item => {
                html += `
                    <div class="wishlist-item d-flex align-items-center justify-content-between mb-3 p-3" style="border: 1px solid #e0e0e0; border-radius: 8px;">
                        <div class="d-flex align-items-center" style="flex: 1;">
                            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px; margin-right: 15px;">
                            <div>
                                <p class="mb-1 fw-bold" style="color: #2C3E50;">${item.name}</p>
                                <p class="mb-0" style="color: #D4AF37; font-weight: bold;">₫${item.price.toLocaleString('vi-VN')}</p>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlistModal(${item.id})">
                            ✕
                        </button>
                    </div>
                `;
            });
            html += '</div>';
            wishlistItemsBody.innerHTML = html;
        }
    }
}

// Xóa sản phẩm từ wishlist modal
function removeFromWishlistModal(productId) {
    wishlist.removeItem(productId);
    updateWishlistModal();
    updateWishlistUI();
    showNotification('Đã xóa khỏi danh sách yêu thích', 'info');
}

// Hàm updateWishlist gọi từ modal
function updateWishlist() {
    updateWishlistModal();
    updateWishlistUI();
}

document.addEventListener('DOMContentLoaded', function() {
    updateWishlistUI();
    updateWishlistModal();
});
