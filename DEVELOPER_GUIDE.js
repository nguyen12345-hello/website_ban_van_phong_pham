/*
  ⚠️ REDIRECT NOTICE
  
  This file has been converted to MARKDOWN format for better documentation.
  
  📖 Please read: DEVELOPER_GUIDE.md
  
  The complete API documentation is now available in:
  → DEVELOPER_GUIDE.md
  
  This file (.js) contained documentation that looked like code but wasn't 
  meant to be executed. The markdown version (.md) provides the same content
  in a more appropriate format.
  
  ============ DOCUMENTATION CONTENTS ============
  
  • Products Database (products-data.js)
  • Authentication System (auth.js)
  • Shopping Cart (main.js)
  • Wishlist System (wishlist.js)
  • Order Management (order.js)
  • Utilities (utils.js)
  • Notifications
  • LocalStorage Keys
  • Common Queries
  • Data Flow
  • Testing Checklist
  • Browser Support
  
  👉 Open DEVELOPER_GUIDE.md in your editor for full documentation.
*/

/**
 * PROJECT STRUCTURE
 * ============================================
 * 
 * Global Objects:
 * - productsDatabase: Array[Product] - 23 products with full specs
 * - cart: ShoppingCart - global cart instance
 * - auth: AuthManager - global auth manager
 * - wishlist: WishlistManager - global wishlist manager
 * - orderManager: OrderManager - global order manager
 * - Validator: Object with validation methods
 * - Formatter: Object with formatting methods
 * 
 */

// ============================================
// 1. PRODUCTS DATABASE (products-data.js)
// ============================================

/**
 * Product Object Structure:
 * {
 *   id: number,
 *   name: string,
 *   category: string ('paper'|'pen'|'tools'|'other'|'combo'),
 *   price: number,
 *   oldPrice: number,
 *   image: string (URL),
 *   icon: string (emoji),
 *   description: string,
 *   rating: number (4.0-5.0),
 *   reviews: number,
 *   stock: number,
 *   sale: boolean,
 *   specifications: {
 *     weight: string,
 *     sheets: string|number,
 *     material: string,
 *     dimensions: string,
 *     [key]: any
 *   },
 *   tags: string[]
 * }
 */

const productsDatabase = [
  {
    id: 1,
    name: "Giấy In Canon imagePaper A4",
    category: "paper",
    price: 65000,
    oldPrice: 80000,
    image: "https://images.unsplash.com/...",
    // ...more properties
  },
  // ... 22 more products
];

// ============================================
// 2. AUTHENTICATION SYSTEM (auth.js)
// ============================================

/**
 * User Object:
 * {
 *   id: string,
 *   name: string,
 *   email: string,
 *   password: string (base64 encoded),
 *   phone: string,
 *   address: string,
 *   createdAt: timestamp,
 *   wishlist: number[],
 *   orders: number[]
 * }
 */

class AuthManager {
  constructor() {
    // Load users from localStorage
  }

  /**
   * Register a new user
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} phone - User phone
   * @param {string} address - User address
   * @returns {Object} {success: boolean, message: string}
   */
  register(name, email, password, phone, address) {
    // Validate inputs
    // Check if email already exists
    // Create new user
    // Save to localStorage
    // Return success
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object|null} User object or null
   */
  login(email, password) {
    // Find user by email
    // Verify password
    // Set as currentUser
    // Return user object
  }

  /**
   * Logout current user
   */
  logout() {
    // Clear currentUser from localStorage
  }

  /**
   * Update user profile
   * @param {Object} updates - Updated fields {name, phone, address}
   * @returns {boolean} Success status
   */
  updateProfile(updates) {
    // Update currentUser with new values
    // Save to localStorage
    // Return success
  }

  /**
   * Change user password
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Object} {success: boolean, message: string}
   */
  changePassword(oldPassword, newPassword) {
    // Verify old password
    // Update password
    // Save to localStorage
    // Return result
  }
}

// Usage
const auth = new AuthManager();
const registerResult = auth.register("Ngô Văn An", "an@example.com", "Pass123", "0123456789", "HCM");
const loginResult = auth.login("an@example.com", "Pass123");

// ============================================
// 3. SHOPPING CART (main.js)
// ============================================

/**
 * CartItem Object:
 * {
 *   id: number,
 *   quantity: number,
 *   price: number,
 *   addedAt: timestamp
 * }
 */

class ShoppingCart {
  constructor() {
    // Load cart from localStorage
  }

  /**
   * Add product to cart
   * @param {number} productId - Product ID
   * @param {number} quantity - Quantity (default: 1)
   * @returns {Object} Added item object
   */
  addItem(productId, quantity = 1) {
    // Find product in database
    // Add to cart or update quantity
    // Save to localStorage
    // Return item
  }

  /**
   * Remove product from cart
   * @param {number} productId - Product ID
   * @returns {boolean} Success status
   */
  removeItem(productId) {
    // Remove item from cart
    // Save to localStorage
    // Return true
  }

  /**
   * Update item quantity
   * @param {number} productId - Product ID
   * @param {number} quantity - New quantity
   * @returns {boolean} Success status
   */
  updateQuantity(productId, quantity) {
    // Update quantity (min: 1, max: stock)
    // Save to localStorage
    // Return true
  }

  /**
   * Get cart total
   * @returns {number} Total amount in VND
   */
  getTotal() {
    // Calculate sum of all items
    // Return total
  }

  /**
   * Get cart item count
   * @returns {number} Total items quantity
   */
  getCount() {
    // Sum all quantities
    // Return count
  }

  /**
   * Clear entire cart
   */
  clear() {
    // Empty cart array
    // Save to localStorage
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem(1, 2);  // Add product 1 with quantity 2
cart.updateQuantity(1, 3);
total = cart.getTotal();

// ============================================
// 4. WISHLIST SYSTEM (wishlist.js)
// ============================================

class WishlistManager {
  constructor() {
    // Load wishlist from localStorage
  }

  /**
   * Add product to wishlist
   * @param {number} productId - Product ID
   * @returns {boolean} Success status
   */
  addToWishlist(productId) {
    // Add to wishlist array
    // Save to localStorage
    // Return true
  }

  /**
   * Remove product from wishlist
   * @param {number} productId - Product ID
   * @returns {boolean} Success status
   */
  removeFromWishlist(productId) {
    // Remove from wishlist array
    // Save to localStorage
    // Return true
  }

  /**
   * Check if product in wishlist
   * @param {number} productId - Product ID
   * @returns {boolean} Is in wishlist
   */
  isInWishlist(productId) {
    // Check if productId exists
    // Return boolean
  }

  /**
   * Toggle product in wishlist
   * @param {number} productId - Product ID
   * @returns {boolean} New state (true = added, false = removed)
   */
  toggleWishlist(productId) {
    // Check if in list
    // Add or remove
    // Update UI
    // Return new state
  }
}

// Usage
const wishlist = new WishlistManager();
wishlist.addToWishlist(5);
const inWishlist = wishlist.isInWishlist(5);

// ============================================
// 5. ORDER MANAGEMENT (order.js)
// ============================================

/**
 * Order Object:
 * {
 *   id: string,
 *   userId: string,
 *   items: CartItem[],
 *   totalPrice: number,
 *   shippingInfo: {
 *     name: string,
 *     email: string,
 *     phone: string,
 *     address: string,
 *     notes: string
 *   },
 *   status: 'pending'|'confirmed'|'shipped'|'delivered'|'cancelled',
 *   paymentMethod: 'cod'|'bank'|'wallet',
 *   paymentStatus: 'unpaid'|'paid',
 *   trackingNumber: string,
 *   createdAt: timestamp,
 *   updatedAt: timestamp
 * }
 */

class OrderManager {
  constructor() {
    // Load orders from localStorage
  }

  /**
   * Create new order
   * @param {Object} orderData - Order information
   * @returns {Object} Created order object
   */
  createOrder(orderData) {
    // Validate order data
    // Generate order ID
    // Create order object
    // Save to localStorage
    // Send confirmation email (simulated)
    // Return order
  }

  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   * @returns {Object|null} Order object or null
   */
  getOrder(orderId) {
    // Find order in orders array
    // Return order or null
  }

  /**
   * Get user orders
   * @param {string} userId - User ID
   * @returns {Array} Array of orders for user
   */
  getUserOrders(userId) {
    // Filter orders by userId
    // Sort by date (newest first)
    // Return orders array
  }

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} newStatus - New status
   * @returns {boolean} Success status
   */
  updateOrderStatus(orderId, newStatus) {
    // Find order
    // Update status
    // Save to localStorage
    // Return true
  }

  /**
   * Cancel order
   * @param {string} orderId - Order ID
   * @returns {boolean} Success status
   */
  cancelOrder(orderId) {
    // Check if order can be cancelled (not shipped/delivered)
    // Update status to 'cancelled'
    // Save to localStorage
    // Return true
  }
}

// Usage
const orderManager = new OrderManager();
const order = orderManager.createOrder({
  items: cart.getItems(),
  shippingInfo: 
  {
  name: "Ngô Văn An",
  email: "",
  phone: "0123456789",
  address: "123 Đường ABC, HCM",
  notes: "Giao hàng trong giờ hành chính"
  },
  paymentMethod: "cod"

});

const Validator = {
  isValidEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  isValidPhone: (phone) => /^[\d\s\-\+]{10,}$/.test(phone),
  isStrongPassword: (pwd) => pwd.length >= 6 && /[A-Z]/.test(pwd) && /\d/.test(pwd),
  isValidName: (name) => name.trim().length >= 2,
  isValidAddress: (addr) => addr.trim().length >= 5
};


const Formatter = {
  currency: (amount) => amount.toLocaleString('vi-VN') + 'đ',
  currencySimple: (amount) => {
    if (amount >= 1000000) return (amount / 1000000).toFixed(1) + 'M';
    if (amount >= 1000) return (amount / 1000).toFixed(1) + 'K';
    return amount.toString();
  },
  date: (timestamp) => new Date(timestamp).toLocaleDateString('vi-VN'),
  dateTime: (timestamp) => new Date(timestamp).toLocaleString('vi-VN'),
  truncate: (text, length = 50) => text.length > length ? text.substring(0, length) + '...' : text
};

/**
 * Other utility functions:
 * - delay(ms): Promise (async sleep)
 * - debounce(func, delay): function (debounced function)
 * - throttle(func, delay): function (throttled function)
 * - getQueryParam(param): string (get URL query parameter)
 * - generateId(): string (generate unique ID)
 * - copyToClipboard(text): Promise (copy text to clipboard)
 */

// Usage
const isValid = Validator.isValidEmail("user@example.com");
const formatted = Formatter.currency(150000);  // "150.000đ"
const truncated = Formatter.truncate("Very long text...", 10);  // "Very long..."

// ============================================
// 7. NOTIFICATIONS
// ============================================

/**
 * Show notification toast
 * @param {string} message - Notification message
 * @param {string} type - Type: 'success'|'error'|'warning'|'info'
 * @param {number} duration - Duration in ms (default: 3000)
 */
function showNotification(message, type = 'info', duration = 3000) {
  // Create toast element
  // Add to DOM
  // Auto-remove after duration
}

// Usage
showNotification("Thêm vào giỏ hàng thành công!", "success");
showNotification("Lỗi: Email đã tồn tại", "error");

// ============================================
// 8. PAGE-SPECIFIC FUNCTIONS
// ============================================

// products-page.js
function displayProducts() {
  // Get filtered products
  // Render product cards with template
  // Attach event listeners
}

function applyFilters() {
  // Get filter values
  // Filter products database
  // Update display
}

function searchProducts() {
  // Get search input
  // Filter by name/description
  // Display results
}

// cart.js
function displayCartItems() {
  // Get cart from storage
  // Render table rows
  // Calculate totals
}

function applyPromoCode(code) {
  // Validate code
  // Apply discount
  // Update totals
}

// checkout.js
function validateCheckoutForm(step) {
  // Validate based on step
  // Show errors if any
  // Return validation result
}

function processCheckout() {
  // Get form data
  // Create order
  // Clear cart
  // Redirect to confirmation
}

// account.js
function loadAccountData() {
  // Get current user
  // Check auth
  // Load user data
  // Display in tabs
}

function updateUserProfile() {
  // Get form inputs
  // Validate
  // Call auth.updateProfile()
  // Show success/error
}

// ============================================
// 9. DATA FLOW DIAGRAMS
// ============================================

/**
 * USER FLOW:
 * 
 * Register/Login
 *   ↓
 * Browse Products (products.html)
 *   ↓
 * View Details (product-detail.html?id=X)
 *   │
 *   ├→ Add to Cart
 *   └→ Add to Wishlist
 *   ↓
 * View Cart (cart.html)
 *   ├→ Update quantities
 *   └→ Apply promo code
 *   ↓
 * Checkout (checkout.html)
 *   ├→ Step 1: Shipping info
 *   ├→ Step 2: Payment method
 *   └→ Step 3: Confirm order
 *   ↓
 * Order Created
 *   ↓
 * View Account (account.html)
 *   ├→ Dashboard: Stats
 *   ├→ Orders: Order history
 *   ├→ Wishlist: Saved products
 *   └→ Profile: Update info
 * 
 */

// ============================================
// 10. LOCALSTORAGE KEYS
// ============================================

/**
 * localStorage keys used:
 * 
 * 'cart': Array<CartItem>
 * 'currentUser': User object | null
 * 'users': Array<User>
 * 'wishlist': Array<number> (product IDs)
 * 'orders': Array<Order>
 */

// ============================================
// 11. EXTENDING THE PROJECT
// ============================================

// Add Google Analytics
// Add email notifications
// Add product reviews system
// Add rating/comment system
// Add admin panel
// Add payment gateway integration
// Add customer support chat
// Add product comparison
// Add advanced search with autocomplete
// Add progressive web app (PWA)
// Add backend API integration

// ============================================
// 12. COMMON QUERIES
// ============================================

// Get all cart items
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Get current user
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Get all orders
const allOrders = JSON.parse(localStorage.getItem('orders')) || [];

// Get user's orders
const userOrders = allOrders.filter(o => o.userId === currentUser.id);

// Get product by ID
const product = productsDatabase.find(p => p.id === productId);

// Check if user logged in
const isLoggedIn = currentUser !== null;

// Get cart total
total = cart.getTotal();

// ============================================
// 13. TESTING CHECKLIST
// ============================================

/**
 * ☐ Responsive design (mobile, tablet, desktop)
 * ☐ User registration with validation
 * ☐ User login/logout
 * ☐ Add product to cart
 * ☐ Update cart quantities
 * ☐ Remove from cart
 * ☐ Apply promo codes
 * ☐ Create order
 * ☐ View order history
 * ☐ Update user profile
 * ☐ Change password
 * ☐ Add/remove wishlist items
 * ☐ Product filtering
 * ☐ Product search
 * ☐ Cross-browser compatibility
 * ☐ Performance (load time < 2s)
 * ☐ All links/navigation work
 * ☐ Forms validate correctly
 * ☐ LocalStorage persists data
 * ☐ No console errors
 */

// ============================================
// END OF DOCUMENTATION
// ============================================
