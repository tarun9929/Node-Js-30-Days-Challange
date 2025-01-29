import todos from "../models/todos.models.js";

async function homePage(req, res) {
    const todo = await todos.find({});
    res.render("home", { todos: todo });
}

function Signup(req, res) {
    res.render("signup");
}

function Login(req, res) {
    res.render("login");
}

function addTodo(req, res) {
    res.render("Add");
}

export { homePage, addTodo, Signup, Login };
