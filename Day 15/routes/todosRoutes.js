import express from "express";
import {
    createTodos,
    getTodos,
    deleteTodo,
    updateTodo,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.route("/").post(createTodos).get(getTodos);

router.route("/:id").delete(deleteTodo).patch(updateTodo);

export default router;
