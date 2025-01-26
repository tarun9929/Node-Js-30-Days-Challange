const model = require("../model/users");

async function getDataFromDb(req, res) {
  const users = await model.find({});
  res.status(200).json(users);
}

async function createUserInDb(req, res) {
  try {
    const user = await model.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).end(err.message);
  }
}

async function updateUser(req, res) {
  console.log(req.body.id);
  const user = await model.findByIdAndUpdate(req.body.id, {
    email: req.body.email,
  });
  res.status(200).json(user);
}

async function deleteUser(req, res) {
  const user = await model.findByIdAndDelete(req.body.id);

  res.status(200).json(user);
}

async function getUserById(req, res) {
  const user = await model.findById(req.params.id);
  console.log(user);
  res.status(200).json(user);
}

module.exports = {
  getDataFromDb,
  createUserInDb,
  updateUser,
  deleteUser,
  getUserById,
};
