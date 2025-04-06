// import needed/necessary api's/packages/libraries
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// necessary to use process.env / access our variables
dotenv.config();

// create instance of express
const app = express();

// mount middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// import and use routes
import { router as goalRoutes } from "./routes/goalRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes)

// error handler
import { errorHandler } from "./middlewares/errorHandlerMiddleware.js";
app.use(errorHandler);

// ready port and mongodb uri
const PORT = process.env.PORT || 5500;
const MONGO_URI = process.env.MONGO_URI;

// connect to mongoose
mongoose.connect(MONGO_URI)
  .then(() => {
    const connection = mongoose.connection;
    console.log(`Connected to ${connection.host} ${connection.name} database`);

    // after successful connection to database connect/run server
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    })
  })