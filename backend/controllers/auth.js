import bcrypt from "bcrypt";
import Account from "../models/accountModel.js";

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Account.findOne({ username });
  if (!user) res.send({ statusCode: 400, message: "account does not exist" });

  if (req.session.userId) {
    res.send({ statusode: 400, message: "User ALready Logged in" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.userId = user._id;
    res.send({ statusCode: 200, message: "Success" });
  } else {
    res.send({
      statusCode: 400,
      message: "Username or password did not match",
    });
  }
};

export const getStatus = (req, res, next) => {
  if (req.session.userId) {
    res.json({
      statusCode: 200,
      message: "Authentication successful",
      userId: req.session.userId,
    });
  } else {
    res.json({ statusCode: 400, message: "Authentication Failed" });
  }
};

export const logout = async (req, res, next) => {
  if (req.session.userId) {
    delete req.session.userId;
    res.send({ statusCode: 200, message: "You have been Logged Out" });
  }
  res.send({ statusCode: 400, message: "You are not yet logged in" });
};


export const register = async (req, res, next) => {
    const { username, password } = req.body;
    const user = Account({ username, password });
    user.save();
    req.session.userId = user._id;
    res.send({ statusCode: 200, message: "Registration done" });
  }