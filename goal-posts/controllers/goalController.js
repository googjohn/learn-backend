// import needed model
// import {  } from "../models/goal.model.js";
import mongoose, { isValidObjectId } from "mongoose";
import Goals from "../models/goal.model.js";

const setGoal = async (request, response, next) => {
  const text = request.body.text;

  try {
    // validate if text exists
    if (!text) {
      const error = new Error('Please write something!');
      error.statusCode = 400;
      throw error;
    }

    // create the new goal and save
    const newGoal = new Goals({ text });

    await newGoal.save();

    response.status(201).json({
      message: "Goal successfully created!",
      data: newGoal
    })

    console.log("Goal created. ", newGoal)
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const getGoals = async (request, response, next) => {
  try {
    const goals = await Goals.find({});
    if (!goals.length) {
      const error = new Error("There are no goals entry yet");
      error.statusCode = 404;
      throw error;
    }

    response
      .status(200)
      .json({
        message: "Goals found",
        data: goals
      })

    console.log('Get request successful.')
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const getGoal = async (request, response, next) => {
  const goalId = request.params.id;
  try {
    if (!goalId || !mongoose.Types.ObjectId.isValid(goalId)) {
      const error = new Error("Goal Id not valid. Please use a valid id.");
      error.statusCode = 400;
      throw error;
    }

    const goal = await Goals.findById(goalId);

    if (!goal) {
      return response
        .status(404)
        .json({
          message: "Goal not found",
          data: goal
        })
    }

    response
      .status(200)
      .json({
        message: "Goal found.",
        data: goal
      })

    console.log("Get goal request successful")
  } catch (error) {
    console.error(error);
    next(error)
  }
}

const updateGoal = async (request, response, next) => {
  const goalId = request.params.id;
  const text = request.body.text;
  try {
    // validate id first
    if (!isValidObjectId(goalId) || !goalId) {
      const error = new Error("Goal Id not valid. Please use a valid id.")
      error.statusCode = 400;
      throw error;
    }

    // lets find the goal using the id. we can also use findByIdAndUpdate() method
    const goal = await Goals.findById(goalId);

    // return a response instead of throwing an error
    if (!goal) {
      return response
        .status(404)
        .json({
          message: "Document not found",
          data: goal
        })
    }

    goal.text = text;

    const updatedGoal = await goal.save();

    response
      .status(200)
      .json({
        message: "Goal has been updated successfully",
        data: updatedGoal
      })
    console.log("Update request successful", updatedGoal)


  } catch (error) {
    console.error(error);
    next(error);
  }
}

const deleteGoal = async (request, response, next) => {
  const goalId = request.params.id;
  console.log(goalId)
  try {
    if (!goalId) {
      console.log("Babasahin ba ako? goalID check if null or undefined")
      const error = new Error("Please put valid goal id")
      error.statusCode = 400;
      throw error;
    }

    if (!isValidObjectId(goalId)) {
      console.log("check goalId validity")
      const error = new Error("Goal Id not valid.");
      error.statusCode = 400;
      throw error;
    }

    // returns null if no document found in the collection
    const isDeleted = await Goals.findOne({ _id: goalId })
    const deletedGoal = await Goals.findByIdAndDelete(goalId);

    // this seems like an error because the document isn't found
    // we actually should send a response instead of throwing an error
    // because this is not an actual error but rather a result of deleting/deleted document
    if (!isDeleted || !deletedGoal) {
      response
        .status(200)
        .json({
          message: "Goal was successfully deleted",
          data: deletedGoal,
        })
    }

    console.log("Delete request successful");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export { setGoal, getGoals, getGoal, updateGoal, deleteGoal }