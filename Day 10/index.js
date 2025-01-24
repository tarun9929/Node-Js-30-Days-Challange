const express = require("express");
const fs = require("fs");
const users = require("./users.json");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()} ${req.url} ${req.method}\n`,
    (err) => {
      if (err) {
        return res.end("something want wrong");
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
    return res.end("<h1> Not Authorzie </h1>");
  }
};

const NewUser = (req, res, next) => {
  const user = req.body;

  if (user.password && user.username) {
    next();
  } else {
    res.json({ message: "please enter your username and password" });
  }
};

app
  .route("/api/user")
  .get(PasswordAuth, (req, res) => {
    return res.json(req.user);
  })
  .post(NewUser, (req, res) => {
    const user = req.body;

    users.push({
      id: users.length + 1,
      username: "",
      password: "",
      gender: null,
      age: null,
      ...user,
    });

    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        res.end("Something Want Wrong");
      } else {
        res.json({ status: "success" });
      }
    });
  })
  .patch((req, res) => {
    const { id } = req.body;

    const user = users.find((user) => user.id == id);

    console.log(user);

    res.json({ status: "success" });
  });

app.listen(PORT, () => {
  console.log(`the server is running at http://localhost:${PORT}`);
});
