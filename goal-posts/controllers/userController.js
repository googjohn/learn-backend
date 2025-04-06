// import model/schema
import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";

// Register a user
const registerUser = async (request, response, next) => {
  const { username, email, password } = request.body;

  // validate the request contents
  if (!username || !email || !password) {
    const error = new Error("Please fill in the input fields");
    error.statusCode = 400;
    throw error;
  }
  try {
    const user = await User({
      username,
      email,
      password
    })

    const newUser = await user.save();

    response
      .status(201)
      .json({
        message: "New user created successfully",
        data: {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password
        }
      })
    console.log("Register request completed", newUser)
  } catch (error) {
    console.error(error);
    next(error)
  }
}

// Login user
const loginUser = async (request, response, next) => {
  const { username, password } = request.body;
  try {
    console.log("Login user request")
    response
      .status(200)
      .json({
        message: "Login request received"
      })
  } catch (error) {
    console.error(error);
    next(error)
  }
}

// Get users data
const getUsers = async (request, response, next) => {
  try {
    const users = await User.find({}).select('-password');
    // if there are no users we return a response immediately instead
    // of throwing error because this is technically not an error but
    // absense of data/document
    if (!users.length) {
      return response
        .status(404)
        .json({
          message: "No users found",
          data: users
        })
    }

    response
      .status(200)
      .json({
        message: "Users found",
        count: users.length,
        data: users
      })
    console.log("Get user request done.", users);
  } catch (error) {
    console.error(error);
    next(error)
  }
}

// Get user data by id or other property (email/username)
const getUser = async (request, response, next) => {
  const userId = request.params.id;
  if (!userId) {
    const error = new Error("Please use a valid ID.")
    error.statusCode = 400;
    throw error;
  }
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return response.status(404)
        .json({
          mesasge: "User not found",
          data: user
        })
    }

    response
      .status(200)
      .json({
        message: "User found",
        data: user
      })

    console.log("Get user request done", user)
  } catch (error) {
    console.error(error);
    next(error)
  }
}

// Update user data
const updateUser = async (request, response, next) => {
  const { username, email, password } = request.body;
  const userId = request.params.id;
  if (!userId || !isValidObjectId(userId)) {
    const error = new Error("Please use a valid ID.")
    error.statusCode = 400;
    throw error;
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return response
        .status(404)
        .json({
          message: "User doesn't exist.",
          data: user
        })
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;

    const updatedUser = await user.save();

    response
      .status(201)
      .json({
        message: "User updated",
        data: {
          username: updatedUser.username,
          email: updatedUser.email,
          password: password ? "Password change successful" : null
        }
      })

    console.log("Update request done.", updatedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
export { registerUser, loginUser, getUsers, getUser, updateUser }