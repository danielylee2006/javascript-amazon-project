import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";
import {loadProducts} from '../../data/products.js';

describe("Test Suite: renderOrderSummary", () => {

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeAll((done) => { //run function before all of the tests
    loadProducts(() => {
      done(); //makes sure loadProducts runs first (get the request) before code continues
    });
  }); 

  beforeEach(() => { //this is the setup code BEFORE EACH test -> AKA HOOKS
  
    /*
    To test renderOrderSummary()'s ability to display the cart, we create our own
    div element on our test page to see the output. Because the output code for 
    renderOrderSummary() involves outputing the html code on to js-order-summary
    element, we create a duplicate div element in our test container.
    */

    document.querySelector(".js-test-container").innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>`;

    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage();
    renderOrderSummary();
  });

  it("displays the cart", () => {
    expect(
      //check if two item containers were properly selected and outputted.
      document.querySelectorAll(".js-cart-item-container").length
    ).toEqual(2);

    expect(
      //check if text of first product contains "Quantity 2"
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");

    expect(
      //check if text of first product contains "Quantity 2"
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    //at the end of each test, set the html to empty for clean up
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("removes a product", () => {
    /*
    when we click the delete link to test its functionality, it calls the 
    renderPaymentSummary() function which update the innerHTML for the
    js-payment-summary element. However, that element does not exist in
    this test. So we just add the div element so above in the js-test-container.
    */
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      //after the delete link has been clicked there should be one cart container left
      document.querySelectorAll(".js-cart-item-container").length
    ).toEqual(1);

    expect(
      //we expect the item container to be null after deletion
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      //we expect the second item container to be not null cuz it hasn't been deleted
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    //check if the cart array itself is being updated properly
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    //at the end of each test, set the html to empty for clean up
    document.querySelector(".js-test-container").innerHTML = "";
  });
});
