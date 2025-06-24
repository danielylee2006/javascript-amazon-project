export let cart = [
    {productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1},

    {productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1}
];

/*
To avoid naming conflicts, the cart.js was removed from <script>
However, we still want to have access to it, so we EXPORT it.
*/

/*
Because we use the cart module in the amazon.js file we import it 
within that file. 
*/

//MODULES ONLY WORK IN LIVE SERVERS!

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
    });
  }
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) { //add all items that doesn't have that specific product Id.
            newCart.push(cartItem);
        }
    }); 

    cart = newCart;
}
