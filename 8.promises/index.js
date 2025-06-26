function delayFn(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
console.log("Promise start ");
delayFn(2000).then(() => {
  console.log("Promise end after 2 seconds");
});

console.log("end");

function divideFn(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 == 0) {
      reject("cant perform division my zero");
    } else {
      resolve(num1 / num2);
    }
  });
}

divideFn(10, 0)
  .then((result) => console.log(result))
  .catch((error) => {
    console.log(error);
  });
