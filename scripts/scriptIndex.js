// --SLIDESHOW--
var n = 5;
var i = 1;

function next(){
    if(i==n)
        i = 1;
    else
        i++;
    
    document.getElementById("slide").setAttribute("src","images/slide_"+i+".png")
}

function back(){
    if(i==1)
        i = n;
    else
        i--;
    
    document.getElementById("slide").setAttribute("src","images/slide_"+i+".png")
}

function autoPlay(){
    setInterval(next,3000);
}

// --BACK TO TOP--
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#backtop').fadeIn();
        } else {
            $('#backtop').fadeOut();
        }
    });

    $('#backtop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
});


// Phát hiện sự kiện cuộn trang
window.onscroll = function() {
    // Lấy vị trí cuộn của trang
    const header = document.getElementById('header-bot');
    const sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
        // Nếu trang cuộn xuống, thêm lớp 'fixed' vào thanh menu
        header.classList.add('fixed');
    } else {
        // Nếu không cuộn xuống, bỏ lớp 'fixed'
        header.classList.remove('fixed');
    }
};




// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    // Lấy giỏ hàng hiện tại từ localStorage hoặc khởi tạo giỏ hàng rỗng nếu không có
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã có, tăng số lượng sản phẩm lên 1
        cart[existingProductIndex].quantity++;
    } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm vào giỏ hàng
        cart.push(product);
    }

    // Lưu lại giỏ hàng đã thay đổi vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Cập nhật lại số lượng giỏ hàng hiển thị trên giao diện
    updateCartCount();

    // Hiển thị thông báo xác nhận sản phẩm đã được thêm vào giỏ hàng
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
}

// Hàm cập nhật số lượng giỏ hàng hiển thị
function updateCartCount() {
    // Lấy giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Tính tổng số sản phẩm trong giỏ hàng
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    
    // Tìm liên kết giỏ hàng bằng ID
    const cartLink = document.getElementById('cart-link');
    
    // Cập nhật nội dung văn bản của liên kết giỏ hàng
    if (cartLink) {
        // Kiểm tra xem văn bản của liên kết có chứa số lượng sản phẩm trong ngoặc hay chưa
        if (cartLink.textContent.includes('(')) {
            // Nếu có, thay thế số lượng cũ bằng số lượng mới
            cartLink.textContent = cartLink.textContent.replace(/\(\d+\)/, `(${totalItems})`);
        } else {
            // Nếu chưa có, thêm số lượng vào cuối chữ "Giỏ hàng"
            cartLink.innerHTML = `${cartLink.innerHTML} (${totalItems})`;
        }
    }
}




// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Add responsive features for main menu
    const menuContainer = document.querySelector('#menu .container');
    if (menuContainer) {
        // Create menu toggle button
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i> Menu chính';
        
        // Insert menu toggle before the menu container
        const headerBot = document.getElementById('header-bot');
        if (headerBot) {
            headerBot.insertBefore(menuToggle, headerBot.firstChild);
        }
        
        // Toggle menu visibility on mobile
        menuToggle.addEventListener('click', function() {
            menuContainer.classList.toggle('menu-active');
            const icon = this.querySelector('i');
            if (menuContainer.classList.contains('menu-active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Add responsive features for sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        // Create sidebar category toggle button
        const sidebarToggle = document.createElement('div');
        sidebarToggle.className = 'sidebar-toggle';
        sidebarToggle.innerHTML = '<i class="fas fa-th-list"></i> Danh mục sản phẩm';
        
        // Insert sidebar toggle before the sidebar
        if (sidebar.parentNode) {
            sidebar.parentNode.insertBefore(sidebarToggle, sidebar);
        }
        
        // Toggle sidebar visibility on mobile
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-active');
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('sidebar-active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-th-list';
            }
        });
    }
    
    // Handle dropdown menus for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        // Prevent default action on mobile
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentNode.classList.toggle('dropdown-active');
                
                // Toggle the icon
                const icon = this.querySelector('i');
                if (this.parentNode.classList.contains('dropdown-active')) {
                    icon.className = 'fas fa-angle-up';
                } else {
                    icon.className = 'fas fa-angle-down';
                }
            }
        });
    });
});



