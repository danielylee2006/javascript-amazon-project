import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend.js';

async function loadPage() {
  //async keyword makes function return a promise

  await loadProductsFetch(); //makes code wait for async function to finish.

  /*
  await can only be used if function returns promise. 
  Although loadCart() is an async function, it does not return 
  a promise. So we wrap it with a promise and add await.
  */
  
  const variable = await new Promise((resolve) => {
    loadCart(() => {
      resolve('value'); // 'value' gets saved in variable
    });
  });

  renderOrderSummary();
  renderPaymentSummary();

  return "value"; // equivalent to resolve('value')
}
loadPage();


/* NONE ASYNC AWAIT APPROACH USING ONLY PROMISES!!!!

//running multiple promises at the same time and waiting for all of them to finish
Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve("hello");
    });
  }),
]).then((values) => {
  //values -> ['hi', 'hello']
  renderOrderSummary();
  renderPaymentSummary();
});

/*
Promise is used for more efficient call backs. Multiple call backs lead to nesting
of functions. But with an Promise Object, we can use .then() for easier call back managment. 
*/


