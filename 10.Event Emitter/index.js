//EventEmitrer allows object to emit named events

const eventEmitter = require("events");
const { EventEmitter } = require("stream");

const myFirstEmitter = new EventEmitter();

//register a listener

myFirstEmitter.on("greet", (name) => {
  console.log(`Hello ${name}`);
});

myFirstEmitter.emit("greet", "Aditya");
