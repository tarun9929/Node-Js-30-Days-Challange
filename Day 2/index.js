const fs = require("fs");

const Json = {
  name: "Tarun Didwaniya",
  age: 21,
};

fs.writeFile("data.json", JSON.stringify(Json), (error) => {
  if (error) {
    console.log(error);
  } else {
    const data = fs.readFileSync("data.json", "utf-8");
    console.log(data);
  }
});

console.log("Node Js Learning Day 2");
