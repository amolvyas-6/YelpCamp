import express from "express";
import catchAsync from "../utils/catchAsync.js";
import { campgroundSchema } from "../schemas.js";
import CustomError from "../utils/CustomErrorClass.js";
import checkAuth from "../utils/authentication.js";
import * as campground from "../controllers/campground.js";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "YelpCamp",
    transformation: [
      { width: 800, height: 600, crop: "fill" },
      { quality: "auto" },
    ],
  },
});

const upload = multer({ storage: storage });

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
  upload.array("imageSrc"),
  catchAsync(campground.createNew)
  // (req, res, next) => {
  //   console.log(req.files);
  //   res.send({ statusCode: 200, message: "Files Received" });
  // }
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
