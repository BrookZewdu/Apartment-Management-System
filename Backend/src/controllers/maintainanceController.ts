import Maintainance,{ IMaintainance } from '../models/maintainance';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { RequestWithUser } from '../authentication/auth';
import Apartment, { IApartment } from '../models/apartment';

// get all mentainance requests
export const getAllMantainanceRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const maintainanceRequests: IMaintainance[] = await Maintainance.find();
        res.status(200).json({ success: true, data: maintainanceRequests });
    } catch (error) {
        res.status(400).json({ success: false, data: (error as Error).message });
    }
}

// get all accepted mentainance requests
export const getAllAcceptedMaintainanceRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const maintainanceRequests: IMaintainance[] = await Maintainance.find({status: "accepted"});
        res.status(200).json({ success: true, data: maintainanceRequests });
    } catch (error) {
        res.status(400).json({ success: false, data: (error as Error).message });
    }
}

// get all rejected mentainance requests
export const getAllRejectedMantainanceRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const maintainanceRequests: IMaintainance[] = await Maintainance.find({status: "rejected"});
        res.status(200).json({ success: true, data: maintainanceRequests });
    } catch (error) {
        res.status(400).json({ success: false, data: (error as Error).message });
    }
}

// create mentainance request
export const createMantainanceRequest = async (
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
        const apartment = (await Apartment.findOne({occupants: user._id})) as IApartment;
        
        if (!apartment) return res.status(401).json({ success: false, data: "you are not a tenant" });

         const { description, type } = req.body;
        const maintainanceRequest: IMaintainance = await Maintainance.create({ user:req.user?._id, apartment: apartment._id, description, type });
        res.status(200).json({ success: true, data: maintainanceRequest });
    } catch (error) {
        res.status(400).json({ success: false, data: (error as Error).message });
    }
}
export const RejectmaintainanceRequests=async(req:Request,res:Response)=>{
    try {
      const maintainanceRequest = await Maintainance.findById(req.params.id);
      if (!maintainanceRequest) {
        return res.status(404).json({
          success: false,
          data: "mentainance request not found",
        });
      }
      maintainanceRequest.status = "rejected";
      await maintainanceRequest.save();
  
      res.status(200).json({ success: true, data: maintainanceRequest });
    } catch (error) {
      res.status(400).json({ success: false, data: (error as Error).message });
    }
  
  }
  
  export const AcceptMentainanceRequests=async(req:Request,res:Response)=>{
    try {
      const maintainanceRequest = await Maintainance.findById(req.params.id);
      if (!maintainanceRequest) {
        return res.status(404).json({
          success: false,
          data: "mentainance request not found",
        });
      }
      maintainanceRequest.status = "accepted";
      await maintainanceRequest.save();
  
      res.status(200).json({ success: true, data: maintainanceRequest });
    } catch (error) {
      res.status(400).json({ success: false, data: (error as Error).message });
    }
  
  }