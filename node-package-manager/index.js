const lodash = require("lodash");

const names = ["aditya", "john", "clark"];

const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);
