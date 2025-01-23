const express = require("express");
const fs = require("fs");
let users = require("./users.json");

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));

app
  .route("/api/users")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    const user = req.body;
    console.log(user);
    users.push({ id: users.length + 1, ...user });

    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ status: "Pandding" });
  })
  .patch((req, res) => {
    const update = req.body;
    console.log(update);

    const user = users.find((user) => user.id == update.id);

    if (user) {
      const newData = { ...user, ...update };
      users[update.id - 1] = newData;
      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          console.log(err);
          res.json({ status: "failed" });
        } else {
          res.json({ status: "success" });
        }
      });
    } else {
      res.json({ status: "failed" });
    }
  })
  .delete((req, res) => {
    const id = req.body.id;

    users = users.filter((user) => user.id != id);
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        res.json({ status: "failed" });
      } else {
        res.json({ status: "success" });
      }
    });
  });

app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((element) => {
              return `<li>${element.first_name}</li>`;
            })}
        </ul>
    `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`the server is running at http://localhost:${PORT}`);
});
