function asyncFunc1(callback) {
    console.log("Started asyncFunc1");
    setTimeout(() => {
    console.log("Completed asyncFunc1");
    callback();
    }, 3000);
}
function asyncFunc2(callback) {
    console.log("Started asyncFunc2");
    setTimeout(() => {
    console.log("Completed asyncFunc2");
    callback();
    }, 2000);
}
function asyncFunc3(callback) {
    console.log("Started asyncFunc3");
    setTimeout(() => {
    console.log("Completed asyncFunc3");
    callback();
    }, 1000);
}

function callbackManager(functions) {
  function runNextFunc(index) {
    if (index >= functions.length) return; 

    const currentFunc = functions[index];

    currentFunc(() => {
      runNextFunc(index + 1); 
    });
  }

  runNextFunc(0); 
}

// driver code
callbackManager([asyncFunc1, asyncFunc2, asyncFunc3]);