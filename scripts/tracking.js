import { cart, updateCartQuantity, loadFromStorage } from "../data/cart.js";
import { orders, getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");

await loadProductsFetch(); //wait for products to be loaded before calling getProduct();

const order = getOrder(orderId);

//get name and image from the product class
const product = getProduct(productId);
const {name, image} = product;

//get delivery date and quantity from the product within the order
const {products} = order; 
let productInOrder = getProductInOrder(products, productId);
const {quantity, estimatedDeliveryTime} = productInOrder;

let formattedDate = dayjs(estimatedDeliveryTime).format("MMMM D");

let html = 
`<div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
    </a>

    <div class="delivery-date">
        Arriving on ${formattedDate}
    </div>

    <div class="product-info">
        ${name}
    </div>

    <div class="product-info">
        Quantity: ${quantity}
    </div>

    <img class="product-image" src="${image}">

    <div class="progress-labels-container">
        <div class="progress-label">
        Preparing
        </div>
        <div class="progress-label current-status">
        Shipped
        </div>
        <div class="progress-label">
        Delivered
        </div>
    </div>

    <div class="progress-bar-container">
        <div class="progress-bar"></div>
    </div>
</div>`;

document.querySelector('.main').innerHTML = html;

console.log(cart);
updateCartQuantity();

function getProductInOrder(products, productId) {
    
    let matchingProduct;
    products.forEach((product) =>{
        if(product.productId === productId) {
            matchingProduct = product;
        }
    });

    return matchingProduct;
}
