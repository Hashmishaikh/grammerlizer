import User from "../model/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import generateTokenAndSetToken from "../utils/generateToken.js";
import { response } from "express";

export const signupUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    if (confirmPassword != password) {
      return res.status(400).json({ error: "Password not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Users already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      emailVerificationToken,
      isVerified: false,
    });
    if (newUser) {
      // Generate jwt token
      await newUser.save();
      // Generate jwt token
      // await generateTokenAndSetToken(newUser._id, res);
      // Send verification email
      const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${emailVerificationToken}`;
      const verfi = await sendVerificationEmail(email, verificationLink);

      // console.log('verif', verfi)

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        link: verfi,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.log("error in signup controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get emaail verification function
export const verifyEmail = async (req, res) => {
  const { token } = req.body;
  // console.log('token', token);
  if (token === undefined)
    return res.status(400).json({ error: "Invalid token is not defined" });
  try {
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.log("error in verifyEmail controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// send verification email
const sendVerificationEmail = async (email, link) => {
  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "Email Verification",
    html: `<p>Please verify your email by clicking the link below:</p><p><a href="${link}">Verify Email</a></p>`,
  };

  await transporter.sendMail(mailOptions, (err, responces) => {
    if (err) {
      console.log("err in mail sendeing", err);
      return err;
    }
    // console.log("responce email", responces);
    response.end();
  });
  return "Verification link has been sent to your email id";
};

// resend email verification
export const resendVerificationLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "Email is already verified" });
    }

    // Generate new email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = emailVerificationToken;
    await user.save();

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${emailVerificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(200).json({ message: "Verification email resent" });
  } catch (err) {
    console.log("error in resendVerificationLink controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ error: "Please verify your email" });
    }

    const authToken = await generateTokenAndSetToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: authToken,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    // res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out sucessfully" });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "User with that email doesn't exist" });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Update user with reset token and expiry
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetTokenExpiry;
    await user.save();

    // Create reset password link
    // http://localhost:5000/api/auth/verify-email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Configure email transporter (replace with your email service details)
    const transporter = await nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Prepare email content
    const emailContent = `
      <h2>Reset Password for ${user.fullName}</h2>
      <p>You have requested a password reset for your account.</p>
      <p>Click the link below to set a new password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
    `;

    // Send email with reset link

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Password Reset Link",
      html: emailContent,
    };

    await transporter.sendMail(mailOptions, (err, responces) => {
      if (err) {
        console.log("err in mail sendeing", err);
        return err;
      }
      // console.log("responce email", responces);
      response.end();
    });

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// reset password for this
// Reset Password Route (POST) - Assuming a separate route for password reset form submission
export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Find user by reset token (check for expiry as well)
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }, // Check if token is not expired
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password and remove reset token information
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get profile
export const getProfileData = async (req, res) => {
  try {
    const data = await User.findById(req.user._id).select("-password");
    // console.log('messages', data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { previous, password, confirmPassword } = req.body;

    // Validate password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Find user by ID
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" }); // Use 401 for unauthorized access
    }

    // Validate previous password using bcrypt.compare
    const isPreviousPasswordValid = await bcrypt.compare(
      previous,
      user.password
    );
    if (!isPreviousPasswordValid) {
      return res
        .status(401)
        .json({ error: "Your Previous Password is Invalid" });
    }

    // Generate a new salt for increased security
    const salt = await bcrypt.genSalt(10); // Use a cost factor of 10 (adjustable)

    // Hash the new password with the new salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password and remove reset token information (if applicable)
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password Updated successfully" });
  } catch (error) {
    console.error(error);
    // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" }); // Handle unexpected errors gracefully
  }
};

export const updateProfile = async (req, res) => {
  const { fullName } = req.body;
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" }); // Use 401 for unauthorized access
    }
    // Update user password and remove reset token information (if applicable)
    user.fullName = fullName;
    await user.save();
    res.status(200).json({ message: "Profile Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
