const productsContainer = document.querySelector(".product-section");
const cartContainer = document.querySelector(".cart-products");
const cartMenu = document.querySelector(".cart-container");
const cartIcon = document.querySelector(".cart");
const body = document.querySelector("body");
const background = document.querySelector(".background"),
  buyButton = document.querySelector(".buy-button");

cartIcon.addEventListener("click", function () {
  if (!cartMenu.classList.contains("show-cart")) {
    cartMenu.classList.add("show-cart");
    body.style.overflow = "hidden";
    background.style.display = "block";
  }
});

background.addEventListener("click", function (e) {
  cartMenu.classList.remove("show-cart");
  body.style.overflow = "auto";
  background.style.display = "none";
});

// PRODUCTOS //

let products = [
  {
    name: "Campera hidrofobica",
    price: 700,
    stock: 30,
    id: 1,
    img: "./public/img/camperaHidrofobica.png",
  },
  {
    name: "Botas de nieve",
    price: 500,
    stock: 20,
    id: 2,
    img: "./public/img/botaDeNieve.png",
  },
  {
    name: "Pantalon térmico",
    price: 250,
    stock: 15,
    id: 3,
    img: "./public/img/pantalonTérmico.png",
  },
  {
    name: "Carpa para montaña",
    price: 1500,
    stock: 8,
    id: 4,
    img: "./public/img/Carpa.png",
  },
  {
    name: "Medias térmicas para nieve",
    price: 45,
    stock: 300,
    id: 5,
    img: "./public/img/Mediastermicas.png"
  },
  {
    name: "Gorro de lana",
    price: 150,
    stock: 200,
    id: 6,
    img: "./public/img/GorroDeLana.png",
  },
];

let shoppingCart = [];

document.addEventListener("DOMContentLoaded", () => {
  writeProducts();
  console.log("hola");
});

function writeProducts() {
  products.forEach((product) => {
    productsContainer.innerHTML += `<div class="product-card">
    <p class="product-name">${product.name}</p>
    <img
      class="card-img"
      src=${product.img}
    />
    <div class="product-info">
      <p>Precio: $${product.price}</p>
      <p>En stock: ${product.stock}</p>
    </div>
    <button type="button" class="add-item" onclick="addProduct(${product.id})">Agregar</button>
  </div>`;
  });
}

function addProduct(id) {
  let selectedProduct = products.find((product) => id === product.id);
  if (shoppingCart.some((product) => product.id === id)) {
    let i = shoppingCart.findIndex((product) => product.id === id);
    shoppingCart[i].quantity++;
  } else {
    selectedProduct.quantity = 1;
    shoppingCart.push(selectedProduct);
  }
  writeCart();
  if(shoppingCart.length !== 0) {
    buyButton.style.display = "flex"
  }
  console.log(selectedProduct);
  console.log(shoppingCart);
}

function writeCart() {
  let totalPrice = 0
  cartContainer.innerHTML = "";
  shoppingCart.forEach((product) => {
  totalPrice += product.price * product.quantity
    cartContainer.innerHTML += ` 
    <div class="product-cart">
    <img
      class="cart-img"
      src=${product.img}
    />
    <div class="cart-info">
    <p class="product-name-cart">${product.name}</p>
    <small>Precio: $${product.price * product.quantity}</small>
    </div>
    <div class="product-quantity">
    <p>${product.quantity}</p>    
    </div>
    <button onclick="deleteProduct(${product.id})">X</button>
  </div>`;
  });
      if(shoppingCart.length !== 0) {
        cartContainer.innerHTML += `El total es: $${totalPrice} `
}}

function deleteProduct(id) {
  shoppingCart = shoppingCart.filter((product) => id !== product.id);
  writeCart();
  if(shoppingCart.length === 0) {
    buyButton.style.display = "none"
  }
}
