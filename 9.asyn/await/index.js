//async function will always return a promise
//await is only used inside a async function and stops
//the execution of that function until a promise is reolved
//or rejected

function delayFn(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function delayed(name) {
  await delayFn(2000);
  console.log(name);
}

delayed("Aditya");

async function division(num1, num2) {
  try {
    if (num2 == 0) {
      throw new Error("Cant divide by zero");
    } else {
      return num1 / num2;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function mainFn() {
  console.log(await division(10, 2));
  console.log(await division(10, 0));
}

mainFn();
