import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestemp: true }
);

const users = mongoose.model("user", UserSchema);

export default users;
