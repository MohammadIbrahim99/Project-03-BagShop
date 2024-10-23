/////notif

const notif = document.querySelector("#notif");

document.querySelector("#submit-register").onclick = (e) => {
  notif.classList.toggle("active");
};

document.querySelector("#close-notif").onclick = (e) => {
  notif.classList.remove("active");
};

// ketika cart di klik lalu muncul keranjang
const cart = document.querySelector(".keranjang");

document.querySelector(".cart-button").onclick = (e) => {
  cart.classList.toggle("active");
  bb.classList.toggle("blur");
};

document.querySelector(".back-close").onclick = (e) => {
  cart.classList.remove("active");
  bb.classList.remove("blur");
};
