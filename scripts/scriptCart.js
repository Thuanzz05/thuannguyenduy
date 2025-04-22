document.addEventListener('DOMContentLoaded', () => {
    // Lấy giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Lấy các phần tử DOM
    const cartEmptyMessage = document.querySelector('.cart-empty');
    const cartHasItemsMessage = document.querySelector('.cart-has-items');
    
    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        if (cartHasItemsMessage) cartHasItemsMessage.style.display = 'none';
    } else {
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
        if (cartHasItemsMessage) cartHasItemsMessage.style.display = 'block';
        // Cập nhật giao diện giỏ hàng
        updateCartDisplay();
    }
    
    // Sự kiện cập nhật giỏ hàng
    const updateCartButton = document.querySelector('.cart-update');
    if (updateCartButton) {
        updateCartButton.addEventListener('click', () => {
            updateCartDisplay();
            alert('Giỏ hàng đã được cập nhật!');
        });
    }
});

// Cập nhật giao diện giỏ hàng
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('.cart-table tbody');
    
    if (!cartTableBody) return;
    
    // Xóa các hàng cũ trong bảng giỏ hàng
    cartTableBody.innerHTML = '';
    
    // Thêm từng sản phẩm vào bảng giỏ hàng
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="cart-product" data-label="Sản phẩm">
                <div class="cart-product-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-product-name"><a href="#">${item.name}</a></div>
            </td>
            <td class="cart-price" data-label="Giá">${item.price.toLocaleString()}₫</td>
            <td class="cart-quantity" data-label="Số lượng">
                <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
            </td>
            <td class="cart-subtotal" data-label="Tổng">${(item.price * item.quantity).toLocaleString()}₫</td>
            <td class="cart-remove" data-label="Xóa">
                <button onclick="removeItem(${index})">Xóa</button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });
    
    // Cập nhật tổng giỏ hàng
    updateCartSummary();
}

// Cập nhật số lượng sản phẩm
function updateQuantity(index, quantity) {
    // Lấy giỏ hàng hiện tại từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Kiểm tra và xác nhận giá trị nhập vào
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity < 1) quantity = 1;
    
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    cart[index].quantity = quantity;
    
    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Cập nhật lại giao diện giỏ hàng
    updateCartDisplay();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    // Lấy giỏ hàng hiện tại từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Xóa sản phẩm khỏi giỏ hàng
    cart.splice(index, 1);
    
    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
        const cartEmptyMessage = document.querySelector('.cart-empty');
        const cartHasItemsMessage = document.querySelector('.cart-has-items');
        
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        if (cartHasItemsMessage) cartHasItemsMessage.style.display = 'none';
    } else {
        // Cập nhật lại giao diện giỏ hàng
        updateCartDisplay();
    }
}

// Cập nhật tổng giá trị giỏ hàng
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Tính tổng tạm tính
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    // Phí vận chuyển (đặt tạm thời là 0)
    const shipping = 0;
    
    // Tổng giỏ hàng
    const total = subtotal + shipping;
    
    // Cập nhật các phần tử DOM
    const subtotalElement = document.querySelector('.cart-summary-table tr:nth-child(1) td');
    const shippingElement = document.querySelector('.cart-summary-table tr:nth-child(2) td');
    const totalElement = document.querySelector('.cart-summary-table .total td');
    
    if (subtotalElement) subtotalElement.textContent = subtotal.toLocaleString() + '₫';
    if (shippingElement) shippingElement.textContent = shipping.toLocaleString() + '₫';
    if (totalElement) totalElement.textContent = total.toLocaleString() + '₫';
}
