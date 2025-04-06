// import needed packages/libraries
import express from "express";

// import controller
import { deleteGoal, getGoal, getGoals, setGoal, updateGoal } from "../controllers/goalController.js";

// create a router instance
const router = express.Router();

router.route('/')
  .post(setGoal)
  .get(getGoals);

router.route('/:id')
  .get(getGoal)
  .patch(updateGoal)
  .delete(deleteGoal)

export { router }