export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order); //add to front of array instead of back
    saveToStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}