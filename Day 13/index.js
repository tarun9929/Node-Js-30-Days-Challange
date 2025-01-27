const express = require("express");
const router = require("./routes/userRoutes");
const connectDb = require("./connection");

const app = express();
const PORT = 3000;

connectDb()
  .then(() => {
    console.log("Database has been connected succssfuly");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use("/url", router);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
