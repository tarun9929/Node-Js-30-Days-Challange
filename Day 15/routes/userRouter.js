import express from "express";
import { createUser, getUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.route("/").post(createUser);

userRouter.post("/login", getUser);

export default userRouter;
