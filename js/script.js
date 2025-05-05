// let cart = [];

// document.querySelectorAll('.product').forEach(product => {
//   // Выбор размера
//   const sizeLinks = product.querySelectorAll('.size a');
//   let selectedSize = null;

//   sizeLinks.forEach(link => {
//     link.addEventListener('click', function (e) {
//       e.preventDefault();
//       sizeLinks.forEach(l => l.classList.remove('selected'));
//       this.classList.add('selected');
//       selectedSize = this.dataset.size;
//     });
//   });

//   product.querySelector('.add-to-cart-btn').addEventListener('click', function () {
//     const name = product.querySelector('.name').textContent;
//     const img = product.querySelector('.product-image').src;
//     const price = product.querySelector('.prise').dataset.price;

//     if (!selectedSize) {
//       alert('Пожалуйста, выберите размер!');
//       return;
//     }

//     const existing = cart.find(item => item.name === name && item.size === selectedSize);
//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       cart.push({ name, size: selectedSize, quantity: 1, image: img, price });
//     }

//     renderCart();
//   });
// });

// function renderCart() {
//   const cartContainer = document.getElementById('cart');
//   cartContainer.innerHTML = '';

//   if (cart.length === 0) {
//     cartContainer.innerHTML = '<p>Корзина пуста</p>';
//     return;
//   }

//   cart.forEach((item, index) => {
//     const div = document.createElement('div');
//     div.className = 'cart-item';

//     div.innerHTML = `
//       <img src="${item.image}" width="60">
//       <strong>${item.name}</strong><br>
//       Цена: ${item.price}$ <br>
//       Размер: 
//       <select onchange="updateSize(${index}, this.value)">
//         ${['XS','S','M','L','XL'].map(s => 
//           `<option value="${s}" ${s === item.size ? 'selected' : ''}>${s}</option>`
//         ).join('')}
//       </select><br>
//       Кол-во: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
//       <button onclick="removeItem(${index})">Удалить</button>
//     `;

//     cartContainer.appendChild(div);
//   });

//   const summary = cart.map(item => 
//     `${item.name} | Размер: ${item.size} | Кол-во: ${item.quantity}`
//   ).join('\n');

//   document.getElementById('orderSummary').value = summary;
// }

// function updateSize(index, size) {
//   cart[index].size = size;
//   renderCart();
// }

// function updateQuantity(index, qty) {
//   cart[index].quantity = parseInt(qty);
//   renderCart();
// }

// function removeItem(index) {
//   cart.splice(index, 1);
//   renderCart();
// }

// renderCart();


let cart = [];

// === Загрузка корзины при старте ===
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }
}

// === Сохранение корзины ===
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelectorAll('.product').forEach(product => {
  // Выбор размера
  const sizeLinks = product.querySelectorAll('.size a');
  let selectedSize = null;

  sizeLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      sizeLinks.forEach(l => l.classList.remove('selected'));
      this.classList.add('selected');
      selectedSize = this.dataset.size;
    });
  });

  product.querySelector('.add-to-cart-btn').addEventListener('click', function () {
    const name = product.querySelector('.name').textContent;
    const img = product.querySelector('img').src; // Исправлено на корректный выбор img
    const price = product.querySelector('.prise').textContent.replace('$', '').trim();

    if (!selectedSize) {
      alert('Please choose a size');
      return;
    }

    const existing = cart.find(item => item.name === name && item.size === selectedSize);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, size: selectedSize, quantity: 1, image: img, price });
    }

    renderCart();
  });
});

function renderCart() {
  const cartContainer = document.getElementById('cart');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Cart is empty</p>';
    saveCart(); // сохраняем даже пустую корзину
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <img src="${item.image}" width="60">
      <strong>${item.name}</strong><br>
      Price: ${item.price}$ <br>
      Size: 
      <select onchange="updateSize(${index}, this.value)">
        ${['XS','S','M','L','XL'].map(s => 
          `<option value="${s}" ${s === item.size ? 'selected' : ''}>${s}</option>`
        ).join('')}
      </select><br>
      Quantity: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
      <button onclick="removeItem(${index})">Delete</button>
    `;

    cartContainer.appendChild(div);
  });

  const summary = cart.map(item => 
    `${item.name} | Размер: ${item.size} | Кол-во: ${item.quantity}`
  ).join('\n');

  const orderSummaryInput = document.getElementById('orderSummary');
  if (orderSummaryInput) {
    orderSummaryInput.value = summary;
  }

  saveCart(); // сохраняем корзину после изменений
}

function updateSize(index, size) {
  cart[index].size = size;
  renderCart();
}

function updateQuantity(index, qty) {
  cart[index].quantity = parseInt(qty);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}


// Кнопка отображения корзины на экране  


const cartIcon = document.getElementById("cart-icon");
const cartSection = document.getElementById("cart-section");
const closeCartBtn = document.getElementById("close-cart");

cartIcon.addEventListener("click", () => {
  const isVisible = cartSection.style.display === "block";
  cartSection.style.display = isVisible ? "none" : "block";
});

closeCartBtn.addEventListener("click", () => {
  cartSection.style.display = "none";
});


// Внутреняя кнопка скрытия корзины 





// === При загрузке страницы загружаем корзину ===
loadCart();


