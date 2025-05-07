import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  text: {
    type: String,
    required: "Review Text is required",
  },
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
});

const Review = mongoose.model("review", reviewSchema);
export default Review;
