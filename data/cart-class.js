class Cart {

  cartItems;
  #localStorageKey; //hash gives private property

  constructor(localStorageKey) { //set up code
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() { //private method
    this.cartItems =
      JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }
  saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }
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
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToLocalStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToLocalStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
