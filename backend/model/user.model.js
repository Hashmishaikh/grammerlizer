import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    emailVerificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken:{
      type: String
    },
    passwordResetExpires:{
      type: String
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;