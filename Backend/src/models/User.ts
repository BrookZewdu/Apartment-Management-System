//user model using mongoose schema and interface it has ref to lease agreement model if tenant
import mongoose, { Schema, Document } from "mongoose";

import { ILeaseAgreement } from "./LeaseAgreement";
import { comparePassword, getJwtToken, getResetPasswordToken,generateEmailVerificationToken } from '../models_methods/user_methods';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  fatherName: string;
  grandFatherName: string;
  phoneNumber: string;
  email: string;
  password: string;
  isTenant: boolean;
  isVerified: boolean;
  createdAt: Date;
  role: "user" |"tenant" | "manager" | "owner" | "security guard";
  leaseAgreement?: ILeaseAgreement["_id"];
  resetPasswordToken?: string; 
  resetPasswordExpire?: Date; 
  avatar :{
    public_id: string;
    url: string;
  };
  emailVerificationToken?: string;
  emailVerificationTokenExpires?: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
  getJwtToken(): string;
  getResetPasswordToken(): string;
generateEmailVerificationToken(): string;
}

const UserSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true 
},
  fatherName: { 
    type: String, 
    required: true 
},
  grandFatherName: { 
    type: String, 
    required: true 
},
  phoneNumber: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  isTenant: { 
    type: Boolean,
    default: false 
},
isVerified: { 
    type: Boolean, 
    default: false 
},
  createdAt: { 
    type: Date, 
    default: Date.now
},
  role: { 
    type: String, 
    default: "user" 
},
  leaseAgreement: { 
    type: Schema.Types.ObjectId, 
    ref: "LeaseAgreement" 
},
resetPasswordToken: {
    type: String,
},
resetPasswordExpire: {
    type: Date,
},
avatar: {
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
},
emailVerificationToken: {
    type: String,
  },
emailVerificationTokenExpires: {
    type: Date,
  },
});

UserSchema.pre('save', async function (next: () => void) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = comparePassword;
UserSchema.methods.getJwtToken = getJwtToken;
UserSchema.methods.getResetPasswordToken = getResetPasswordToken;
UserSchema.methods.generateEmailVerificationToken = generateEmailVerificationToken;

export default mongoose.model<IUser>("User", UserSchema);
