const express = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

const posts = [
  {
    username: "User 1",
    post: "POST 1",
  },
  {
    username: "User 2",
    post: "POST 2",
  },
];

app.use(express.json());

app.get("/", authenticationToken, (req, res) => {
  res.json(req.user);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const AccessToken = jwt.sign(
    { username, password },
    process.env.ACCESS_TOKEN_SECRET
  );

  res.end(AccessToken);
});

function authenticationToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.end("Don't have valid token");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.end("Invalid token ! Please provide a valid token");
    } else {
      req.user = user;
      next();
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
