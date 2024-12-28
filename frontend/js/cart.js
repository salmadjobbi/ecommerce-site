// Save cart data to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Retrieve cart data from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
}

// Update cart display on the cart.html page
document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.querySelector('#cart-container');
  const totalPriceElement = document.querySelector('#total-price');

  const cart = loadCart();
  let totalPrice = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <div>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</div>
    `;
    cartContainer.appendChild(cartItem);
    totalPrice += item.price * item.quantity;
  });

  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
});

// Add event listener for "Retour à la Boutique"
document.querySelector('#back-to-shop').addEventListener('click', () => {
  window.location.href = 'index.html';
});
document.addEventListener('DOMContentLoaded', () => {
  const cartSection = document.querySelector('#cart');
  const shopSection = document.querySelector('#shop');
  const viewCartButton = document.querySelector('#view-cart');
  const backToShopButton = document.querySelector('#back-to-shop');

  // Load cart from localStorage or initialize
  const cart = loadCart();

  // Show Cart View
  viewCartButton.addEventListener('click', (event) => {
    event.preventDefault();
    shopSection.classList.add('hidden');
    cartSection.classList.remove('hidden');
    updateCartDisplay();
  });

  // Back to Shop View
  backToShopButton.addEventListener('click', () => {
    cartSection.classList.add('hidden');
    shopSection.classList.remove('hidden');
  });

  function updateCartDisplay() {
    const cartContainer = document.querySelector('#cart-container');
    const totalPriceElement = document.querySelector('#total-price');
    
    cartContainer.innerHTML = ''; // Clear existing cart items
    let totalPrice = 0;

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.innerHTML = `
        <div>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</div>
      `;
      cartContainer.appendChild(cartItem);
      totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
});
