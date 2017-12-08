import big from './../images/big.jpeg';
import small from './../images/small.jpeg';

import './../styles/image_viewer.css';

// const image = document.createElement('img');
// image.src = 'http://lorempixel.com/400/200/';

const image1 = document.createElement('img');
image1.src = small;

const image2 = document.createElement('img');
image2.src = big;

// const image3 = document.createElement('img');
// image3.src = 'build/a3b363e65862494ac7343714855e984f.jpeg'

// document.body.appendChild(image);
document.body.appendChild(image1);
document.body.appendChild(image2);