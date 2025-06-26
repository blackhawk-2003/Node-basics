const fs = require("fs");
const { errorToJSON } = require("next/dist/server/render");

function person(name, callbackFn) {
  console.log(`hello ${name}`);
  callbackFn("Your address");
}
function address() {
  console.log(address);
}

person("aditya", address);

fs.readFile("index.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file");
  } else {
    console.log(data);
  }
});
