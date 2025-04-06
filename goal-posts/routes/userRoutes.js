// import needed packages/libraries
import express from "express";

// instantiate a router
const router = express.Router();

// import router handler/ controller
import {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  updateUser
} from "../controllers/userController.js";

// register user router
router.route("/register")
  .post(registerUser)

// login user router
router.route("/login")
  .post(loginUser)

// get users data
router.route("/")
  .get(getUsers)

// get user data
router.route("/:id")
  .get(getUser)
  .put(updateUser)

export { router }