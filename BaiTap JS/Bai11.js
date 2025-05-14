

let isStop = false; 

function timeoutPromise(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      isStop = true; 
      reject("Stoppp");
    }, ms);
  });
}

function asyncFunc1() {
  return new Promise((resolve, reject) => {
    console.log("Started asyncFunc1");
    setTimeout(() => {
      if (isStop) return;
      console.log("Completed asyncFunc1");
      resolve("Kết quả 1");
    }, 1000);
  });
}

function asyncFunc2() {
  return new Promise((resolve, reject) => {
    console.log("Started asyncFunc2");
    setTimeout(() => {
      if (isStop) return;
      console.log("Completed asyncFunc2");
      resolve("Kết quả 2");
    }, 2000);
  });
}

function asyncFunc3() {
  return new Promise((resolve) => {
    console.log("Started asyncFunc3");
    setTimeout(() => {
      if (isStop) return;
      console.log("Completed asyncFunc3");
      resolve("Kết quả 3");
    }, 3000);
  });
}

const logic = new Promise((resolve, reject) => {
  asyncFunc1()
    .then((result) => {
      if (!isStop) console.log("Result 1:", result);
    }, (error) => {
      if (!isStop) console.warn("Error 1:", error);
    })
    .then(() => {
      return asyncFunc2();
    })
    .then((result) => {
      if (!isStop) console.log("Result 2:", result);
    }, (error) => {
      if (!isStop) console.warn("Error 2:", error);
    })
    .then(() => {
      return asyncFunc3();
    })
    .then((result) => {
      if (!isStop) {
        console.log("Result 3:", result);
        resolve("Complete all func");
      }
    }, (error) => {
      if (!isStop) {
        console.warn("Error 3", error);
        reject("Error: Complete all func");
      }
    });
});

Promise.race([logic, timeoutPromise(4000)])
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.warn(err);
  });

