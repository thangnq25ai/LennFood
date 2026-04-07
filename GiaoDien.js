// ===== TÌM KIẾM MÓN ĂN =====
function searchFoodManual() {
    console.log("🔍 Đang tìm kiếm...");
    
    let searchInput = document.querySelector('.search-box input');
    if (!searchInput) {
        searchInput = document.getElementById('searchInput');
    }
    
    if (!searchInput) {
        alert("Không tìm thấy ô tìm kiếm!");
        return;
    }
    
    const keyword = searchInput.value.toLowerCase().trim();
    const allFoodCards = document.querySelectorAll('.food-card');
    
    // Xóa thông báo cũ
    const oldNotify = document.querySelector('.search-notify');
    if (oldNotify) oldNotify.remove();
    
    if (keyword === '') {
        allFoodCards.forEach(card => card.style.display = '');
        return;
    }
    
    let hasResult = false;
    
    allFoodCards.forEach(card => {
        const foodName = card.querySelector('h4').innerText.toLowerCase();
        if (foodName.includes(keyword)) {
            card.style.display = '';
            hasResult = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (!hasResult) {
        const menuSectionEl = document.querySelector('.menu-section');
        if (menuSectionEl) {
            const notify = document.createElement('div');
            notify.className = 'search-notify';
            notify.innerHTML = '<div style="text-align:center;padding:40px;color:#ff6b6b;font-size:18px;">🔍 Không tìm thấy món "' + keyword + '"</div>';
            menuSectionEl.appendChild(notify);
        }
    }
}

// ===== DOMContentLoaded =====
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // 1. MENU HIỂN THỊ / ẨN
    // =========================
    const btnMenu = document.getElementById("btnMenu");
    const menuSection = document.getElementById("menuSection");
    const aboutSection = document.getElementById("aboutSection");
    let isMenuOpen = false;

    if (btnMenu && menuSection) {
        btnMenu.addEventListener("click", function (e) {
            e.preventDefault();
            isMenuOpen = !isMenuOpen;
            menuSection.style.display = isMenuOpen ? "block" : "none";
            if (aboutSection) aboutSection.style.display = "none";
            if (isMenuOpen) menuSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    // =========================
    // 2. GIỚI THIỆU
    // =========================
    if (aboutSection) aboutSection.style.display = "none";

    const aboutLink = document.getElementById("about-content");
    if (aboutLink && aboutSection && menuSection) {
        aboutLink.addEventListener("click", function (e) {
            e.preventDefault();
            menuSection.style.display = "none";
            aboutSection.style.display = "flex";
            aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    // Nút Trang chủ
    const homeLink = document.getElementById("homeLink");
    if (homeLink && menuSection && aboutSection) {
        homeLink.addEventListener("click", function (e) {
            e.preventDefault();
            menuSection.style.display = "block";
            aboutSection.style.display = "none";
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Nút Khám phá thực đơn trong About
    const exploreBtn = document.getElementById("exploreMenuBtn");
    if (exploreBtn && menuSection && aboutSection) {
        exploreBtn.addEventListener("click", function () {
            menuSection.style.display = "block";
            aboutSection.style.display = "none";
            menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    // Nút ĐẶT MÓN NGAY
    document.querySelectorAll(".btn-scroll").forEach(btn => {
        btn.addEventListener("click", function () {
            if (menuSection) {
                menuSection.style.display = "block";
                if (aboutSection) aboutSection.style.display = "none";
                menuSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // =========================
    // 3. LIÊN HỆ - CUỘN XUỐNG FOOTER
    // =========================
    const contactLink = document.getElementById("contactLink");
    if (contactLink) {
        contactLink.addEventListener("click", function (e) {
            e.preventDefault();
            const footer = document.getElementById("footerContact");
            if (footer) {
                footer.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    // =========================
    // 4. GIỎ HÀNG - SLIDE BÊN PHẢI
    // =========================
    let cart = [];
    let total = 0;

    const cartIcon = document.getElementById("cartIcon");
    const cartPanel = document.getElementById("cartPanel");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartCountSpan = document.getElementById("cart-count");
    const cartTotalSpan = document.getElementById("cart-total");
    const cartItemsUl = document.getElementById("cart-items");

    function openCart() {
        if (cartPanel) cartPanel.classList.add("open");
        if (cartOverlay) cartOverlay.classList.add("show");
    }

    function closeCart() {
        if (cartPanel) cartPanel.classList.remove("open");
        if (cartOverlay) cartOverlay.classList.remove("show");
    }

    if (cartIcon) {
        cartIcon.addEventListener("click", function (e) {
            e.stopPropagation();
            openCart();
        });
    }

    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
    if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && cartPanel && cartPanel.classList.contains("open")) {
            closeCart();
        }
    });

    // =========================
    // 5. THÊM MÓN VÀO GIỎ
    // =========================
    const addButtons = document.querySelectorAll(".add-to-cart-btn");
    addButtons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".food-card");
            const name = card.querySelector("h4").innerText;
            const select = card.querySelector("select");

            // Trường hợp có select "Chọn size"
            if (select && select.options.length > 0 && select.options[0]?.text.includes("Chọn size")) {
                if (!select.value || select.selectedIndex === 0) {
                    alert("🥤 Vui lòng chọn size!");
                    return;
                }
                const sizePrice = parseInt(select.value);
                const sizeText = select.options[select.selectedIndex].text;
                addToCart(`${name} (${sizeText})`, sizePrice);
            }
            // Trường hợp có select "Chọn cấp độ cay"
            else if (select && select.options.length > 0 && select.options[0]?.text.includes("Cấp độ cay")) {
                if (select.selectedIndex === 0) {
                    alert("🌶 Vui lòng chọn cấp độ cay!");
                    return;
                }
                const priceText = card.querySelector(".price")?.innerText;
                const price = parseInt(priceText.replace(/\D/g, ""));
                const level = select.value;
                addToCart(`${name} (Cay ${level})`, price);
            }
            // Món bình thường
            else {
                const priceText = card.querySelector(".price")?.innerText;
                if (priceText) {
                    const price = parseInt(priceText.replace(/\D/g, ""));
                    addToCart(name, price);
                } else {
                    alert("❌ Không xác định được giá món!");
                }
            }
        });
    });

    function addToCart(name, price) {
        cart.push({ name, price });
        total += price;
        if (cartCountSpan) cartCountSpan.innerText = cart.length;
        if (cartTotalSpan) cartTotalSpan.innerText = total.toLocaleString();
        renderCart();
    }

    function renderCart() {
        if (!cartItemsUl) return;
        cartItemsUl.innerHTML = "";
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price.toLocaleString()}đ</span>
                <button class="remove-item" data-index="${index}">❌</button>
            `;
            cartItemsUl.appendChild(li);
        });

        document.querySelectorAll(".remove-item").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = parseInt(btn.dataset.index);
                total -= cart[index].price;
                cart.splice(index, 1);
                if (cartCountSpan) cartCountSpan.innerText = cart.length;
                if (cartTotalSpan) cartTotalSpan.innerText = total.toLocaleString();
                renderCart();
            });
        });
    }

    // =========================
    // 6. THANH TOÁN
    // =========================
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            const name = document.getElementById("customer-name")?.value.trim();
            const phone = document.getElementById("customer-phone")?.value.trim();
            const address = document.getElementById("customer-address")?.value.trim();

            if (cart.length === 0) {
                alert("🛒 Giỏ hàng đang trống!");
                return;
            }
            if (!name || !phone || !address) {
                alert("❗ Vui lòng nhập đầy đủ thông tin!");
                return;
            }
            document.getElementById("paymentModal").style.display = "block";
        });
    }

    // =========================
    // 7. FOOTER CUỘN ĐẾN CATEGORY
    // =========================
    function scrollToCategory(categoryId) {
        if (menuSection) menuSection.style.display = "block";
        if (aboutSection) aboutSection.style.display = "none";
        const category = document.getElementById(categoryId);
        if (category) setTimeout(() => category.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }

    const linkMiCay = document.getElementById("link-mi-cay");
    const linkMonAnKem = document.getElementById("link-mon-an-kem");
    const linkBanhTrang = document.getElementById("link-banh-trang");
    const linkNuocUong = document.getElementById("link-nuoc-uong");

    if (linkMiCay) linkMiCay.addEventListener("click", (e) => { e.preventDefault(); scrollToCategory("mi-cay"); });
    if (linkMonAnKem) linkMonAnKem.addEventListener("click", (e) => { e.preventDefault(); scrollToCategory("mon-an-kem"); });
    if (linkBanhTrang) linkBanhTrang.addEventListener("click", (e) => { e.preventDefault(); scrollToCategory("banh-trang"); });
    if (linkNuocUong) linkNuocUong.addEventListener("click", (e) => { e.preventDefault(); scrollToCategory("nuoc-uong"); });

    const footerAbout = document.getElementById("footerAbout");
    if (footerAbout && aboutSection && menuSection) {
        footerAbout.addEventListener("click", function (e) {
            e.preventDefault();
            menuSection.style.display = "none";
            aboutSection.style.display = "flex";
            aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    // =========================
    // 8. TÌM KIẾM - SỰ KIỆN CHO Ô INPUT VÀ NÚT
    // =========================
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    
    if (searchInput) {
        // Sự kiện khi gõ phím Enter
        searchInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                searchFoodManual();
            }
        });
    }
    
    if (searchBtn) {
        // Sự kiện khi bấm nút tìm kiếm 🔍
        searchBtn.addEventListener("click", function(e) {
            e.preventDefault();
            searchFoodManual();
        });
    }

    // =========================
    // 9. ĐĂNG NHẬP MODAL
    // =========================
    const loginBtn = document.getElementById("loginBtn");
    const authModal = document.getElementById("authModal");
    const closeAuthBtn = document.getElementById("closeAuthBtn");
    const tabLoginBtn = document.getElementById("tabLoginBtn");
    const tabRegisterBtn = document.getElementById("tabRegisterBtn");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginBtn && authModal) {
        loginBtn.addEventListener("click", function() {
            authModal.style.display = "flex";
        });
    }

    if (closeAuthBtn && authModal) {
        closeAuthBtn.addEventListener("click", function() {
            authModal.style.display = "none";
        });
    }

    if (tabLoginBtn && tabRegisterBtn && loginForm && registerForm) {
        tabLoginBtn.addEventListener("click", function() {
            loginForm.classList.remove("hidden");
            registerForm.classList.add("hidden");
            tabLoginBtn.classList.add("active");
            tabRegisterBtn.classList.remove("active");
        });
        
        tabRegisterBtn.addEventListener("click", function() {
            registerForm.classList.remove("hidden");
            loginForm.classList.add("hidden");
            tabRegisterBtn.classList.add("active");
            tabLoginBtn.classList.remove("active");
        });
    }

    // Click outside để đóng modal
    if (authModal) {
        authModal.addEventListener("click", function(e) {
            if (e.target === authModal) {
                authModal.style.display = "none";
            }
        });
    }

    // =========================
    // 10. THANH TOÁN MODAL
    // =========================
    const paymentModal = document.getElementById("paymentModal");
    const closePaymentBtn = document.getElementById("closePaymentBtn");
    const payCODBtn = document.getElementById("payCODBtn");
    const payQRBtn = document.getElementById("payQRBtn");
    const qrModal = document.getElementById("qrModal");
    const closeQRBtn = document.getElementById("closeQRBtn");

    if (closePaymentBtn && paymentModal) {
        closePaymentBtn.addEventListener("click", function() {
            paymentModal.style.display = "none";
        });
    }

    if (payCODBtn) {
        payCODBtn.addEventListener("click", function() {
            alert("🎉 Đặt hàng thành công!\nThanh toán khi nhận hàng.");
            location.reload();
        });
    }

    if (payQRBtn) {
        payQRBtn.addEventListener("click", function() {
            const totalSpan = document.getElementById("cart-total");
            const total = totalSpan ? totalSpan.innerText.replace(/\D/g, "") : "0";
            const qrUrl = `https://img.vietqr.io/image/VBA-5005205237750-compact2.png?amount=${total}&addInfo=ThanhToanLenFood`;
            const qrImage = document.getElementById("qrImage");
            if (qrImage) qrImage.src = qrUrl;
            if (paymentModal) paymentModal.style.display = "none";
            if (qrModal) qrModal.style.display = "flex";
        });
    }

    if (closeQRBtn && qrModal) {
        closeQRBtn.addEventListener("click", function() {
            qrModal.style.display = "none";
        });
    }

    if (qrModal) {
        qrModal.addEventListener("click", function(e) {
            if (e.target === qrModal) {
                qrModal.style.display = "none";
            }
        });
    }

    if (paymentModal) {
        paymentModal.addEventListener("click", function(e) {
            if (e.target === paymentModal) {
                paymentModal.style.display = "none";
            }
        });
    }

    // =========================
    // 11. MENU MOBILE
    // =========================
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const navbar = document.querySelector(".navbar");
    
    if (menuToggleBtn && navbar) {
        menuToggleBtn.addEventListener("click", function() {
            navbar.classList.toggle("show");
        });
    }

    // Đóng menu khi click ra ngoài
    document.addEventListener("click", function(e) {
        if (navbar && menuToggleBtn && !navbar.contains(e.target) && !menuToggleBtn.contains(e.target)) {
            navbar.classList.remove("show");
        }
    });

    // =========================
    // 12. BOTTOM NAV (MOBILE)
    // =========================
    const bottomNavItems = document.querySelectorAll(".bottom-nav-item");
    
    bottomNavItems.forEach(item => {
        item.addEventListener("click", function(e) {
            const section = this.getAttribute("data-section");
            
            bottomNavItems.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
            
            if (section === "home") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else if (section === "menu") {
                if (menuSection) {
                    menuSection.style.display = "block";
                    if (aboutSection) aboutSection.style.display = "none";
                    menuSection.scrollIntoView({ behavior: "smooth" });
                }
            } else if (section === "about") {
                if (aboutSection) {
                    aboutSection.style.display = "flex";
                    if (menuSection) menuSection.style.display = "none";
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                }
            } else if (section === "contact") {
                const footer = document.getElementById("footerContact");
                if (footer) footer.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});

console.log("✅ GiaoDien.js đã tải thành công!");