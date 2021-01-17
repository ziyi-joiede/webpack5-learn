// index.js

import './index.less'

import Dialog from 'dialog';

console.log(Dialog);

if (module && module.hot) {
    module.hot.accept()
}

class Animal {
    constructor(name) {
        this.name = name;
    }
}

let dog = new Animal('abc');

console.log(dog);

// document.getElementById('btn').onclick = function() {
//     import ('./handle').then(fn => {
//         return fn.fn();
//     });
// }

fetch("user")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));