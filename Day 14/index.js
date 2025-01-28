import express from "express";
import router from "./routes/todosRoutes.js";
import connectDatabase from "./connection.js";
import path from "path";
import staticRouter from "./routes/staticTodoRoutes.js";

const app = express();
const PORT = process.env.PORT | 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectDatabase()
    .then(() => {
        console.log("database has been connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/todos", router);
app.use("/", staticRouter);

app.listen(PORT, () => {
    console.log(`the server is running at http://localhost:${PORT}`);
});
