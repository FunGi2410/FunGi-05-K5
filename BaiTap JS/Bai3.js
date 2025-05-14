// function counter(callback){
//     for(let i = 1; i <= 10; i++){
//         setTimeout(function() {
//             callback(i);
//         }, i * 1000);
//     }
// }

// function display(c){
//     console.log(c);
// }

// counter(display);
// max = 99;
// isCounter = true;

// function counter(i, callback){
//     if(i<1) return;
//     if(i > max-1) isCounter = false;

//     if(isCounter){
//         setTimeout(() => {
//             callback(i);
//             counter(i+1, callback);
//         }, 200);
//     }
//     else{
//         setTimeout(() => {
//             callback(i);
//             counter(i-1, callback);
//         }, 200);
//     }  
// }

// function display(c) {
//     console.log(c);
// }

// counter(1, display);

let direction = 1;
let endTime = 19;
function counter(start, end, callback) {
    
    let i = start;
    if(i<1) return;

    if (i === end) direction = -1;

    setTimeout(() => {
        callback(i);
        i += direction;
        counter(i, endTime, callback);
    }, 200);
}

function display(c) {
  console.log(c);
}

counter(1, endTime, display);

