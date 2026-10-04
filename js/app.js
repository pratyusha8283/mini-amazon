// Function to fetch cart items from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('mini_amazon_cart')) || [];
}

// Function to save cart items to localStorage
function saveCart(cart) {
  localStorage.setItem('mini_amazon_cart', JSON.stringify(cart));
  updateCartBadge();
  renderProducts(); // Refresh buttons state on home page grid
}

// Update header badge count
function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = totalCount;
  }
}

// Show Toast Notification Popup
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
}

// Update Quantity directly from Home Page Card (+ / -)
function updateCardQuantity(productId, change, productName) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === productId);

  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
      showToast(`Removed from cart`);
    } else if (change > 0) {
      showToast(`Updated quantity: ${cart[index].quantity}`);
    }
  } else if (change > 0) {
    cart.push({ id: productId, quantity: 1 });
    showToast(`Added "${productName}" to cart!`);
  }

  saveCart(cart);
}

// Render Products Grid with Dynamic Add / Quantity Controls
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const cart = getCart();

  grid.innerHTML = products.map(product => {
    // Check if product is already in cart
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    // Render + Add button if qty is 0, else show [- Qty +] control
    const actionButtonHtml = quantity === 0 
      ? `<button class="btn-add" onclick="event.stopPropagation(); updateCardQuantity(${product.id}, 1, '${product.name.replace(/'/g, "\\'")}')">
           + Add
         </button>`
      : `<div class="card-qty-controls" onclick="event.stopPropagation();">
           <button class="card-qty-btn" onclick="updateCardQuantity(${product.id}, -1, '${product.name.replace(/'/g, "\\'")}')">-</button>
           <span class="card-qty-count">${quantity}</span>
           <button class="card-qty-btn" onclick="updateCardQuantity(${product.id}, 1, '${product.name.replace(/'/g, "\\'")}')">+</button>
         </div>`;

    return `
      <div class="product-card" onclick="openModal(${product.id})">
        <div class="card-img-wrapper">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="card-body">
          <span class="category-tag">${product.category}</span>
          <h3 class="product-title">${product.name}</h3>
          <div class="rating">★ ${product.rating}</div>
          <div class="card-footer">
            <span class="price">$${product.price.toFixed(2)}</span>
            ${actionButtonHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Modal Handling
const modal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');

function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalCategory').textContent = product.category;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalRating').textContent = `★ ${product.rating}`;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;

  const addBtn = document.getElementById('modalAddBtn');
  addBtn.onclick = () => {
    updateCardQuantity(product.id, 1, product.name);
    modal.style.display = 'none';
  };

  modal.style.display = 'flex';
}

if (closeModal) {
  closeModal.onclick = () => {
    modal.style.display = 'none';
  };
}

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartBadge();
});