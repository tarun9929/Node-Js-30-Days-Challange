const express = require("express");
const {
  getDataFromDb,
  createUserInDb,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controlers/users");

const router = express.Router();

router
  .route("/")
  .get(getDataFromDb)
  .post(createUserInDb)
  .patch(updateUser)
  .delete(deleteUser);

router.get("/:id", getUserById);

module.exports = router;
