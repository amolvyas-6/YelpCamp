import Joi from "joi";

export const campgroundSchema = Joi.object({
  _id: Joi.allow(),
  title: Joi.string().required(),
  description: Joi.string().max(250).optional().allow(""),
  imageSrc: Joi.required(),
  price: Joi.number().min(0).required(),
  reviews: Joi.array().default([]),
  location: Joi.string().required(),
  author: Joi.string().required(),
  __v: Joi.allow(),
});

export const reviewSchema = Joi.object({
  text: Joi.string().required().max(250),
  rating: Joi.number().min(1).max(5),
  author: Joi.string(),
});
