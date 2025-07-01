//FUNCTION FOR CREATING A NEW CART OBJECT
function Cart(localStorageKey) {
  //use pascal case for functions that generate objects

  const cart = {
    cartItems: undefined, //empty cartItems list
    loadFromStorage() {
    
        /*
        When we create multiple carts they retrieve data from the same localStorageKey.
        So, we create a parameter for the localStorageKey to differentiate the cart's localStorage.
        */
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity++;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }

      this.saveToLocalStorage();
    },
    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToLocalStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToLocalStorage();
    },
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);