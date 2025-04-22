// Chờ tài liệu HTML tải xong
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    //Khỏi tạo dl sp
    initProductData();

    //Thiết lập các sk
    setupEventListeners();

    //Cập nhật số lượng giỏ hàng khi trang tải
    updateCartCount();
});

// Hàm khởi tạo dữ liệu sản phẩm từ các phần tử HTML
function initProductData() {
    productData = {
        id: getProductIdFromUrl() || '1', 
        name: document.querySelector('.product-title').textContent,
        price: parseFloat(document.querySelector('.current-price').textContent.replace(/[^\d]/g, '')),
        image: document.getElementById('main-product-image').src,
        category: document.querySelector('.product-category a').textContent,
        description: document.querySelector('.product-description').textContent.trim()
    };
}

// Hàm lấy ID sản phẩm từ URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Hàm thiết lập tất cả các sự kiện
function setupEventListeners() {
    // Thiết lập các nút thay đổi số lượng
    setupQuantityButtons();
    
    // Thiết lập nút thêm vào giỏ hàng
    setupAddToCartButton();
}

// Hàm thiết lập các nút thay đổi số lượng
function setupQuantityButtons() {
    const decreaseBtn = document.querySelector('.quantity-selector .quantity-btn:first-child');
    const increaseBtn = document.querySelector('.quantity-selector .quantity-btn:last-child');
    const quantityInput = document.querySelector('.quantity-input');
    
    // Xóa bỏ tất cả event listener hiện có (nếu có)
    decreaseBtn.replaceWith(decreaseBtn.cloneNode(true));
    increaseBtn.replaceWith(increaseBtn.cloneNode(true));
    
    // Lấy lại các phần tử sau khi clone
    const newDecreaseBtn = document.querySelector('.quantity-selector .quantity-btn:first-child');
    const newIncreaseBtn = document.querySelector('.quantity-selector .quantity-btn:last-child');
    
    // Thêm event listener mới
    newDecreaseBtn.addEventListener('click', function() {
        decreaseQuantity();
    });
    
    newIncreaseBtn.addEventListener('click', function() {
        increaseQuantity();
    });
}

// Hàm thiết lập nút thêm vào giỏ hàng
function setupAddToCartButton() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const buyNowBtn = document.querySelector('.buy-now-btn');
    
    // Xóa bỏ tất cả event listener hiện có (nếu có)
    addToCartBtn.replaceWith(addToCartBtn.cloneNode(true));
    buyNowBtn.replaceWith(buyNowBtn.cloneNode(true));
    
    // Lấy lại các phần tử sau khi clone
    const newAddToCartBtn = document.querySelector('.add-to-cart-btn');
    const newBuyNowBtn = document.querySelector('.buy-now-btn');
    
    // Thêm event listener mới
    newAddToCartBtn.addEventListener('click', function() {
        addToCartFromDetail();
    });
    
    newBuyNowBtn.addEventListener('click', function() {
        addToCartFromDetail();
        // Chuyển hướng đến trang giỏ hàng
        window.location.href = 'Cart.html';
    });
}


// Các hàm thay đổi số lượng
function increaseQuantity() {
    const quantityInput = document.querySelector('.quantity-input');
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
}

function decreaseQuantity() {
    const quantityInput = document.querySelector('.quantity-input');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}

// Hàm thêm sản phẩm vào giỏ hàng từ trang chi tiết
function addToCartFromDetail() {
    const quantity = parseInt(document.querySelector('.quantity-input').value);
    
    if (productData && productData.id) {
        // Lấy giỏ hàng hiện tại hoặc khởi tạo giỏ hàng rỗng
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Lấy biến thể đã chọn nếu có
        const selectedVariant = document.querySelector('.variant-option.active')?.textContent || 'Mặc định';
        
        const product = {
            id: productData.id,
            name: productData.name,
            price: productData.price,
            image: productData.image,
            quantity: quantity,
            variant: selectedVariant
        };

        // Kiểm tra xem sản phẩm đã có trong giỏ với biến thể giống nhau chưa
        const existingProductIndex = cart.findIndex(item => 
            item.id === product.id && item.variant === product.variant);

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã có, tăng số lượng lên
            cart[existingProductIndex].quantity += quantity;
        } else {
            // Nếu chưa, thêm sản phẩm mới vào giỏ
            cart.push(product);
        }

        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Cập nhật số lượng giỏ hàng
        updateCartCount();

        // Hiển thị thông báo xác nhận
        alert(`${product.name} đã được thêm vào giỏ hàng!`);
    } else {
        alert('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.');
    }
}

// Hàm cập nhật số lượng giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Tính tổng số sản phẩm trong giỏ
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    
    // Tìm tất cả các liên kết giỏ hàng (nếu có nhiều liên kết trên header/menu)
    const cartLinks = document.querySelectorAll('a[href*="cart"], a[href*="gio-hang"]');
    
    cartLinks.forEach(link => {
        //Kiểm tra nếu liên kết có chứa số lượng trong ngoặc
        if (link.textContent.includes('(')) {
            // Thay thế số lượng cũ
            link.textContent = link.textContent.replace(/\(\d+\)/, `(${totalItems})`);
        } else {
            // Thêm số lượng vào cuối văn bản
            link.textContent = `${link.textContent} (${totalItems})`;
        }
    });
}