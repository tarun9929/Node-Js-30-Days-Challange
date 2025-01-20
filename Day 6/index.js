const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.end(`Hello ${req.query.name}`);
});

app.listen(port, () => {
  console.log(`the app is running at http://localhost:${port}`);
});
