// ============================================
// AUTHENTICATION & USER MANAGEMENT
// Quản lý tài khoản, đăng nhập/đăng ký
// ============================================

class User {
    constructor(username, name, email, password) {
        this.id = Date.now();
        this.username = username; // Tên đăng nhập
        this.name = name;
        this.email = email;
        this.password = btoa(password); // Simple encoding (không dùng production)
        this.createdAt = new Date();
        this.phone = '';
        this.address = '';
        this.wishlist = [];
        this.orders = [];
    }
}

class AuthManager {
    constructor() {
        this.currentUser = this.loadUser();
        this.users = this.loadAllUsers();
        
        // Khởi tạo demo users nếu chưa có
        if (this.users.length === 0) {
            this.users = [
                new User('user1', 'User One', 'user1@example.com', '123'),
                new User('user2', 'User Two', 'user2@example.com', '123')
            ];
            this.saveAllUsers();
        }
    }

    // Lưu tất cả users vào localStorage
    saveAllUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Load tất cả users
    loadAllUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Lưu user hiện tại
    saveCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
    }

    // Load user hiện tại
    loadUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    // Đăng ký
    register(username, name, email, password, confirmPassword) {
        // Validation
        if (!username || !name || !email || !password) {
            return { success: false, message: 'Vui lòng điền đầy đủ thông tin' };
        }

        if (password !== confirmPassword) {
            return { success: false, message: 'Mật khẩu không khớp' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
        }

        if (username.length < 3 || username.length > 20) {
            return { success: false, message: 'Tên đăng nhập phải có 3-20 ký tự' };
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return { success: false, message: 'Tên đăng nhập chỉ chứa chữ, số, dấu gạch dưới' };
        }

        if (!this.validateEmail(email)) {
            return { success: false, message: 'Email không hợp lệ' };
        }

        // Kiểm tra username đã tồn tại
        if (this.users.find(u => u.username === username)) {
            return { success: false, message: 'Tên đăng nhập này đã được sử dụng' };
        }

        // Kiểm tra email đã tồn tại
        if (this.users.find(u => u.email === email)) {
            return { success: false, message: 'Email này đã được đăng ký' };
        }

        // Tạo user mới
        const newUser = new User(username, name, email, password);
        this.users.push(newUser);
        this.saveAllUsers();

        // Không tự động đăng nhập sau khi đăng ký
        return { success: true, message: 'Đăng ký thành công! Vui lòng đăng nhập. Tên hiển thị của bạn là: ' + newUser.name, user: newUser };
    }

    // Đăng nhập - Chấp nhận username hoặc email
    login(usernameOrEmail, password) {
        if (!usernameOrEmail || !password) {
            return { success: false, message: 'Vui lòng điền tên đăng nhập/email và mật khẩu' };
        }

        // Tìm user bằng username hoặc email
        const user = this.users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail);
        if (!user) {
            return { success: false, message: 'Tên đăng nhập/email này chưa được đăng ký. Vui lòng đăng ký tài khoản trước!' };
        }

        if (user.password !== btoa(password)) {
            return { success: false, message: 'Mật khẩu không chính xác' };
        }

        this.saveCurrentUser(user);
        return { success: true, message: 'Đăng nhập thành công', user: user };
    }

    // Đăng xuất
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('cart');
        localStorage.removeItem('wishlist');
        this.currentUser = null;
    }

    // Kiểm tra email
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Cập nhật profile
    updateProfile(name, phone, address) {
        if (!this.currentUser) {
            return { success: false, message: 'Bạn chưa đăng nhập' };
        }

        this.currentUser.name = name || this.currentUser.name;
        this.currentUser.phone = phone || this.currentUser.phone;
        this.currentUser.address = address || this.currentUser.address;

        this.saveCurrentUser(this.currentUser);
        
        // Cập nhật trong users list
        const index = this.users.findIndex(u => u.id === this.currentUser.id);
        if (index !== -1) {
            this.users[index] = this.currentUser;
            this.saveAllUsers();
        }

        return { success: true, message: 'Cập nhật thành công' };
    }

    // Thay đổi mật khẩu
    changePassword(oldPassword, newPassword, confirmPassword) {
        if (!this.currentUser) {
            return { success: false, message: 'Bạn chưa đăng nhập' };
        }

        if (this.currentUser.password !== btoa(oldPassword)) {
            return { success: false, message: 'Mật khẩu cũ không chính xác' };
        }

        if (newPassword.length < 6) {
            return { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' };
        }

        if (newPassword !== confirmPassword) {
            return { success: false, message: 'Mật khẩu mới không khớp' };
        }

        this.currentUser.password = btoa(newPassword);
        this.saveCurrentUser(this.currentUser);

        const index = this.users.findIndex(u => u.id === this.currentUser.id);
        if (index !== -1) {
            this.users[index] = this.currentUser;
            this.saveAllUsers();
        }

        return { success: true, message: 'Thay đổi mật khẩu thành công' };
    }

    // Kiểm tra đã đăng nhập
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Kiểm tra có thể mua hàng (logged in + có địa chỉ)
    canPurchase() {
        return this.isLoggedIn() && !!this.currentUser.address;
    }
}

// Initialize Auth Manager
const auth = new AuthManager();
window.auth = auth; // Make it globally accessible

// Update cart count and UI based on auth state
function updateUIAuth() {
    const loginPlaceholder = document.querySelector('.login-placeholder');
    const userMenu = document.querySelector('.user-menu');

    if (auth.isLoggedIn()) {
        if (loginPlaceholder) loginPlaceholder.style.display = 'none';
        if (userMenu) {
            userMenu.classList.add('active');
            const userName = userMenu.querySelector('.user-name');
            if (userName) userName.textContent = auth.currentUser.name;
        }
    } else {
        if (loginPlaceholder) loginPlaceholder.style.display = 'flex';
        if (userMenu) userMenu.classList.remove('active');
    }
}

// Hàm đăng xuất
function handleLogout() {
    if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
        auth.logout();
        showNotification('Đã đăng xuất thành công', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Auth State Changed Listener
function onAuthStateChanged() {
    const isLoggedIn = auth.isLoggedIn();
    const loginPlaceholder = document.querySelector('.login-placeholder');
    const userMenu = document.querySelector('.user-menu');
    const userName = document.querySelector('.user-name');
    
    if (isLoggedIn) {
        if (loginPlaceholder) loginPlaceholder.style.display = 'none';
        if (userMenu) {
            userMenu.classList.add('active');
            if (userName) userName.textContent = auth.currentUser.name || 'Người dùng';
        }
    } else {
        if (loginPlaceholder) loginPlaceholder.classList.remove('hidden');
        if (userMenu) userMenu.classList.remove('active');
    }
}

// Make it globally accessible
window.onAuthStateChanged = onAuthStateChanged;
