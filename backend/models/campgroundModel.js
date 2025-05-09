import mongoose, { mongo, Schema } from "mongoose";
import Review from "./reviewModel.js";

const campgroundSchema = mongoose.Schema({
  title: {
    type: String,
  },
  location: String,
  description: String,
  price: Number,
  imageSrc: [String],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
  },
});

campgroundSchema.post("findOneAndDelete", async function (data) {
  await Review.deleteMany({ _id: { $in: data.reviews } });
});

const Campground = mongoose.model("campground", campgroundSchema);

export default Campground;
