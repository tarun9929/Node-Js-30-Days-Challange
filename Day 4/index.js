const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  fs.readFile("log.json", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const json = JSON.parse(data);

      json.push({
        message: "new request has been received",
        path: req.url,
        timestamp: Date.now(),
      });

      fs.writeFile("log.json", JSON.stringify(json), (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  });
  if (req.url == "/") {
    console.log("new request recived");
    res.end("<h1>Hello You are at home age</h1>");
  }
});

server.listen(8000, () => {
  console.log("server is running at http://localhost:8000");
});
