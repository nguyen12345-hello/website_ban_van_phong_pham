// Auth + Cart + Wishlist for Typo VN
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = localStorage.getItem('currentUser') || null;
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

// Demo users
if (users.length === 0) {
  users = [
    {username: 'user1', password: '123', email: 'user1@example.com'},
    {username: 'user2', password: '123', email: 'user2@example.com'}
  ];
  localStorage.setItem('users', JSON.stringify(users));
}

function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = username;
    localStorage.setItem('currentUser', currentUser);
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    updateAuthUI();
    loadUserCart();
    loadUserWishlist();
    return true;
  }
  alert('Sai tên đăng nhập hoặc mật khẩu!');
  return false;
}

function register(username, email, password) {
  if (users.find(u => u.username === username)) {
    alert('Tên đăng nhập đã tồn tại!');
    return false;
  }
  users.push({username, email, password});
  localStorage.setItem('users', JSON.stringify(users));
  alert('Đăng ký thành công! Vui lòng đăng nhập.');
  bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
  return true;
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  localStorage.removeItem('cart');
  localStorage.removeItem('wishlist');
  cart = [];
  wishlist = [];
  updateCart();
  updateWishlist();
  updateAuthUI();
}

function loadUserCart() {
  if (currentUser) {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    updateCart();
  }
}

function loadUserWishlist() {
  if (currentUser) {
    wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    updateWishlist();
  }
}

function saveCart() {
  if (currentUser) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

function saveWishlist() {
  if (currentUser) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
}

function updateAuthUI() {
  const dropdown = document.getElementById('authDropdown');
  if (currentUser) {
    dropdown.innerHTML = `
      <i class="bi bi-person-check"></i> ${currentUser} <span class="badge bg-success ms-1">Đã đăng nhập</span>
    `;
    dropdown.href = '#';
    const menu = dropdown.parentElement.querySelector('.dropdown-menu');
    menu.innerHTML = `
      <li><a class="dropdown-item" href="#" onclick="loadUserCart()">Giỏ hàng của tôi</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item text-danger" href="#" onclick="logout()">Đăng xuất</a></li>
    `;
  } else {
    dropdown.innerHTML = '<i class="bi bi-person-circle"></i> Tài khoản';
    const menu = dropdown.parentElement.querySelector('.dropdown-menu');
    menu.innerHTML = `
      <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Đăng ký</a></li>
    `;
  }
}

function addToCart(productName, price) {
  if (!currentUser) {
    alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
    new bootstrap.Modal(document.getElementById('loginModal')).show();
    return;
  }
  cart.push({name: productName, price: parseInt(price)});
  saveCart();
  updateCart();
  alert('Đã thêm vào giỏ hàng!');
}

function addToWishlist(productName, price) {
  if (!currentUser) {
    alert('Vui lòng đăng nhập để thêm vào danh sách yêu thích!');
    new bootstrap.Modal(document.getElementById('loginModal')).show();
    return;
  }
  if (!wishlist.find(item => item.name === productName)) {
    wishlist.push({name: productName, price: parseInt(price)});
    saveWishlist();
    updateWishlist();
    alert('Đã thêm vào danh sách yêu thích!');
  } else {
    alert('Sản phẩm đã có trong danh sách yêu thích!');
  }
}

function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  saveWishlist();
  updateWishlist();
}

function updateWishlist() {
  if (!currentUser) return;

  const wishlistItems = document.getElementById('wishlistItemsBody');
  
  if (wishlistItems) {
    if (wishlist.length === 0) {
      wishlistItems.innerHTML = '<p class="text-center text-muted py-4 mb-0">Danh sách yêu thích trống. <br>Hãy thêm sản phẩm!</p>';
    } else {
      wishlistItems.innerHTML = wishlist.map((item, index) => `
        <div class="wishlist-item d-flex justify-content-between align-items-center py-3 border-bottom">
          <div class="flex-grow-1 me-3">
            <h6 class="mb-1 fw-bold">${item.name}</h6>
            <small class="text-muted">${item.price.toLocaleString('vi-VN')} VNĐ</small>
          </div>
          <div class="text-end">
            <button class="btn btn-sm btn-success me-2" onclick="addToCart('${item.name}', ${item.price})">Thêm vào giỏ</button>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${index})" title="Xóa">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      `).join('');
    }
  }
}

function updateCart() {
  // Navbar cart count
  const cartBadge = document.querySelector('#cartCount');
  if (cartBadge) cartBadge.textContent = cart.length;
  if (!currentUser) return; // Skip if not logged in

  // Modal content
  const cartItems = document.getElementById('cartItemsBody');
  const cartTotalModal = document.getElementById('cartTotalModal');
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="text-center text-muted py-4 mb-0">Giỏ hàng đang trống. <br>Thêm sản phẩm để mua hàng!</p>';
      if (cartTotalModal) cartTotalModal.textContent = '0 VNĐ';
    } else {
      let total = 0;
      cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item d-flex justify-content-between align-items-center py-3 border-bottom">
          <div class="flex-grow-1 me-3">
            <h6 class="mb-1 fw-bold">${item.name}</h6>
            <small class="text-muted">${item.price.toLocaleString('vi-VN')} VNĐ</small>
          </div>
          <div class="text-end">
            <span class="badge bg-light text-dark fs-6 me-2">1 x</span>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})" title="Xóa">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      `).join('');
      
      total = cart.reduce((sum, item) => sum + item.price, 0);
      if (cartTotalModal) cartTotalModal.textContent = total.toLocaleString('vi-VN') + ' VNĐ';
    }
  }
}

function initFlashSaleCountdown() {
  let timeLeft = 2 * 60 * 60; // 2 hours in seconds
  
  function updateCountdown() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    const countdownEl = document.getElementById('flashCountdown');
    if (countdownEl) {
      countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      // Reset or show ended
      countdownEl.textContent = '00:00:00';
      countdownEl.classList.remove('bg-danger');
      countdownEl.classList.add('bg-secondary');
    }
  }
  
  updateCountdown(); // Initial
  setInterval(updateCountdown, 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  updateAuthUI();
  updateCart();
  updateWishlist();
  initFlashSaleCountdown();
  
  // Form handlers
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    login(username, password);
  });
  
  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    register(username, email, password);
  });
  
  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

