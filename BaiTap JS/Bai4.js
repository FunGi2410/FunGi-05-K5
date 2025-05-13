let count = 0;
// function counter(){
//     count++;
//     display(count);
//     if(count >= 10) clearInterval(counter);
// }
// setInterval(counter, 1000);

function display(c){
    console.log(c);
}

const counter = setInterval(() => {
    count++;
    display(count);
    if (count >= 10) {
        clearInterval(counter); 
    }
}, 1000);

// call func error?