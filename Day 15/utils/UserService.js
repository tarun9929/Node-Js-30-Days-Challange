const UserService = new Map();

function setUser(id, user) {
    UserService.set(id, user);
}

function getUser(id) {
    return UserService.get(id);
}

export { setUser, getUser };
