import CustomError from "./CustomErrorClass.js";

const checkAuth = (req, res, next) => {
  console.log(req.session);
  if (req.session.userId) {
    console.log("Authentication completed");
    return next();
  } else {
    throw new CustomError(500, "Authentication Failed");
  }
};

export default checkAuth;
