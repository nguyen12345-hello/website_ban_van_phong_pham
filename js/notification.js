// ============================================
// NOTIFICATION SYSTEM - Toast Messages
// Hệ thống hiển thị thông báo dưới dạng toast
// ============================================

class NotificationSystem {
    constructor() {
        this.toasts = [];
        this.createContainer();
        this.injectStyles();
    }

    /**
     * Tạo container chứa toasts
     */
    createContainer() {
        if (!document.getElementById('toastContainer')) {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
    }

    /**
     * Inject CSS cho toast system
     */
    injectStyles() {
        if (document.getElementById('toastStyles')) {
            return; // CSS đã được thêm
        }

        const style = document.createElement('style');
        style.id = 'toastStyles';
        style.textContent = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                pointer-events: none;
            }

            .toast {
                background: white;
                border-radius: 8px;
                padding: 16px 24px;
                margin-bottom: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: slideInRight 0.3s ease-out;
                pointer-events: auto;
                display: flex;
                align-items: center;
                gap: 12px;
                max-width: 400px;
                min-width: 300px;
                border-left: 4px solid #ccc;
            }

            .toast.success {
                background: #D4EDDA;
                border-left-color: #28A745;
                color: #155724;
            }

            .toast.error {
                background: #F8D7DA;
                border-left-color: #DC3545;
                color: #721C24;
            }

            .toast.info {
                background: #D1ECF1;
                border-left-color: #17A2B8;
                color: #0C5460;
            }

            .toast.warning {
                background: #FFF3CD;
                border-left-color: #FFC107;
                color: #856404;
            }

            .toast-icon {
                font-size: 20px;
                flex-shrink: 0;
            }

            .toast-content {
                flex: 1;
                font-size: 14px;
                line-height: 1.4;
            }

            .toast-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                font-size: 18px;
                padding: 0;
                flex-shrink: 0;
                opacity: 0.7;
                transition: opacity 0.2s;
            }

            .toast-close:hover {
                opacity: 1;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            .toast.removing {
                animation: slideOutRight 0.3s ease-out;
            }

            /* Mobile responsive */
            @media (max-width: 480px) {
                .toast-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    width: auto;
                }

                .toast {
                    max-width: none;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Hiển thị toast notification
     * @param {string} message - Nội dung thông báo
     * @param {string} type - Loại: 'success', 'error', 'info', 'warning'
     * @param {number} duration - Thời gian hiển thị (ms), 0 = không tự đóng
     */
    show(message, type = 'info', duration = 3000) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'info': 'ℹ️',
            'warning': '⚠️'
        };

        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || '📢'}</span>
            <div class="toast-content">${message}</div>
            <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
        `;

        container.appendChild(toast);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.classList.add('removing');
                    setTimeout(() => {
                        if (toast.parentElement) {
                            toast.remove();
                        }
                    }, 300);
                }
            }, duration);
        }

        return toast;
    }

    /**
     * Hiển thị thông báo thành công
     */
    success(message, duration = 3000) {
        return this.show(message, 'success', duration);
    }

    /**
     * Hiển thị thông báo lỗi
     */
    error(message, duration = 4000) {
        return this.show(message, 'error', duration);
    }

    /**
     * Hiển thị thông báo thông tin
     */
    info(message, duration = 3000) {
        return this.show(message, 'info', duration);
    }

    /**
     * Hiển thị thông báo cảnh báo
     */
    warning(message, duration = 3500) {
        return this.show(message, 'warning', duration);
    }

    /**
     * Hiển thị thông báo không tự đóng
     */
    persistent(message, type = 'info') {
        return this.show(message, type, 0);
    }

    /**
     * Xóa tất cả toast
     */
    clearAll() {
        const container = document.getElementById('toastContainer');
        if (container) {
            container.innerHTML = '';
        }
    }
}

// Initialize global notification
const notify = new NotificationSystem();
window.notify = notify; // Make it globally accessible

/**
 * Helper functions để sử dụng dễ dàng
 */
function showSuccess(message, duration = 3000) {
    return notify.success(message, duration);
}

function showError(message, duration = 4000) {
    return notify.error(message, duration);
}

function showInfo(message, duration = 3000) {
    return notify.info(message, duration);
}

function showWarning(message, duration = 3500) {
    return notify.warning(message, duration);
}

/**
 * Hỗ trợ cách gọi cũ
 */
function showNotification(message, type = 'info') {
    const typeMap = {
        'success': 'success',
        'error': 'error',
        'info': 'info',
        'warning': 'warning'
    };
    notify.show(message, typeMap[type] || 'info', 3000);
}
