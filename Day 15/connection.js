import mongoose from "mongoose";

async function connectDatabase() {
    return await mongoose.connect("mongodb://127.0.0.1:27017/todos");
}

export default connectDatabase;
