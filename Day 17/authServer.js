const express = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

const refreshTokenList = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  if (!refreshTokenList.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(401);
    else {
      const newToken = generateToken({ user: user.username });
      return res.status(200).json({ newToken: newToken });
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { username: username };
  const token = generateToken({ user: username });
  const refToke = jwt.sign(user, process.env.REFRESH_TOKEN);
  refreshTokenList.push(refToke);
  res.json({ accessToken: token, refreshToken: refToke });
});

function generateToken(user) {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN, {
    expiresIn: "15s",
  });
}

app.listen(PORT, () => {
  console.log(`the server is running at http://localhost:${PORT}`);
});
