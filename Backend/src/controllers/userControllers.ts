import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import User, { IUser } from "../models/User";
import { sendTokenResponse } from "../utils/sendTokenResponse";
import sendEmail from "../utils/sendEmail";
import cloudinary from "cloudinary";
import * as path from "path";
import { UploadedFile } from "express-fileupload";
import fs from "fs";

// Signup controller
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    console.log(req.files);
    const { email } = req.body;

    const avatar = (req.files as { [fieldname: string]: UploadedFile }).avatar;
    //upload image to local storage temporarily
    const filePath = path.join("uploads", avatar.name);
    await avatar.mv(filePath);

    // Upload image to cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(filePath, {
      folder: "User",
      width: 150,
      crop: "scale",
    });

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete temporary file: ${filePath}`, err);
      } else {
        console.log(`Temporary file deleted: ${filePath}`);
      }
    });

    const newuse = {
      ...req.body,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.url,
      },
    };
    const user: IUser = new User(newuse);
    const emailVerificationToken = user.generateEmailVerificationToken();

    try {
      await sendEmail({
        to: email,
        subject: "Email Verification Instructions",
        text: `Please use the following link to verify your email: /verify-email/${emailVerificationToken}`,
      });

      await user.save();

      res.status(200).json({
        success: true,
        message: "Verification email sent. Please check your inbox.",
      });
    } catch (error) {
      user.emailVerificationToken = undefined;
      user.emailVerificationTokenExpires = undefined;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "Email could not be sent",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Email could not be sent",
    });
  }
};

// Email verification controller
export const completeSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid token" });
  }

  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  user.isVerified = true;

  await user.save();
  sendTokenResponse(user, 200, res);
};

// Login controller
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials password" });
      return;
    }

    sendTokenResponse(user, 200, res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//logout controller
export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now()), // Set the cookie to expire in 10 seconds
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
// Forgot password controller
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ success: false, data: "User not found" });
  }

  const resetToken = user.getResetPasswordToken();
  await user.save();

  try {
    await sendEmail({
      to: email,
      subject: "Password Reset Instructions",
      text: `http://localhost:3000/reset-password/${resetToken}`,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res
      .status(500)
      .json({ success: false, data: "Email could not be sent" });
  }
};

// Reset password
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = (await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })) as IUser;

    if (!user) {
      return res.status(400).json({ success: false, data: "Invalid token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, data: (error as Error).message });
  }
};

// get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
};
