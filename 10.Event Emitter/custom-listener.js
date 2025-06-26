const eventEmitter = require("events");
const { EventEmitter } = require("stream");

class MyCustomEmitter extends EventEmitter {
  constructor() {
    super();
    this.greeting = "hello";
  }
  greet(name) {
    this.emit("greeting", `${this.greeting}`, name);
  }
}

const myCustomEmitter = new MyCustomEmitter();

myCustomEmitter.on("greeting", (input) => {
  console.log(input);
});

myCustomEmitter.greet("John");
