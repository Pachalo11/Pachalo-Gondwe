document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const payNowButton = document.getElementById('pay-now');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  
    function addToCart(event) {
      const menuItem = event.target.closest('.menu-item');
      const itemName = menuItem.getAttribute('data-name');
      const itemPrice = parseFloat(menuItem.getAttribute('data-price'));
  
      const existingItem = cart.find(item => item.name === itemName);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
      }
  
      updateCart();
    }
  
    function removeFromCart(event) {
      const itemName = event.target.getAttribute('data-name');
      const itemIndex = cart.findIndex(item => item.name === itemName);
      if (itemIndex > -1) {
        cart[itemIndex].quantity -= 1;
        if (cart[itemIndex].quantity === 0) {
          cart.splice(itemIndex, 1);
        }
      }
  
      updateCart();
    }
  
    function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
  
      cart.forEach(item => {
        total += item.price * item.quantity;
  
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price} x ${item.quantity}</span>
          <button data-name="${item.name}">Remove</button>
        `;
  
        cartItem.querySelector('button').addEventListener('click', removeFromCart);
        cartItems.appendChild(cartItem);
      });
  
      cartCount.textContent = cart.length;
      cartTotal.textContent = total.toFixed(2);
    }
  
    payNowButton.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty!');
      } else {
        alert(`Total amount: $${cartTotal.textContent}. Proceed to payment.`);
        // Here you would integrate with your payment method
      }
    });
  });
  