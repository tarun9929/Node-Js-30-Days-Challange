import todos from "../models/todos.models.js";

async function homePage(req, res) {
    const todo = await todos.find({});
    res.render("home", { todos: todo });
}

function addTodo(req, res) {
    res.render("Add");
}

export { homePage, addTodo };
