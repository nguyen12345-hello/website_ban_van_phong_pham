// ============================================
// ORDER & PAYMENT MANAGEMENT
// Quản lý đơn hàng, thanh toán
// ============================================

class Order {
    constructor(cartItems, totalPrice, shippingInfo) {
        this.id = 'ORD' + Date.now();
        this.items = cartItems;
        this.totalPrice = totalPrice;
        this.shippingInfo = shippingInfo;
        this.status = 'pending'; // pending, confirmed, shipped, delivered, cancelled
        this.paymentMethod = 'cod'; // cod, bank, wallet
        this.paymentStatus = 'unpaid'; // unpaid, paid
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.trackingNumber = null;
    }
}

class OrderManager {
    constructor() {
        this.orders = this.loadOrders();
    }

    loadOrders() {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    }

    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    // Tạo đơn hàng mới
    createOrder(cartItems, totalPrice, shippingInfo, paymentMethod = 'cod') {
        if (!auth.isLoggedIn()) {
            return { success: false, message: 'Vui lòng đăng nhập trước' };
        }

        if (!cartItems || cartItems.length === 0) {
            return { success: false, message: 'Giỏ hàng trống' };
        }

        const order = new Order(cartItems, totalPrice, shippingInfo);
        order.paymentMethod = paymentMethod;

        this.orders.push(order);
        this.saveOrders();

        // Lưu đơn hàng vào user
        if (auth.currentUser) {
            auth.currentUser.orders = auth.currentUser.orders || [];
            auth.currentUser.orders.push(order.id);
            auth.saveCurrentUser(auth.currentUser);
        }

        return { success: true, message: 'Tạo đơn hàng thành công', order: order };
    }

    // Lấy đơn hàng theo ID
    getOrder(orderId) {
        return this.orders.find(o => o.id === orderId);
    }

    // Lấy tất cả đơn hàng của user
    getUserOrders() {
        if (!auth.isLoggedIn()) return [];

        return this.orders.filter(order => {
            // Kiểm tra xem đơn hàng này có phải của user này không
            return auth.currentUser.orders && auth.currentUser.orders.includes(order.id);
        });
    }

    // Cập nhật trạng thái đơn hàng
    updateOrderStatus(orderId, status) {
        const order = this.getOrder(orderId);
        if (order) {
            order.status = status;
            order.updatedAt = new Date();
            this.saveOrders();
            return { success: true, message: 'Cập nhật trạng thái thành công' };
        }
        return { success: false, message: 'Không tìm thấy đơn hàng' };
    }

    // Cập nhật trạng thái thanh toán
    updatePaymentStatus(orderId, status) {
        const order = this.getOrder(orderId);
        if (order) {
            order.paymentStatus = status;
            this.saveOrders();
            return { success: true, message: 'Cập nhật thanh toán thành công' };
        }
        return { success: false, message: 'Không tìm thấy đơn hàng' };
    }

    // Hủy đơn hàng
    cancelOrder(orderId) {
        const order = this.getOrder(orderId);
        if (!order) {
            return { success: false, message: 'Không tìm thấy đơn hàng' };
        }

        if (order.status !== 'pending' && order.status !== 'confirmed') {
            return { success: false, message: 'Chỉ có thể hủy đơn hàng đang chờ hoặc xác nhận' };
        }

        order.status = 'cancelled';
        order.updatedAt = new Date();
        this.saveOrders();
        return { success: true, message: 'Hủy đơn hàng thành công' };
    }

    // Lấy tổng số đơn hàng
    getOrderCount() {
        return this.orders.length;
    }

    // Lấy doanh thu tổng
    getTotalRevenue() {
        return this.orders
            .filter(o => o.paymentStatus === 'paid')
            .reduce((sum, o) => sum + o.totalPrice, 0);
    }
}

// Initialize Order Manager
const orderManager = new OrderManager();

// Hàm format trạng thái đơn hàng
function getOrderStatusBadge(status) {
    const statusMap = {
        'pending': { label: 'Chờ xác nhận', color: '#ffc107', bg: '#fff3cd' },
        'confirmed': { label: 'Đã xác nhận', color: '#0275d8', bg: '#d1ecf1' },
        'shipped': { label: 'Đang giao', color: '#20c997', bg: '#d4edda' },
        'delivered': { label: 'Đã giao', color: '#28a745', bg: '#d4edda' },
        'cancelled': { label: 'Đã hủy', color: '#dc3545', bg: '#f8d7da' }
    };

    const info = statusMap[status] || statusMap['pending'];
    return `<span style="background: ${info.bg}; color: ${info.color}; padding: 5px 10px; border-radius: 4px; font-weight: 600; font-size: 0.9rem;">${info.label}</span>`;
}

// Hàm format trạng thái thanh toán
function getPaymentStatusBadge(status) {
    if (status === 'paid') {
        return '<span style="background: #d4edda; color: #28a745; padding: 5px 10px; border-radius: 4px; font-weight: 600;">Đã thanh toán ✓</span>';
    } else {
        return '<span style="background: #fff3cd; color: #ffc107; padding: 5px 10px; border-radius: 4px; font-weight: 600;">Chưa thanh toán</span>';
    }
}
