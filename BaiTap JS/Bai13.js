function asyncFunc1() {
  return new Promise((resolve) => {
    console.log("Started asyncFunc1");
    setTimeout(() => {
      console.log("Completed asyncFunc1");
      resolve("R1");
    }, 1000);
  });
}

function asyncFunc2() {
  return new Promise((resolve) => {
    console.log("Started asyncFunc2");
    setTimeout(() => {
      console.log("Completed asyncFunc2");
      resolve("R2");
    }, 1000);
  });
}

function asyncFunc3() {
  return new Promise((resolve) => {
    console.log("Started asyncFunc3");
    setTimeout(() => {
      console.log("Completed asyncFunc3");
      resolve("R3");
    }, 1000);
  });
}

const asyncFuncs = [asyncFunc1, asyncFunc2, asyncFunc3];

asyncFuncs.reduce((promiseChain, currentFunc) => {
  return promiseChain.then(() => currentFunc());
}, Promise.resolve());
