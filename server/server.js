import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
import colors from "colors";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.blue.italic.bold)
);
