function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function counter(callback) {
    for (let i = 1; i <= 10; i++) {
        await delay(1000); 
        callback(i);
    }
}

function display(c) {
    console.log(c);
}

counter(display);
