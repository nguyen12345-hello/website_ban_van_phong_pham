// Global Cart Manager
let cart = {
    items: [],
    
    addItem(productId) {
        const product = productsDatabase.find(p => p.id === productId);
        if (!product) return false;
        
        const existing = this.items.find(item => item.id === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || product.thumbnail || product.icon,
                quantity: 1,
                category: product.category,
                icon: product.icon
            });
            console.log('Added to cart:', {
                name: product.name,
                image: product.image,
                thumbnail: product.thumbnail
            });
        }
        this.save();
        updateCartCount();
        return true;
    },
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        updateCartCount();
    },
    
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.save();
            updateCartCount();
        }
    },
    
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    clear() {
        this.items = [];
        this.save();
        updateCartCount();
    },
    
    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },
    
    load() {
        const saved = localStorage.getItem('cart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
        updateCartCount();
    }
};

// Update cart count display globally\nfunction updateCartCount() {\n    const counts = document.querySelectorAll('.cart-count');\n    const total = cart.getItemCount() || 0;\n    counts.forEach(count => {\n        count.textContent = total > 99 ? '99+' : total;\n    });\n}\n\n// NEW: Cart display functions for cart.html\nwindow.displayCartItems = function() {\n    const cartItemsContainer = document.getElementById('cartItems');\n    const emptyCart = document.getElementById('emptyCart');\n    const cartContent = document.getElementById('cartContent');\n\n    if (!cartItemsContainer) return;\n\n    if (cart.items.length === 0) {\n        if (emptyCart) emptyCart.style.display = 'block';\n        if (cartContent) cartContent.style.display = 'none';\n        return;\n    }\n\n    if (emptyCart) emptyCart.style.display = 'none';\n    if (cartContent) cartContent.style.display = 'block';\n\n    cartItemsContainer.innerHTML = cart.items.map(item => `\n        <tr>\n            <td>\n                <div style="display: flex; align-items: center; gap: 10px;">\n                    <img src="${item.image || item.icon || '../images/product-placeholder.jpg'}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;" onerror="this.parentElement.innerHTML='${item.icon || '📦'}'; this.style.display='none';" />\n                    <div>\n                        <strong>${item.name}</strong><br>\n                        <small style="color: #999;">${item.category || 'N/A'}</small>\n                    </div>\n                </div>\n            </td>\n            <td>${window.formatPriceSimple ? window.formatPriceSimple(item.price) : item.price.toLocaleString() + 'đ'}</td>\n            <td>\n                <div style="display: flex; align-items: center; gap: 5px;">\n                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1 > 0 ? item.quantity - 1 : 1}); displayCartItems(); updateCartSummary();" style="padding: 5px 10px; cursor: pointer; border: 1px solid #ddd; background: #f9f9f9;">−</button>\n                    <span style="min-width: 30px; text-align: center;">${item.quantity}</span>\n                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1}); displayCartItems(); updateCartSummary();" style="padding: 5px 10px; cursor: pointer; border: 1px solid #ddd; background: #f9f9f9;">+</button>\n                </div>\n            </td>\n            <td>${window.formatPriceSimple ? window.formatPriceSimple(item.price * item.quantity) : (item.price * item.quantity).toLocaleString() + 'đ'}</td>\n            <td>\n                <button onclick="cart.removeItem(${item.id}); displayCartItems(); updateCartSummary(); updateCartCount();" style="color: #e74c3c; background: none; border: none; cursor: pointer; font-size: 1.2rem;">🗑️</button>\n            </td>\n        </tr>\n    `).join('');\n\n    updateCartSummary();\n};\n\nwindow.updateCartSummary = function() {\n    const subtotalEl = document.getElementById('subtotal');\n    const shippingEl = document.getElementById('shipping');\n    const totalEl = document.getElementById('total');\n\n    const subtotal = cart.getTotal();\n    const shipping = subtotal > 1000000 ? 0 : 30000;\n    const total = subtotal + shipping;\n\n    if (subtotalEl) subtotalEl.textContent = window.formatPriceSimple ? window.formatPriceSimple(subtotal) : subtotal.toLocaleString() + 'đ';\n    if (shippingEl) shippingEl.textContent = window.formatPriceSimple ? window.formatPriceSimple(shipping) : shipping.toLocaleString() + 'đ';\n    if (totalEl) totalEl.textContent = window.formatPriceSimple ? window.formatPriceSimple(total) : total.toLocaleString() + 'đ';\n};\n\n// Auto-init on cart.html\nif (document.getElementById('cartItems')) {\n    document.addEventListener('DOMContentLoaded', () => {\n        setTimeout(() => {\n            cart.load();\n            displayCartItems();\n            updateCartCount();\n        }, 200);\n    });\n}

// Init on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', cart.load);
}

// Export for global use
window.cart = cart;
window.updateCartCount = updateCartCount;
window.displayCartItems = displayCartItems;
window.updateCartSummary = updateCartSummary;
