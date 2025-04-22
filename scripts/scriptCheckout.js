document.addEventListener('DOMContentLoaded', function() {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Hiển thị thông tin đơn hàng ở phần checkout nếu có sản phẩm
    if (cart.length > 0) {
        updateOrderSummary(cart);
    } else {
        // Nếu không có sản phẩm, chuyển hướng về trang giỏ hàng
        alert('Giỏ hàng của bạn đang trống!');
        window.location.href = 'cart.html';
    }

    // Xử lý sự kiện submit form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Kiểm tra thông tin form
            if (validateForm()) {
                // Xử lý đặt hàng
                processOrder();
            }
        });
    }
});

// Cập nhật thông tin đơn hàng hiển thị
function updateOrderSummary(cart) {
    const productSummary = document.querySelector('.product-summary');
    if (!productSummary) return;
    
    // Xóa nội dung hiện tại
    productSummary.innerHTML = '';
    
    // Tổng tiền tạm tính
    let subtotal = 0;
    
    // Thêm từng sản phẩm vào phần tóm tắt đơn hàng
    cart.forEach(item => {
        // Tính tổng giá trị của mỗi sản phẩm
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Tạo HTML cho mỗi sản phẩm
        const productItemHTML = `
            <div class="product-item">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="product-details">
                    <h3>${item.name}</h3>
                    <p class="variant">Màu sắc: ${item.variant || 'Mặc định'}</p>
                    <p class="quantity">Số lượng: ${item.quantity}</p>
                    <p class="price">${item.price.toLocaleString()}₫</p>
                </div>
            </div>
        `;
        
        // Thêm sản phẩm vào DOM
        productSummary.innerHTML += productItemHTML;
    });
    
    // Phí vận chuyển cố định (có thể thay đổi theo logic của bạn)
    const shipping = subtotal >= 500000 ? 0 : 30000;
    
    // Tổng cộng
    const total = subtotal + shipping;
    
    // Cập nhật thông tin giá
    const priceSummary = document.querySelector('.price-summary');
    if (priceSummary) {
        priceSummary.innerHTML = `
            <div class="price-row">
                <span>Tạm tính</span>
                <span>${subtotal.toLocaleString()}₫</span>
            </div>
            <div class="price-row">
                <span>Phí vận chuyển</span>
                <span>${shipping.toLocaleString()}₫</span>
            </div>
            <div class="price-row total">
                <span>Tổng cộng</span>
                <span>${total.toLocaleString()}₫</span>
            </div>
        `;
    }
}

