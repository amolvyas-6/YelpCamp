import Campground from "../models/campgroundModel.js";

export const displayAll = async (req, res, next) => {
  const campgrounds = await Campground.find({}).populate("author", "username");
  res.status(200).send(campgrounds);
};

export const createNew = async (req, res, next) => {
  const imageUrls = req.files.map((ele) => ele.path);
  req.body.imageSrc = imageUrls;
  const campground = new Campground(req.body);
  await campground.save();
  res.status(201).send({ status: "Successful" });
};

export const displayById = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id).populate(
    "author",
    "username"
  );
  res.status(200).send(campground);
};

export const deleteById = async (req, res, next) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.status(200).send({ status: "Successful" });
};

export const updateById = async (req, res, next) => {
  const { id } = req.params;
  await Campground.findByIdAndUpdate(id, req.body);
  res.status(201).send({ status: "Successful" });
};
