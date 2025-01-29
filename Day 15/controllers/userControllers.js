import { nanoid } from "nanoid";
import users from "../models/user.models.js";
import { setUser } from "../utils/UserService.js";

async function createUser(req, res) {
    const { fullName, email, password } = req.body;

    try {
        const user = await users.create({
            fullName,
            email,
            password,
        });

        const id = nanoid();
        setUser(id, user);

        res.cookie("user", id);
        res.redirect("/");
    } catch (err) {
        res.redirect("/login");
    }
}

async function getUser(req, res) {
    const { email, password } = req.body;
    console.log(email);
    try {
        const user = await users.find({ email, password });

        if (user.length) {
            console.log(user);
            const id = nanoid();
            setUser(id, user);

            res.cookie("user", id);
            res.redirect("/");
        } else {
            res.redirect("/login");
        }
    } catch (err) {}
}

export { createUser, getUser };
