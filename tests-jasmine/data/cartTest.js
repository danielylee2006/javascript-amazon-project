import {cart, addToCart} from '../../data/cart.js';


describe('Test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {

        //create a fake object of localStorage.getItem
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        console.log(localStorage.getItem('cart'));

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
    });

    it('adds a new product to the cart', () => {

    });
});