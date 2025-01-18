const fs = require("fs");

setTimeout(() => {
  console.log("setTimeout after 0 ms");
}, 0);

setImmediate(() => {
  console.log("immediate fn");
});
// console.log("Node Js Day 2");
