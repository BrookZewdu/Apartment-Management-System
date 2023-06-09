import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import User, { IUser } from "../models/User";
import { sendTokenResponse } from "../utils/sendTokenResponse";
import sendEmail from "../utils/sendEmail";
import cloudinary from "cloudinary";
import * as path from "path";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import { RequestWithUser } from "../authentication/auth";
import Apartment, { IApartment } from '../models/apartment';
import ApartmentRequest,{IApartmentRequest} from '../models/registerRequest';
import { constrainedMemory } from "process";
import validateSignupRequest from "../helpers/validator";
import Applications, { IApplication } from "../models/applications";
import Visitor,{ IVisitor } from "../models/addVisitor";
// Signup controller
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateSignupRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const { email } = req.body;

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) { return res.status(400).json(
      { success: false, message: "User already exists" }); 
    }

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


    const newUser = {
      ...req.body,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.url,
      },
    };
    const user: IUser = new User(newUser);
    const emailVerificationToken = user.generateEmailVerificationToken();

    try {
      await sendEmail({
        to: email,
        subject: "Email Verification Instructions",
        text: `Please use the following link to verify your email: http://apartmentease.onrender.com/api/users/verify-email/${emailVerificationToken}`,
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

    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified) return res.status(401).json({
      message: "Your account has not been verified. Please check your email."
    });

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


//update password controller
export const updatePassword = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await User.findById(req.user?.id)) as IUser;
    
    if (!user) {
      return res.status(400).json({ success: false, data: "Invalid token" });
    }
    
    const isPasswordValid = await user.comparePassword(req.body.currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, data: "Invalid password" });
    }

    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, data: (error as Error).message });
  }
};

// update user details for avatar phone controller
export const updateDetails = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await User.findById(req.user?.id)) as IUser;

    if (!user) {
      return res.status(400).json({ success: false, data: "Invalid token" });
    }
    //distroy old avatar if exist and save new one in cloudinary
    if (req.files) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    const avatar = (req.files as {[fieldname:string]: UploadedFile}).avatar;
    const filePath = path.join("uploads", avatar?.name);
    const result = await cloudinary.v2.uploader.upload(filePath,{
      folder: "User",
      width: 150,
      height: 150,
    });

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    user.phoneNumber = req.body.phone;
    await user.save();
    res.status(200).json({ success: true, data: user });
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

// get single user
export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id) as IUser;
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}

// delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id) as IUser;
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}

// make user a manager
export const makeManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const user = await User.findById(req.params.id) as IUser;
    user.role = "manager";
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}

// make user a security guard
export const makeSecurityGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const user = await User.findById(req.params.id) as IUser;
    user.role = "security guard";
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}




// make a apartment register request
export const makeApartmentRequest = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user = (await User.findById(req.user.id)) as IUser;
    if (!req.user) return res.status(400).json({ message: "Bad request1" });
    const user = req?.user;
    console.log(req.user, user);
    // const i = mongoose.types.ObjectId(req.body.id)
    const apartment = (await Apartment.findById(req.body.id)) as IApartment;
    if (!apartment) return res.status(404).send({message: 'No Apartment'});
      
    
    console.log("apartment", apartment);
    const registerRequest = {
      apartment: apartment._id,
      user: user._id,
      meetingDate: req.body.meetingDate
    };
    const request = (await ApartmentRequest.create(
      registerRequest
    )) as IApartmentRequest;
    await request.save();
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, data: (error as Error).message });
  }
};

export const getApartmentRequests = async (
  req : RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try{
    if (!req.user) return res.status(402).json({message : 'unauthorized'});
    const request = await ApartmentRequest.find({user: req?.user.id}).populate('apartment') as IApartmentRequest[];

    // console.log(req?.user.id, await ApartmentRequest.find({}));
    return res.status(200).json({
      success : true,
      data : request
    });
  } catch(err) {
    return res.status(500).json({ message : 'something went wrong' });
  }
};


// accept a apartment register request and make user a tenant
export const acceptApartmentRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const apartmentRequest = await ApartmentRequest.findById(req.params.id) as IApartmentRequest;
    const user = await User.findById(apartmentRequest.user) as IUser;
    const apartment = await Apartment.findById(apartmentRequest.apartment) as IApartment;
    user.isTenant = true;
    
    await user.save();
    apartment.available = false;
    await apartment.save();
    apartmentRequest.status = "accepted";
    await apartmentRequest.save();
    res.status(200).json({ success: true, data: apartmentRequest });
  }
  catch(error){
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}

// duplicate code 
// export const applyForApartment = async (
//   req: RequestWithUser,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
      
//       if (!req.user) return res.status(401).json({ success: false, data: "Unauthorized" });
  
//       const application = (await Applications.create({
//         userId: req.user?.id,
//         apartmentId: req.params.apartmentId,
//         status: "pending",
//       })) as IApplication;
  
//       return res.status(200).json({ success: true, data: application });

//   } catch (error) {
//     res.status(400).json({ success: false, data: (error as Error).message });
//   }
// };

// export const getApplications = async (
//   req: RequestWithUser,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {

//     if (!req.user) return res.status(401).json({ success: false, data: "Unauthorized" });

//     const applications = (await Applications.find({userId: req.user?.id})
//             .populate('apartmentId')
//             .populate('userId'))  as IApplication[];

//     return res.status(200).json({ success: true, data: applications });
//   } catch (error) {
//     res.status(400).json({ success: false, data: (error as Error).message });
//   }
// }



export const cancelApartmentRequest = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try{
    const request = await ApartmentRequest.findById(req.params.id) as IApartmentRequest;
    if(!request) return res.status(404).json({ success: false, data: "Request not found" });
    await request.remove();
    res.status(200).json({ success: true, data: "Request canceled successfully" });
  }
  catch(error){
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}

export const addVisitor = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try{
    const visitor = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      apartment: req.body.apartment,
      user: req.user?._id,
    }
    const newVisitor = await Visitor.create(visitor) as IVisitor;
    await newVisitor.save();
    res.status(200).json({ success: true, data: newVisitor });
  }
  catch(error){
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}

