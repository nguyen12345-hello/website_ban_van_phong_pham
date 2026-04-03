// ============================================
// UTILITIES & HELPERS
// Hàm tiện ích chung
// ============================================

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    
    const colors = {
        'success': { bg: '#27ae60', icon: '✓' },
        'error': { bg: '#e74c3c', icon: '✕' },
        'warning': { bg: '#f39c12', icon: '⚠' },
        'info': { bg: '#3498db', icon: 'ℹ' }
    };

    const config = colors[type] || colors['info'];

    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: ${config.bg};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;
    notification.textContent = `${config.icon} ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Validation Helpers
const Validator = {
    // Kiểm tra email
    isValidEmail: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Kiểm tra số điện thoại
    isValidPhone: (phone) => {
        const regex = /^(\+84|0)[0-9]{9,10}$/;
        return regex.test(phone);
    },

    // Kiểm tra mật khẩu mạnh
    isStrongPassword: (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    },

    // Kiểm tra tên
    isValidName: (name) => {
        return name && name.length >= 2 && name.length <= 100;
    },

    // Kiểm tra địa chỉ
    isValidAddress: (address) => {
        return address && address.length >= 10 && address.length <= 200;
    }
};

// Format Helpers
const Formatter = {
    // Format tiền tệ VND
    currency: (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    },

    // Format tiền đơn giản (không ký hiệu)
    currencySimple: (amount) => {
        const formatter = new Intl.NumberFormat('vi-VN');
        return formatter.format(amount) + 'đ';
    },

    // Format ngày tháng
    date: (date) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Format thời gian đầy đủ
    dateTime: (date) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    },

    // Rút gọn tên
    truncate: (text, length = 30) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    }
};

// Storage Helpers
const Storage = {
    // Set item
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },

    // Get item
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage error:', e);
            return defaultValue;
        }
    },

    // Remove item
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },

    // Clear all
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

// Delay/Timeout Helper
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Debounce Helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle Helper
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get Query Parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Format giảm giá (%)
function getDiscount(oldPrice, newPrice) {
    if (!oldPrice || !newPrice) return 0;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

// Generate ID
function generateId() {
    return 'ID_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Đã sao chép vào clipboard');
    }).catch(() => {
        showNotification('Sao chép thất bại', 'error');
    });
}

// Check Browser Support
const BrowserCheck = {
    isLocalStorageSupported: () => {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    },

    isCookieEnabled: () => {
        return navigator.cookieEnabled;
    }
};

// Add animations to page
const animations = document.createElement('style');
animations.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    @keyframes shake {
        0%, 100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-5px);
        }
        75% {
            transform: translateX(5px);
        }
    }
`;
document.head.appendChild(animations);
