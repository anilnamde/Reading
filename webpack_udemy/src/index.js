// import sum from './sum';
// import './image_viewer';

// console.log(sum(3,3));

const button = document.createElement('button')
button.innerHTML = 'Click Me';
button.onclick = () => {
    System
    .import('./multi')
    .then((module)=>{
        console.log(module.default(2, 5));
    });
}
document.body.appendChild(button);
