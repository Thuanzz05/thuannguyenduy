// Lấy các phần tử
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const goToRegisterButton = document.getElementById('go-to-register'); // Nút Đăng Ký trên thanh điều hướng

// Kiểm tra URL khi trang tải để xác định nên hiển thị tab nào
document.addEventListener('DOMContentLoaded', function() {
    // Nếu URL có chứa #register, hiển thị tab đăng ký
    if (window.location.hash === '#register') {
        activateRegisterTab();
    }
});

// Hàm kích hoạt tab đăng ký
function activateRegisterTab() {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
}

// Hàm kích hoạt tab đăng nhập
function activateLoginTab() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
}

// Thêm sự kiện click cho tab đăng nhập
loginTab.addEventListener('click', function() {
    activateLoginTab();
    // Cập nhật URL nếu muốn
    history.pushState(null, null, 'login-register.html#login');
});

// Thêm sự kiện click cho tab đăng ký
registerTab.addEventListener('click', function() {
    activateRegisterTab();
    // Cập nhật URL
    history.pushState(null, null, 'login-register.html#register');
});

// Xử lý sự kiện click cho nút đăng ký trên thanh điều hướng
if (goToRegisterButton) {
    goToRegisterButton.addEventListener('click', function(e) {
        // Không cần ngăn mặc định vì ta muốn chuyển đến trang login-register.html#register
        // e.preventDefault();
        // URL sẽ được xử lý khi trang tải qua đoạn code trên
    });
}

// Xử lý sự kiện submit form đăng nhập
loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn form submit
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Logic đăng nhập (ở đây bạn có thể thêm mã kiểm tra đăng nhập thật sự)
    console.log('Đăng nhập với:', email, password);
    
    // Điều hướng đến trang chủ sau khi đăng nhập thành công
    window.location.href = "index.html"; // Đổi "index.html" thành trang chủ của bạn
    alert('Đăng nhập thành công!');
});

// Xử lý sự kiện submit form đăng ký
registerForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn form submit
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    // Kiểm tra mật khẩu khớp
    if (password !== confirm) {
        alert('Mật khẩu không khớp!');
        return;
    }
    
    // Logic đăng ký (ở đây bạn có thể thêm mã để lưu dữ liệu người dùng)
    console.log('Đăng ký với:', name, email, password);
    alert('Đăng ký thành công!');
});