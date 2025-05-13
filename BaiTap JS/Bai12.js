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

async function runAllFuncs() {
  try {
    const result1 = await asyncFunc1();
    console.log("Result 1:", result1);
  } catch (error) {
    console.warn("error in asyncFunc1:", error);
  }

  try {
    const result2 = await asyncFunc2();
    console.log("Result 2:", result2);
  } catch (error) {
    console.warn("error in asyncFunc2:", error);
  }

  try {
    const result3 = await asyncFunc3();
    console.log("Result 3:", result3);
  } catch (error) {
    console.warn("error in asyncFunc3:", error);
  }
}

runAllFuncs();
