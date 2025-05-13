function timer(start, step) {
  let cur = start;
  let intervalId = null;

  function startTimer() {
    if (intervalId !== null) return;

    intervalId = setInterval(() => {
      console.log(cur);
      cur += step;
    }, 1000); 
  }

  function stopTimer() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    } 
  }

  return {
    startTimer,
    stopTimer
  };
}

const timerInstance = timer(100, 10);
timerInstance.startTimer(); 

setTimeout(() => {
  timerInstance.stopTimer();
}, 5000);

