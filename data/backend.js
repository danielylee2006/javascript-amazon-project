const xhr = new XMLHttpRequest(); //creates a new http request to the backend

//wait for reponse to get loaded and then access it.
xhr.addEventListener('load', () => { 
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/products/first'); //get information from backend. 
xhr.send();






