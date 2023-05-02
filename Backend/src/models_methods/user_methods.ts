import { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export async function comparePassword(this: IUser, enteredPassword: string): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
}

export function getJwtToken(this: IUser): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
}

export function getResetPasswordToken(this: IUser): string {
  const passwordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(passwordToken)
    .digest("hex");
    this.resetPasswordExpire = new Date(Date.now() + 30 * 60 * 1000); 
  return passwordToken;
}
export function generateEmailVerificationToken(this: IUser): string {
    const token = crypto.randomBytes(20).toString("hex");
    this.emailVerificationToken = crypto.createHash("sha256").update(token).digest("hex");
    this.emailVerificationTokenExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    return token;
  };
export function userWithoutPassword(user: IUser): Partial<IUser> {
  const userJSON = user.toJSON();
  delete userJSON.password;
  delete userJSON.emailVerificationToken
  delete userJSON.emailVerificationTokenExpires

  return userJSON;
}

  
