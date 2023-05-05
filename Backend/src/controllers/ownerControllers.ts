import {Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";


  // make user a manager
export const makeManager = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
  
      const user = await User.findById(req.body.id) as IUser;
      user.role = "manager";
      await user.save();
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, data: (error as Error).message });
    }
  }

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