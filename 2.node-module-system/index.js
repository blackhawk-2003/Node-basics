//module.exports->export
//require->import
const { add, sub, div } = require("./first-module");
//const firstModule = require("./first-module");
//console.log(firstModule.add(10, 20));
//console.log(firstModule.sub(10, 20));
//console.log(firstModule.div(10, 20));
console.log(add(10, 20));
console.log(sub(10, 20));
try {
  console.log(div(10, 0));
} catch (error) {
  console.log(error.message);
}

//module wrapper
// {
//   (function (exports, require, module, __filename, __dirname) {
//     const { add, sub, div } = require("./first-module");
//     console.log(add(10, 20));
//     console.log(sub(10, 20));
//     console.log(div(10, 0));
//   });
// }
