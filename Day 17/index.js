const express = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [
  {
    username: "user1",
    age: 21,
  },
  {
    username: "user2",
    age: 22,
  },
];

app.get("/", AuthanticateUser, (req, res) => {
  res.json(req.user);
});

function AuthanticateUser(req, res, next) {
  const authorization = req.headers["authorization"]?.split(" ")[1];

  if (!authorization)
    return res.status(401).json({ message: "unauthorize access" });

  try {
    jwt.verify(authorization, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) res.status(401).json({ message: "Enter a valid token" });
      else {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
}

app.listen(PORT, () => {
  console.log(`the server is running at http://localhost:${PORT}`);
});
