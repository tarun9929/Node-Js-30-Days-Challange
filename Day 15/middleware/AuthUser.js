import { getUser } from "../utils/UserService.js";

function checkUser() {
    return (req, res, next) => {
        const user = getUser(req.cookies.user);
        if (!user) return res.redirect("/signup");

        req.user = user;
        next();
    };
}

export { checkUser };
