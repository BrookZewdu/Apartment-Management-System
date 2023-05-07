import {Request,Response, NextFunction } from "express";
import User, { IUser } from "../models/User";
import { LeaseAgreement, ILeaseAgreement } from "../models/LeaseAgreement";
import Apartment, { IApartment } from "../models/apartment";
import ApartmentRequest, { IApartmentRequest } from "../models/registerRequest";


// get all tenants
export const getAllTenants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: IUser[] = await User.find({role: "tenant",isTenant: true});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
};

// get all security guards
export const getAllSecurityGuards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: IUser[] = await User.find({role: "security guard"});
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

// make user a security guard
export const makeSecurityGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const user = await User.findById(req.body.id) as IUser;
    user.role = "security guard";
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}

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
    const lease = {
      apartment: apartment._id,
      user: user._id,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    const newLease = await LeaseAgreement.create(lease) as ILeaseAgreement;
    user.isTenant = true;
    await user.save();
    apartment.available = false;
    await apartment.save();
    apartmentRequest.status = "accepted";
    await apartmentRequest.save();
    await newLease.save();
    res.status(200).json({ success: true, data: {apartmentRequest, newLease} });

  }
  catch(error){
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}

// reject a apartment register request
export const rejectApartmentRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const apartmentRequest = await ApartmentRequest.findById(req.params.id) as IApartmentRequest;
    apartmentRequest.status = "rejected";
    await apartmentRequest.save();
    res.status(200).json({ success: true, data: apartmentRequest });
  }
  catch(error){
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}