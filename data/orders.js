import { getProduct, loadProductsFetch } from "./products.js";
import formatCurrency from "../scripts/utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {updateCartQuantity} from "./cart.js";

console.log("✅ orders.js loaded on:", window.location.pathname);
console.log("⛔ orders-grid?", document.querySelector(".orders-grid"));

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order); //add to front of array instead of back
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function renderOrder() {
  let html = "";

  orders.forEach((order) => {
    const { totalCostCents, id, orderTime, products } = order;

    const formattedOrderDate = dayjs(orderTime).format("MMMM D, YYYY");
    const totalCost = formatCurrency(totalCostCents);

    let productsHTML = "";

    products.forEach((product) => {
      const { productId, quantity, estimatedDeliveryTime } = product;
      const matchingProduct = getProduct(productId);

      const formattedDeliveryDate = dayjs(estimatedDeliveryTime).format(
        "MMMM D"
      );

      productsHTML += `
        <div class="product-image-container">
            <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-delivery-date">Arriving on: ${formattedDeliveryDate}</div>
            <div class="product-quantity">Quantity: ${quantity} </div>
            <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            </button>
        </div>

        <div class="product-actions">
            <a href="tracking.html">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
            </a>
        </div>`;
    });

    html += `
    <div class="order-container">
        <div class="order-header">
        <div class="order-header-left-section">
            <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formattedOrderDate}</div>
            </div>

            <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${totalCost}</div>
            </div>
        </div>

        <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${id}</div>
        </div>
        </div>

        <div class="order-details-grid">
            ${productsHTML}
        </div>
    </div>
    `;
  });

  document.querySelector(".orders-grid").innerHTML = html;
}

async function loadOrderPage() {
  try {
    await loadProductsFetch(); //wait for products to be fetched before calling renderOrder();
    renderOrder();
    updateCartQuantity();
  } catch (error) {
    console.error("Error loading Page:", error);
  }
}

loadOrderPage();






