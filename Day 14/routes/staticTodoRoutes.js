import express from "express";
import { homePage, addTodo } from "../controllers/staticTodoControllers.js";

const staticRouter = express.Router();

staticRouter.get("/", homePage);

staticRouter.get("/form", addTodo);

export default staticRouter;
