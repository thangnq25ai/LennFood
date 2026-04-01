document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // MENU HIỂN THỊ / ẨN
  // =========================
  const btnMenu = document.getElementById("btnMenu");
  const menuSection = document.getElementById("menuSection");
  let isMenuOpen = false;

  if (btnMenu && menuSection) {
    btnMenu.addEventListener("click", function (e) {
      e.preventDefault();
      isMenuOpen = !isMenuOpen;

      menuSection.style.display = isMenuOpen ? "block" : "none";

      if (isMenuOpen) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // =========================
  // NÚT KHÁM PHÁ THỰC ĐƠN
  // =========================
  const btnScroll = document.getElementById("btnScroll");

  if (btnScroll && menuSection) {
    btnScroll.addEventListener("click", function () {
      menuSection.style.display = "block";
      menuSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }
document.querySelectorAll(".btn-scroll").forEach(btn => {
  btn.onclick = function() {
    document.getElementById("menuSection").style.display = "block";

    document.getElementById("menuSection").scrollIntoView({
      behavior: "smooth"
    });
  }
});



  // =========================
  // GIỎ HÀNG
  // =========================
  let cart = [];
  let total = 0;

  // Toggle giỏ hàng
window.toggleCart = function () {
  document.getElementById("cartPanel").classList.toggle("show");
};

  // =========================
  // THÊM MÓN VÀO GIỎ
  // =========================
  const buttons = document.querySelectorAll(".food-card button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {

      const card = button.closest(".food-card");
      const name = card.querySelector("h4").innerText;

      const priceText = card.querySelector(".price").innerText;
      const price = parseInt(priceText.replace(/\D/g, ""));

      const select = card.querySelector("select");

      // Nếu món có chọn cấp độ cay
      if (select) {
        if (select.selectedIndex === 0) {
          alert("🌶 Vui lòng chọn cấp độ cay!");
          return;
        }
        const level = select.value;
        addToCart(`${name} (Cay ${level})`, price);
      } else {
        addToCart(name, price);
      }
    });
  });

  // =========================
  // HÀM THÊM GIỎ
  // =========================
  function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("cart-total").innerText = total.toLocaleString();

    renderCart();
  }

  // =========================
  // HIỂN THỊ DANH SÁCH GIỎ
  // =========================
  function renderCart() {
    const list = document.getElementById("cart-items");
    list.innerHTML = "";

    cart.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price.toLocaleString()}đ</span>
      `;
      list.appendChild(li);
    });
  }

  // =========================
  // THANH TOÁN
  // =========================
  const checkoutBtn = document.querySelector(".checkout");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {

      const name = document.getElementById("customer-name").value.trim();
      const phone = document.getElementById("customer-phone").value.trim();
      const address = document.getElementById("customer-address").value.trim();

      if (cart.length === 0) {
        alert("🛒 Giỏ hàng đang trống!");
        return;
      }

      if (!name || !phone || !address) {
        alert("❗ Vui lòng nhập đầy đủ thông tin");
        return;
      }

      // Hiện popup thanh toán
      document.getElementById("paymentModal").style.display = "block";
    });
  }

}); // END DOMContentLoaded


// =========================
// ĐÓNG POPUP THANH TOÁN
// =========================
function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
}

// =========================
// THANH TOÁN COD
// =========================
function payCOD() {
  alert("🎉 Đặt hàng thành công!\nThanh toán khi nhận hàng.");
  closePayment();
}

// =========================
// THANH TOÁN QR
// =========================
function payQR() {
  const qrUrl = `
   https://img.vietqr.io/image/VBA-5005205237750-compact2.png
  ?amount=${total}
  &addInfo=ThanhToanLenFood
  `;

  document.getElementById("qrImage").src = qrUrl;
  document.getElementById("qrModal").style.display = "flex";
}
function showQR() {
  const qrUrl = `
  https://img.vietqr.io/image/VBA-5005205237750-compact2.png
  ?amount=${total}
  &addInfo=ThanhToanLenFood
  `;

  document.getElementById("qrImage").src = qrUrl;
  document.getElementById("paymentModal").style.display = "block";
}
function closeQR() {
  document.getElementById("qrModal").style.display = "none";
}
let total = 20000; // test

window.payQR = function () {

  const total = document
    .getElementById("cart-total")
    .innerText.replace(/\D/g, "");

  const qrUrl =
    `https://img.vietqr.io/image/VBA-5005205237750-compact2.png?amount=${total}&addInfo=ThanhToanLenFood`;

  document.getElementById("qrImage").src = qrUrl;

  document.getElementById("paymentModal").style.display = "none";
  document.getElementById("qrModal").style.display = "flex";
};

window.closeQR = function () {
  document.getElementById("qrModal").style.display = "none";
};
document.querySelectorAll(".size-select").forEach(select => {
  select.addEventListener("change", function () {

    const price = parseInt(this.value);

    const card = this.closest(".food-card");

    const priceBox = card.querySelector(".price-display");

    priceBox.innerText = "Giá: " + price.toLocaleString() + "đ";
  });
});
