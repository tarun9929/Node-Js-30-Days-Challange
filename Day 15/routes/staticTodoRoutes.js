import express from "express";
import {
    homePage,
    addTodo,
    Signup,
    Login,
} from "../controllers/staticTodoControllers.js";
import { checkUser } from "../middleware/AuthUser.js";

const staticRouter = express.Router();

staticRouter.get("/", checkUser(), homePage);

staticRouter.get("/form", addTodo);

staticRouter.get("/signup", Signup);

staticRouter.get("/login", Login);

export default staticRouter;
