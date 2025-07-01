/*
Main Idea of Javascript web development

MVC (Model --> View --> Controller)

1.Model: Save the necessary data (e.g. cart.js, products.js, deliveryOptions.js)
2.View: Generate the HTML for it (forEach(() => {html += '<div></div>'})
3.Controller: Make the elements interactive and update the view accordingly (html)
   (e.g) saving all the view and controller elements to recreate the html and 
   also make it able to use the interactive elements again after recreation. 
*/
import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  //get the total cost of items (before shipping or tax)
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((item) => {
    
    const product = getProduct(item.productId);
    productPriceCents += product.priceCents * item.quantity;

    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;

  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `

        <div class="payment-summary-title">
            Payment Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPriceCents
            )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTaxCents
            )}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

  console.log(productPriceCents);

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}
