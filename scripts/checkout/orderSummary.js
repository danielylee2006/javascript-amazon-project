import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

/*
In order to update the order summary each section, we put all of out code
for rendering the order summary into a function so every time a user updates
the order summary (e.g. selecting new delivery option), then we run the function 
after the update code.
*/

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  //generating html
  cart.forEach((cartItem) => {
    const { productId, quantity, deliveryOptionId } = cartItem;

    //get product that matches the item in cart to get product details.
    const matchingProduct = getProduct(productId);
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    cartSummaryHTML += `<div class="cart-item-container js-cart-item-container
     js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery Date: ${dayjs()
                .add(deliveryOption.deliveryDays, "days")
                .format("dddd, MMMM D")}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${productId}">
                  <span>
                    Quantity: <span class="quantity-label">${quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                   js-delete-link js-delete-link-${productId}" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(productId, deliveryOption)}
              </div>
            </div>
          </div>`;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  //auto generate the delivery option html
  function deliveryOptionHTML(productId, deliveryOption) {
    let html = "";

    deliveryOptions.forEach((option) => {
      const dateString = dayjs()
        .add(option.deliveryDays, "days")
        .format("dddd, MMMM D");

      //ternary operator: condition ? ExpressionIfTrue : ExpressionIfFalse
      const priceString =
        option.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(option.priceCents)} - `;

      const isChecked = option.id === deliveryOption.id;

      //If isChecked is true = give checked status to that option
      //If isChecked is false = give '' meaning no checked status.

      html += `<div class="delivery-option js-delivery-option"
                data-product-id = "${productId}"
                data-delivery-option-id = "${option.id}">
                <input type="radio"
                ${isChecked ? "checked" : ""}
                 class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
            </div>`;
    });
    return html;
  }

  //give a click event for the delete link for each item in cart.
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId; //get product Id data from each link
      removeFromCart(productId);

      //updating the html after item is deleted.
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      ); //accessing each items container through unique id
      container.remove();

      //updating the paymentSummary
      renderPaymentSummary();
    });
  });

  //adding click event for all the radio inputs
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); //after update, render new html.
      renderPaymentSummary();
    });
  });
}

documnent.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

  })
});