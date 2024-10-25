//hamburger dan close

const menu = document.querySelector(".menu-hamburger");
document.querySelector(".hamburger").onclick = (e) => {
  menu.classList.toggle("active");
};
document.querySelector("#close").onclick = (e) => {
  menu.classList.remove("active");
};
document.querySelector(".menu-hamburger").onclick = (e) => {
  menu.classList.remove("active");
};

//detail produk
const dp = document.querySelector(".details-produk");
const bb = document.querySelector(".fillter");

// Tombol untuk menutup detail produk
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#close-detail").onclick = (e) => {
    dp.classList.remove("active");
    bb.classList.remove("blur");
  };
});

// Tambahkan barang ke keranjang dengan validasi size dan quantity
let cartCount = 0;
const addToCartButton = document.querySelectorAll(".button-detail");

addToCartButton.forEach((button) => {
  button.addEventListener("click", function () {
    const size = document.getElementById("size").value;
    const quantity = document.getElementById("number").value;

    // Mengambil elemen peringatan
    const sizeWarning = document.getElementById("size-warning");
    const quantityWarning = document.getElementById("quantity-warning");

    // Mengatur ulang tampilan peringatan
    sizeWarning.style.display = "none";
    quantityWarning.style.display = "none";

    let isValid = true;

    // Validasi apakah ukuran sudah dipilih (pastikan size tidak memiliki value kosong)
    if (size === "") {
      sizeWarning.style.display = "block"; // Tampilkan peringatan jika ukuran belum dipilih
      isValid = false;
    }

    // Validasi apakah jumlah valid
    if (!quantity || quantity <= 0) {
      quantityWarning.style.display = "block"; // Tampilkan peringatan jika jumlah tidak valid
      isValid = false;
    }

    // Toggle hanya aktif jika validasi lolos
    if (isValid) {
      cartCount += parseInt(quantity); // Tambahkan sesuai jumlah yang dipilih
      document.getElementById("cart-barang").innerText = cartCount;

      // Hapus class active dan blur jika validasi berhasil
      dp.classList.remove("active");
      bb.classList.remove("blur");
      // Aktifkan toggle untuk details-produk dan blur
      // dp.classList.add("active");
      // bb.classList.add("blur");
    }
    //  else {
    //   // Matikan toggle jika validasi gagal
    //   dp.classList.remove("active");
    //   bb.classList.remove("blur");
    // }
  });
});

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

//Produk//
document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { name: "Produk 1", price: 120000, image: "image/bag-01.jpg" },
    { name: "Produk 2", price: 110000, image: "image/bag-02.jpg" },
    { name: "Produk 3", price: 130000, image: "image/bag-03.jpg" },
    { name: "Produk 4", price: 130000, image: "image/bag-04.jpg" },
    { name: "Produk 5", price: 130000, image: "image/bag-05.jpg" },
    { name: "Produk 6", price: 130000, image: "image/bag-06.jpg" },
    { name: "Produk 7", price: 130000, image: "image/bag-07.jpg" },
    { name: "Produk 8", price: 130000, image: "image/bag-08.jpg" },
  ];

  const productList = document.getElementById("container-produk");

  products.forEach((product, index) => {
    const sku = String(index + 1).padStart(3, "0");
    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(product.price);

    const productCard = document.createElement("div");
    productCard.classList.add("tamplate-produk");
    productCard.id = "tamplate-produk";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h1>${product.name}</h1>
      <p>Harga: ${formattedPrice}</p>
      <button class="add-to-cart" data-sku="${sku}">Buy</button>
    `;
    productList.appendChild(productCard);

    productCard.querySelector(".add-to-cart").addEventListener("click", () => {
      updateDetail(product, formattedPrice, sku);
    });
  });

  document.querySelector("#close-detail").onclick = () => {
    dp.classList.remove("active");
    bb.classList.remove("blur");
    document.querySelector(".detail-produk p.sku").style.display = "none";
  };

  document.querySelector(".button-detail").addEventListener("click", () => {
    const size = document.getElementById("size").value;
    const quantity = document.getElementById("number").value;

    if (validateInput(size, quantity)) {
      const productName = document.querySelector(".detail-produk h1").innerText;
      const productPrice =
        document.querySelector(".detail-produk h4").innerText;
      const productImage = document.querySelector(".image-detail img").src;

      addToCart(productName, productPrice, productImage, size, quantity);
      dp.classList.remove("active");
      bb.classList.remove("blur");
    }
  });

  function updateDetail(product, formattedPrice, sku) {
    dp.classList.add("active");
    bb.classList.add("blur");
    document.querySelector(".detail-produk h1").innerText = product.name;
    document.querySelector(".detail-produk h4").innerText = formattedPrice;
    document.querySelector(".detail-produk p.sku").innerText = `SKU: ${sku}`;
    document.querySelector(".detail-produk p.sku").style.display = "block";
    document.querySelector(".image-detail img").src = product.image;
  }

  function validateInput(size, quantity) {
    let isValid = true;
    document.getElementById("size-warning").style.display = !size
      ? "block"
      : "none";
    document.getElementById("quantity-warning").style.display =
      !quantity || quantity <= 0 ? "block" : "none";
    return isValid && size && quantity > 0;
  }

  function addToCart(productName, productPrice, productImage, size, quantity) {
    const cartContainer = document.querySelector(".keranjang");
    let existingProduct = Array.from(
      cartContainer.querySelectorAll(".produk-cart")
    ).find(
      (item) =>
        item.querySelector("h2").innerText === productName &&
        item.querySelector(".cart-size").innerText === size
    );

    if (existingProduct) {
      updateExistingProduct(existingProduct, productPrice, quantity);
    } else {
      createNewCartItem(
        cartContainer,
        productName,
        productPrice,
        productImage,
        size,
        quantity
      );
    }
  }

  function updateExistingProduct(existingProduct, productPrice, quantity) {
    let currentQuantity = parseInt(
      existingProduct.querySelector(".add-remove span").innerText
    );
    currentQuantity += parseInt(quantity);
    updateCartItem(existingProduct, productPrice, currentQuantity);
  }

  function createNewCartItem(
    cartContainer,
    productName,
    productPrice,
    productImage,
    size,
    quantity
  ) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("produk-cart");
    const formattedTotalPrice = formatPrice(
      parseInt(productPrice.replace(/[Rp,.]/g, "")) * quantity
    );

    cartItem.innerHTML = `
      <img src="${productImage}" alt="${productName}">
      <div class="name-produk">
        <h2>${productName}</h2>
        <p>${productPrice} <span>x${quantity}</span></p>
        <div class="add-remove">
          <button class="remove-item" disabled>&minus;</button>
          <span>${quantity}</span>
          <button class="add-item">&plus;</button>
        </div>
        <span>${formattedTotalPrice}</span>
        <span class="cart-size">${size}</span>
        <span class="buy-cart"><a href="#">Buy</a></span>
      </div>
    `;

    cartContainer.appendChild(cartItem);
    addCartItemEventListeners(cartItem, productPrice);
  }

  function addCartItemEventListeners(cartItem, productPrice) {
    const removeButton = cartItem.querySelector(".remove-item");
    const addButton = cartItem.querySelector(".add-item");

    addButton.addEventListener("click", () => {
      let currentQuantity = incrementQuantity(cartItem);
      updateCartItem(cartItem, productPrice, currentQuantity);
      removeButton.disabled = false;
    });

    removeButton.addEventListener("click", () => {
      let currentQuantity = decrementQuantity(cartItem);
      if (currentQuantity === 0) {
        cartItem.remove();
      } else {
        updateCartItem(cartItem, productPrice, currentQuantity);
        if (currentQuantity === 1) removeButton.disabled = true;
      }
    });
  }

  function incrementQuantity(cartItem) {
    let currentQuantity = parseInt(
      cartItem.querySelector(".add-remove span").innerText
    );
    return ++currentQuantity;
  }

  function decrementQuantity(cartItem) {
    let currentQuantity = parseInt(
      cartItem.querySelector(".add-remove span").innerText
    );
    return --currentQuantity;
  }

  function updateCartItem(cartItem, productPrice, currentQuantity) {
    cartItem.querySelector(".add-remove span").innerText = currentQuantity;
    cartItem.querySelector("p span").innerText = `x${currentQuantity}`;
    const updatedTotalPrice = formatPrice(
      parseInt(productPrice.replace(/[Rp,.]/g, "")) * currentQuantity
    );
    cartItem.querySelector("span:last-of-type").innerText = updatedTotalPrice;
  }

  function formatPrice(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  }
});
