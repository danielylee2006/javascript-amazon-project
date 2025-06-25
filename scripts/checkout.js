import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import formatCurrency from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";


let cartSummaryHTML = "";

//generating html
cart.forEach((cartItem) => {
  const { productId, quantity } = cartItem;

  let matchingProduct;

  //find a matching product in the cart in the product.js database 
  products.forEach((product) => {

    if (product.id === productId) {
      matchingProduct = product;
    }
  });



  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery Date: ${dayjs().add(cartItem.deliveryOptionId, 'days').format("dddd, MMMM D")}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                   js-delete-link" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(productId, cartItem)}
              </div>
            </div>
          </div>`;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

//auto generate the delivery option html
function deliveryOptionHTML(productId, cartItem) {

  let html = "";

  deliveryOptions.forEach((option) => {
    
    /*
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    */
    const dateString = dayjs().add(option.id, "days").format("dddd, MMMM D");

    //ternary operator: condition ? ExpressionIfTrue : ExpressionIfFalse
    const priceString =
      option.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(option.priceCents)} - `;

    const isChecked = option.id === cartItem.deliveryOptionId;

    //If isChecked is true = give checked status to that option
    //If isChecked is false = give '' meaning no checked status. 

    html += `<div class="delivery-option js-delivery-option"
                data-product-id = "${productId}"
                data-delivery-option-id = "${option.id}">
                <input type="radio"
                ${isChecked ? 'checked': ''}
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
  });
});

//adding click event for all the radio inputs
document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
    });
});
