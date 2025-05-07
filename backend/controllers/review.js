import Campground from "../models/campgroundModel.js";
import Review from "../models/reviewModel.js";

export const createNew = async (req, res, next) => {
  const { id } = req.params;
  const review = req.body;
  const newReview = new Review(review);
  await newReview.save();
  const campground = await Campground.findById(id);
  campground.reviews.push(newReview);
  await campground.save();
  res.status(200).send({ status: "successful" });
};

export const getAllReviews = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id).populate({
    path: "reviews",
    populate: {
      path: "author",
    },
  });
  res.status(200).send(campground.reviews);
};

export const deleteById = async (req, res, next) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.status(200).send({ status: "successful" });
};
