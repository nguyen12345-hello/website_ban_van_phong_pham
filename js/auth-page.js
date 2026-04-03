// ============================================
// AUTH PAGE JAVASCRIPT
// ============================================

// Switch to Register Form
function switchToRegister(e) {
    e.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

// Switch to Login Form
function switchToLogin(e) {
    e.preventDefault();
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const result = auth.login(email, password);

    if (result.success) {
        showNotification(result.message, 'success');
        localStorage.setItem('loggedInUser', JSON.stringify(result.user));
        setTimeout(() => {
            window.location.href = '../index-main.html';
        }, 1500);
    } else {
        showNotification(result.message, 'error');
    }
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;

    const result = auth.register(name, email, password, confirmPassword);

    if (result.success) {
        showNotification('Đăng ký thành công! Vui lòng đăng nhập để mua hàng.', 'success');
        // Clear register form and switch to login
        document.getElementById('register-name').value = '';
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('register-confirm').value = '';
        document.getElementById('register-agree').checked = false;
        switchToLogin(e);
        document.getElementById('login-email').value = email;
        document.getElementById('login-password').focus();
    } else {
        showNotification(result.message, 'error');
    }
}

// Demo Login (for testing)
function demoLogin(email, password) {
    const demoUsers = [
        { name: 'Nguyễn Văn A', email: 'user@example.com', password: 'password123' }
    ];

    const user = demoUsers.find(u => u.email === email);
    if (user && user.password === password) {
        return { success: true, message: 'Demo login successful' };
    }
    return { success: false, message: 'Invalid demo credentials' };
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    if (auth.isLoggedIn()) {
        window.location.href = '../index-main.html';
    }
    console.log('Test account: user@example.com / password123');
});
