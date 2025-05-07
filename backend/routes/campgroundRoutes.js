import express from "express";
import Campground from "../models/campgroundModel.js";
import catchAsync from "../utils/catchAsync.js";
import { campgroundSchema } from "../schemas.js";
import CustomError from "../utils/CustomErrorClass.js";
import checkAuth from "../utils/authentication.js";
import * as campground from "../controllers/campground.js";

const router = express.Router();

const validateCampgroundRequest = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((ele) => ele.message).join(",");
    throw new CustomError(500, msg);
  } else {
    next();
  }
};

router.get("/", catchAsync(campground.displayAll));

router.post(
  "/",
  checkAuth,
  validateCampgroundRequest,
  catchAsync(campground.createNew)
);

router.get("/:id", catchAsync(campground.displayById));

router.delete("/:id", checkAuth, catchAsync(campground.deleteById));

router.patch(
  "/:id",
  checkAuth,
  validateCampgroundRequest,
  catchAsync(campground.updateById)
);

export default router;
