const express = require("express");

const router = require("./routes/usersRoutes");
const connectDatabase = require("./connection");

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", router);

// connect mongodb
connectDatabase()
  .then(() => {
    console.log("Database has been connected successfully");
  })
  .catch((err) => {
    console.log("Something want wrong\n", err);
  });

app.listen(PORT, () => {
  console.log(`the server is running at http://localhost:${PORT}`);
});
