

function sum(a, b, callback){
    sum = a + b;
    setTimeout(function() {
        callback(sum);
    }, 2000);
}

function display(c){
    console.log(c);
}

sum(4, 3, display);