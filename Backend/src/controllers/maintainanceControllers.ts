import Mentainance,{ IMentainance } from '../models/mentainance';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { RequestWithUser } from '../authentication/auth';

// get all mentainance requests
export const getAllMentainanceRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const mentainanceRequests: IMentainance[] = await Mentainance.find();
        res.status(200).json({ success: true, data: mentainanceRequests });
    } catch (error) {
        res.status(400).json({ success: false, data: (error as Error).message });
    }
}

// get all accepted mentainance requests
export const getAllAcceptedMentainanceRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const mentainanceRequests: IMentainance[] = await Mentainance.find({status: "accepted"});
        res.status(200).json({ success: true, data: mentainanceRequests });
    } catch (error) {
        res.status(400).json({ success: false, data: (error as Error).message });
    }
}

// get all rejected mentainance requests
export const getAllRejectedMentainanceRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const mentainanceRequests: IMentainance[] = await Mentainance.find({status: "rejected"});
        res.status(200).json({ success: true, data: mentainanceRequests });
    } catch (error) {
        res.status(400).json({ success: false, data: (error as Error).message });
    }
}

// create mentainance request
export const createMentainanceRequest = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
       const user = await User.findById(req.user?._id) as IUser;
        if (!user) {
            return res.status(404).json({
                success: false,
                data: "user not found"
            })
        }
         const { apartment, description, type } = req.body;
        const mentainanceRequest: IMentainance = await Mentainance.create({ user:req.user?._id, apartment, description, type });
        res.status(200).json({ success: true, data: mentainanceRequest });
    } catch (error) {
        res.status(400).json({ success: false, data: (error as Error).message });
    }
}
export const RejectMentainanceRequests=async(req:Request,res:Response)=>{
    try {
      const mentainanceRequest = await Mentainance.findById(req.params.id);
      if (!mentainanceRequest) {
        return res.status(404).json({
          success: false,
          data: "mentainance request not found",
        });
      }
      mentainanceRequest.status = "rejected";
      await mentainanceRequest.save();
  
      res.status(200).json({ success: true, data: mentainanceRequest });
    } catch (error) {
      res.status(400).json({ success: false, data: (error as Error).message });
    }
  
  }
  
  export const AcceptMentainanceRequests=async(req:Request,res:Response)=>{
    try {
      const mentainanceRequest = await Mentainance.findById(req.params.id);
      if (!mentainanceRequest) {
        return res.status(404).json({
          success: false,
          data: "mentainance request not found",
        });
      }
      mentainanceRequest.status = "accepted";
      await mentainanceRequest.save();
  
      res.status(200).json({ success: true, data: mentainanceRequest });
    } catch (error) {
      res.status(400).json({ success: false, data: (error as Error).message });
    }
  
  }
