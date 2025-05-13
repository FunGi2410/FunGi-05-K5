

function counter(callback){
    for(let i = 1; i <= 10; i++){
        setTimeout(function() {
            callback(i);
        }, i * 1000);
    }
}

function display(c){
    console.log(c);
}

counter(display);