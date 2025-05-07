import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import CustomError from "./utils/CustomErrorClass.js";

import campgroundRoutes from "./routes/campgroundRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 5000;
const sessionOptions = {
  secret: "thisisasecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(session(sessionOptions));

const connectToDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelpCamp");
  console.log("Connected to DB SUCCESSFULLY");
};

app.use("/campground/:id", reviewRoutes);
app.use("/campground", campgroundRoutes);
app.use("/auth", authRoutes);

// app.use((err, req, res, next) => {
//   const { statusCode = 404, message } = err;
//   res.status(statusCode).send({ message });
// });

app.listen(PORT, async () => {
  console.log("server is initialising...");
  try {
    await connectToDB();
    console.log("Server has initialised SUCCESSFULLY");
  } catch (e) {
    console.log("Server ERROR Occurred!");
  }
});
