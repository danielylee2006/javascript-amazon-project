import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend.js';

//running multiple promises at the same time and waiting for all of them to finish
Promise.all([

 loadProductsFetch(),
 
  new Promise((resolve) => {
    loadCart(() => {
      resolve("hello");
    });
  }),
]).then((values) => { //values -> ['hi', 'hello']
  renderOrderSummary();
  renderPaymentSummary();
});

/*
Promise is used for more efficient call backs. Multiple call backs lead to nesting
of functions. But with an Promise Object, we can use .then() for easier call back managment. 
*/
