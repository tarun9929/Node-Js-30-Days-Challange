const fs = require("fs");
const readline = require("node:readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const user = {};

fs.readFile("interface.json", "utf-8", async (error, data) => {
  if (error) {
    console.log(error);
  } else {
    const jsonData = JSON.parse(data);

    const readInputFromUser = (key) => {
      return new Promise((resolve, reject) => {
        r1.question(jsonData[key], (info) => {
          user[key] = info;
          resolve();
        });
      });
    };

    for (let key in jsonData) {
      await readInputFromUser(key);
    }
    r1.close();
  }

  const prev = JSON.parse(fs.readFileSync("UserInfo.json", "utf-8"));

  prev.push(user);

  fs.writeFile("UserInfo.json", JSON.stringify(prev), (error) => {
    if (error) {
      console.log(error);
    }
  });
});
