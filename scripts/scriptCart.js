// Cart management
document.addEventListener('DOMContentLoaded', () => {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Get DOM elements
    const cartEmptyMessage = document.querySelector('.cart-empty');
    const cartHasItemsMessage = document.querySelector('.cart-has-items');
    
    // Check if cart is empty
    if (cart.length === 0) {
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        if (cartHasItemsMessage) cartHasItemsMessage.style.display = 'none';
    } else {
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
        if (cartHasItemsMessage) cartHasItemsMessage.style.display = 'block';
        // Update cart display
        updateCartDisplay();
    }
    
    // Update cart button event
    const updateCartButton = document.querySelector('.cart-update');
    if (updateCartButton) {
        updateCartButton.addEventListener('click', () => {
            updateCartDisplay();
            alert('Giỏ hàng đã được cập nhật!');
        });
    }
});

// Update cart display
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('.cart-table tbody');
    
    if (!cartTableBody) return;
    
    // Clear current table
    cartTableBody.innerHTML = '';
    
    // Add each product to the table
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
    
    // Update cart summary
    updateCartSummary();
}

// Update product quantity
function updateQuantity(index, quantity) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Validate quantity
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity < 1) quantity = 1;
    
    // Update quantity
    cart[index].quantity = quantity;
    
    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
}

// Remove item from cart
function removeItem(index) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove item
    cart.splice(index, 1);
    
    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Check if cart is now empty
    if (cart.length === 0) {
        const cartEmptyMessage = document.querySelector('.cart-empty');
        const cartHasItemsMessage = document.querySelector('.cart-has-items');
        
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        if (cartHasItemsMessage) cartHasItemsMessage.style.display = 'none';
    } else {
        // Update display
        updateCartDisplay();
    }
}

// Update cart summary
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    // Shipping cost - set to 0 for now
    const shipping = 0;
    
    // Final total
    const total = subtotal + shipping;
    
    // Update DOM elements
    const subtotalElement = document.querySelector('.cart-summary-table tr:nth-child(1) td');
    const shippingElement = document.querySelector('.cart-summary-table tr:nth-child(2) td');
    const totalElement = document.querySelector('.cart-summary-table .total td');
    
    if (subtotalElement) subtotalElement.textContent = subtotal.toLocaleString() + '₫';
    if (shippingElement) shippingElement.textContent = shipping.toLocaleString() + '₫';
    if (totalElement) totalElement.textContent = total.toLocaleString() + '₫';
}