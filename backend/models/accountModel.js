import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const accountSchema = new Schema({
  username: String,
  password: String,
});

accountSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  return next();
});

const Account = mongoose.model("account", accountSchema);
export default Account;
