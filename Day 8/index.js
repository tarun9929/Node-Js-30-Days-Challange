const express = require("express");
const users = require("./users.json");

const app = express();
const PORT = 3000;

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:username", (req, res) => {
  const username = req.params.username;

  const user = users.find((user) => {
    return user.username === username;
  });

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`the app is running at http://localhost:${PORT}`);
});
