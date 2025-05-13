function asyncFunc1(callback) {
    setTimeout(() => {
    callback(1);
    }, 3000);
}
function asyncFunc2(callback) {
    setTimeout(() => {
    callback(2);
    }, 2000);
}
function asyncFunc3(callback) {
    setTimeout(() => {
    callback(3);
    }, 1000);
}

function asyncParallel(functions, callback) {
  let results = [];
  let count = 0;

  functions.forEach((fn, index) => {
    fn((result) => {
      results[index] = result; 
      count++;
      if (count === functions.length) {
        callback(results); 
      }
    });
  });
}

asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], (result) => {
  console.log(result); 
});

