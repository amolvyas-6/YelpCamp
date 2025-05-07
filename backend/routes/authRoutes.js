import express from "express";
import catchAsync from "../utils/catchAsync.js";
import Account from "../models/accountModel.js";
import bcrypt from "bcrypt";
import * as auth from "../controllers/auth.js";

const router = express.Router();

router.post("/login", catchAsync(auth.login));

router.get("/status", auth.getStatus);

router.get("/logout", catchAsync(auth.logout));

router.post("/register", catchAsync(auth.register));

export default router;
