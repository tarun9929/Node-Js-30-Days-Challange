import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
    },
    goalType: {
        type: String,
    },
});

const todos = mongoose.model("todos", todoSchema);

export default todos;
