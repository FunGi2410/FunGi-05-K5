async function asyncFunc1() {
  await new Promise(resolve => setTimeout(resolve, 3000)); // hoàn thành sau 1 giây
  return "Result from asyncFunc1";
}

async function asyncFunc2() {
  await new Promise(resolve => setTimeout(resolve, 2000)); // hoàn thành sau 2 giây
  return "Result from asyncFunc2";
}

async function asyncFunc3() {
  await new Promise((_, reject) => setTimeout(reject, 1500, "Error from asyncFunc3")); // lỗi sau 1.5 giây
}

function timeoutFunc(timeout = 3000) { // timeout mặc định 3 giây
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Timeout exceeded");
    }, timeout);
  });
}
const asyncArr = [asyncFunc1, asyncFunc2, asyncFunc3];
const timeout = 5000; // thời gian timeout là 2.5 giây

// Chuyển mỗi hàm async thành promise
const promiseArr = [
  ...asyncArr.map(fn => fn()),
  timeoutFunc(timeout)
];

Promise.race(promiseArr)
  .then(console.log)
  .catch(console.log);
