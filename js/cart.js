function getCart() {
  return JSON.parse(localStorage.getItem('mini_amazon_cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('mini_amazon_cart', JSON.stringify(cart));
  renderCart();
}

function updateQuantity(productId, change) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === productId);

  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  saveCart(cart);
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const totalPriceEl = document.getElementById('totalPrice');
  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-msg">Your cart is empty. Start shopping!</div>`;
    totalPriceEl.textContent = "$0.00";
    return;
  }

  let totalCost = 0;

  container.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';

    const itemTotal = product.price * item.quantity;
    totalCost += itemTotal;

    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <img src="${product.image}" alt="${product.name}" class="cart-item-img">
          <div>
            <h4>${product.name}</h4>
            <span style="color: var(--text-muted); font-size: 0.85rem;">$${product.price.toFixed(2)} each</span>
          </div>
        </div>
        
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
        </div>

        <div style="font-weight: 700;">$${itemTotal.toFixed(2)}</div>
      </div>
    `;
  }).join('');

  totalPriceEl.textContent = `$${totalCost.toFixed(2)}`;
}

document.getElementById('checkoutBtn')?.addEventListener('click', () => {
  if (getCart().length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your order!");
    localStorage.removeItem('mini_amazon_cart');
    renderCart();
  }
});

document.addEventListener('DOMContentLoaded', renderCart);