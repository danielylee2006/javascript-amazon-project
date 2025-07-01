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

export function addToCart(productId) {
  let matchingItem;

  //checking if the product is already in the cart
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    //if matching item exists -> simply increase quantity
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
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
