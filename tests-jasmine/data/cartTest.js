import {cart, addToCart, loadFromStorage} from '../../data/cart.js';


describe('Test suite: addToCart', () => {
    it('adding new product to the cart', () => {
       
        /*
        These two line is sufficient testing when we assume that localStorage is empty.
        However, this is FLAKY test as it passes sometimes and fails sometimes. 
        If local storage was not empty, the test would not pass.
        */

        /*
        We don't want to get localStorage.getItem from the actual browser so we 
        created a fake one
        */
        

        /*
        Create fake localStorage.getItem() method and we make it return a empty array
        instead of returning the actual localStorage from the browser.
        */
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        //create mock setItem as well because we don't want to actually modify the real cart.
        spyOn(localStorage, 'setItem').and.callFake(() => {});

        /*
        localStorage.getItem() code inside this method will be overran by the mock one
        It will create a mock cart with empty storage which allows us to perform the
        test as intended (adding new item to cart)
        */
        loadFromStorage(); 

        /*
        adding to cart calls the setItem() method which changes the cart in the 
        real code. So we have to create a mock setItem() for this test.
        */
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

        //checking if the item was added properly.
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

        //we expect cart length to be 1 after one item is added to empty cart.
        expect(cart.length).toEqual(1); 

        //we expect setItem() method to be called once. 
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); 

    });

    it('adds an existing product to the cart', () => {

        /*
        We want to see if the adding an existing product works properly.
        It should simply increase the quantity of the first item we added. 
        */
        
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage(); //create the mock cart with the item added above

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6"); //add duplicate item
    
        expect(cart.length).toEqual(1); //length should still equal one
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].quantity).toEqual(2) //duplicate items so quantity = 2.

    });
});