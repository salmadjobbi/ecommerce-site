async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      const products = await response.json();
  
      const productContainer = document.getElementById('product-list');
      productContainer.innerHTML = products.map(product => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>$${product.price}</p>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  window.onload = fetchProducts;