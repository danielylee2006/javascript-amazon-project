//get saved data from local storage. Convert the JSON string to list and save in cart.
export let cart;
loadFromStorage();

/*
To avoid naming conflicts, the cart.js was removed from <script>
However, we still want to have access to it, so we EXPORT it.
*/

/*
Because we use the cart module in the amazon.js file we import it 
within that file.  

*/

//MODULES ONLY WORK IN LIVE SERVERS!

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

//EVERY TIME WE MAKES CHANGES TO CART CALL THIS FUNCTION!
function saveToLocalStorage() {
  //converting cart[] to JSON string and store in local storage as key: 'cart'
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function emptyCart() {
  cart = [];
  saveToLocalStorage();
}

export function addToCart(productId, quantity) {
  let matchingItem;

  //checking if the product is already in the cart
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    //if matching item exists -> simply increase quantity
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1", //default delivery option
    });
  }

  saveToLocalStorage(); //after we update our cart we save it to local storage
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      //add all items that doesn't have that specific product Id.
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToLocalStorage(); //after every update we need to save it local storage
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  //update the html for cartQuantity (amazon.html)
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  //loop through the cart and the find the product we want to update the DelOP
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  //update the deliveryOptionId according to user input

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToLocalStorage();
}

export function loadCart(renderProductsGrid) {
  //load the products JSON from backend via http 'GET' request
  const xhr = new XMLHttpRequest(); //create request Object

  xhr.addEventListener("load", () => {
    renderProductsGrid(); //we can render the products only after the xhr reponse is loaded.
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}
