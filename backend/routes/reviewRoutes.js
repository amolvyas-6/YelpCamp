import express from "express";
import catchAsync from "../utils/catchAsync.js";
import CustomError from "../utils/CustomErrorClass.js";
import checkAuth from "../utils/authentication.js";
import { reviewSchema } from "../schemas.js";
import Campground from "../models/campgroundModel.js";
import Review from "../models/reviewModel.js";
import * as review from "../controllers/review.js";

const router = express.Router({ mergeParams: true });

const validateReviewRequest = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((ele) => ele.message).join(",");
    throw new CustomError(500, msg);
  } else {
    next();
  }
};

router.post(
  "/review",
  checkAuth,
  validateReviewRequest,
  catchAsync(review.createNew)
);

router.get("/review", catchAsync(review.getAllReviews));

router.delete("/review/:reviewId", catchAsync(review.deleteById));

export default router;
