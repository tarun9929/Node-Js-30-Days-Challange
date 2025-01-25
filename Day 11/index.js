const express = require("express");
const fs = require("fs");
const users = require("./users.json");
const { v4 } = require("uuid");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()} ${req.url} ${req.method}\n`,
    (err) => {
      if (err) {
        return res.status(500).end("something want wrong");
      }
    }
  );
  next();
});

const PasswordAuth = (req, res, next) => {
  const requestData = req.body;

  const user = users.find((user) => user.password == requestData.password);

  console.log(user);

  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(401).end("<h1> Unauthorized Request</h1>");
  }
};

const NewUser = (req, res, next) => {
  const user = req.body;

  if (user.password && user.username) {
    next();
  } else {
    res.status(400).json({ message: "bad request" });
  }
};

app
  .route("/api/users")
  .get(PasswordAuth, (req, res) => {
    const { id } = req.body;
    const user = users.find((user) => user.id == id);

    if (!user) {
      res.status(404).json({ message: "user not fond" });
    } else {
      res.status(200).json(user);
    }
  })
  .post(NewUser, (req, res) => {
    const user = req.body;
    const id = v4();

    users.push({
      id: id,
      username: "",
      password: "",
      gender: null,
      age: null,
      ...user,
    });

    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).end("Something Want Wrong");
      } else {
        res.status(201).json({ status: "success", id: id });
      }
    });
  })
  .patch((req, res) => {
    const { id } = req.body;

    const user = users.find((user) => user.id == id);

    console.log(user);

    res.status(200).json({ status: "success" });
  });

app.listen(PORT, () => {
  console.log(`the server is running at http://localhost:${PORT}`);
});
