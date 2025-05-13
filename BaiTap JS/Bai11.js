function asyncFunc1() {
  return new Promise((resolve, reject) => {
    console.log("Started asyncFunc1");
    setTimeout(() => {
      console.log("asyncFunc1 failed");
      reject("Lỗi ở asyncFunc1");
    }, 1000);
  });
}

function asyncFunc2() {
  return new Promise((resolve) => {
    console.log("Started asyncFunc2");
    setTimeout(() => {
      console.log("Completed asyncFunc2");
      resolve("Kết quả 2");
    }, 1000);
  });
}

function asyncFunc3() {
  return new Promise((resolve) => {
    console.log("Started asyncFunc3");
    setTimeout(() => {
      console.log("Completed asyncFunc3");
      resolve("Kết quả 3");
    }, 1000);
  });
}

asyncFunc1()
  .then(
    (result) => {
      console.log("Result 1:", result);
    },
    (error) => {
      console.warn("Error 1:", error);
    }
  )
  .then(() => {
    return asyncFunc2();
  })
  .then(
    (result) => {
      console.log("Result 2:", result);
    },
    (error) => {
      console.warn("Error 2:", error);
    }
  )
  .then(() => {
    return asyncFunc3();
  })
  .then(
    (result) => {
      console.log("Result 3:", result);
    },
    (error) => {
      console.warn("Error 3:", error);
    }
  );
