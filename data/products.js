import { formatCurrency } from "../scripts/utils/money.js";

//this function identifies product by matching the productId
//of the Item in the cart with the productId's of the products in the db
export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    //pass in an object as param to access details
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating; //this is object containing (stars, count)
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return "";
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    //override parent method for clothing objects
    return `
      <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
    `;
  }
}

export let products = [];

export function loadProducts(renderProductsGrid) {
  //load the products JSON from backend via http 'GET' request
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    renderProductsGrid(); //we can render the products only after the xhr reponse is loaded.
  });

  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}


