// ============================================
// INITIALIZATION - Load all systems
// Khởi tạo toàn bộ hệ thống
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Init.js: DOMContentLoaded triggered');
    
    // Initialize cart (from cart-global.js)
    if (typeof cart !== 'undefined' && cart.load) {
        console.log('📦 Init.js: Loading cart from localStorage');
        cart.load();
        console.log('📦 Init.js: Cart items loaded:', cart.items.length, 'items');
    } else {
        console.error('❌ Init.js: cart or cart.load not found!');
    }
    
    // Update cart count
    if (typeof updateCartCount === 'function') {
        console.log('🔢 Init.js: Updating cart count');
        updateCartCount();
    } else {
        console.warn('⚠️ Init.js: updateCartCount not found');
    }
    
    // Display cart items if on cart.html
    if (typeof displayCartItems === 'function') {
        console.log('📝 Init.js: Displaying cart items');
        displayCartItems();
    } else {
        console.warn('⚠️ Init.js: displayCartItems not found');
    }
    
    console.log('✅ Init.js: Initialization complete');
    console.log('📊 Current cart:', cart.items);
});
