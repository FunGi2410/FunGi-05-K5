function asyncFunc1() {
  return new Promise((resolve) => {
    console.log("Started asyncFunc1");
    setTimeout(() => {
      console.log("Completed asyncFunc1");
      resolve(1);
    }, 3000);
  });
}

function asyncFunc2() {
  return new Promise((resolve) => {
    console.log("Started asyncFunc2");
    setTimeout(() => {
      console.log("Completed asyncFunc2");
      resolve(2);
    }, 2000);
  });
}

function asyncFunc3() {
  return new Promise((resolve) => {
    console.log("Started asyncFunc3");
    setTimeout(() => {
      console.log("Completed asyncFunc3");
      resolve(3);
    }, 1000);
  });
}

async function runAllFunc() {
  try {
    const f1 = await asyncFunc1();
    console.log("F1:", f1);

    const f2 = await asyncFunc2();
    console.log("F2:", f2);

    const f3 = await asyncFunc3();
    console.log("F3:", f3);

    console.log("completed!");
  } catch (error) {
    console.error("error!!!", error);
  }
}

runAllFunc();

