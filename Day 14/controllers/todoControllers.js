import todos from "../models/todos.models.js";

async function createTodos(req, res) {
    const { title, priority, isDone, dueDate, goalType } = req.body;

    if (title) {
        try {
            const todo = await todos.create({
                title: title,
                priority: priority,
                isDone: isDone,
                dueDate: dueDate,
                goalType: goalType,
            });

            if (req.headers.accept.includes("text/html")) {
                return res.redirect("/");
            }
            res.status(201).json(todo);
        } catch (err) {
            res.status(500).json({
                message: err.message,
            });
        }
    } else {
        return res.status(400).json({ message: "title is required" });
    }
}

async function getTodos(req, res) {
    try {
        const todo = await todos.find({});

        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({
            message: "something want wrong ! Please try again leter",
        });
    }
}

async function updateTodo(req, res) {
    const id = req.params.id;

    if (id) {
        try {
            const newtodo = await todos.findByIdAndUpdate(id, {
                ...req.body,
            });

            if (newtodo) {
                res.status(200).json("successfully update the todo");
            } else {
                res.status(404).json("can not find todo with the id");
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(400).json({ message: "Please provide a todo id" });
    }
}

async function deleteTodo(req, res) {
    const id = req.params.id;

    if (id) {
        try {
            const response = await todos.findByIdAndDelete(id);

            if (response) {
                res.status(200).json({ message: "todo deleted successfully" });
            } else {
                res.status(404).json({ message: "no todo found with this id" });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json(
                "Can not remove the todo ! Please try again leter"
            );
        }
    } else {
        res.status(400).json({ message: "Please provide todo id" });
    }
}

export { createTodos, getTodos, deleteTodo, updateTodo };
