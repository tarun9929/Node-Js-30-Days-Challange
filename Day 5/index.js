const http = require("http");
const url = require("url");
const fs = require("fs");

const PORT = 8000;

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return;
  const myUrl = url.parse(req.url, true);

  switch (myUrl.pathname) {
    case "/":
      res.end("Home page");
      break;

    case "/api/users/create":
      const urlData = myUrl.query;
      fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
          res.end(err.message);
        } else {
          let json = [];
          if (data !== "") {
            json = JSON.parse(data);
          }
          json.push({ username: null, age: null, gender: null, ...urlData });
          fs.writeFile("users.json", JSON.stringify(json), (err) => {
            if (err) {
              console.log(err.message);
            }
          });
        }
      });
      res.end("User has been created");
      break;

    case "/api/users":
      const queryData = myUrl.query.range;
      fs.readFile("users.json", "utf-8", (err, data) => {
        if (err || data === "") {
          res.end("<h1>NO USER YET</h1>");
        } else {
          const myData = JSON.parse(data).slice(0, queryData);
          res.end(JSON.stringify(myData));
        }
      });
      break;

    case "/api/users/search":
      fs.readFile("users.json", "utf-8", (err, data) => {
        if (err || data === "") {
          res.end("<h1>NO USER YET</h1>");
        } else {
          const filterData = JSON.parse(data).filter((user) => {
            return user.username === myUrl.query?.username;
          });

          if (!filterData.length) {
            const errMsg = JSON.stringify({
              message: `user ${myUrl.query.username} not found`,
              code: 404,
            });
            res.end(errMsg);
          } else {
            const str = JSON.stringify(filterData);
            res.end(str);
          }
        }
      });
      break;

    default:
      res.end("404 NOT FOUND");
      break;
  }
});

server.listen(PORT, () => {
  console.log(`your server is running at http://localhost:${PORT}`);
});

console.log("30 Days nodejs challange Day 5");
