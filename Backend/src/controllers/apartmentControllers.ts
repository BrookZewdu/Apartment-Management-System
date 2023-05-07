import Apartment,{IApartment} from "../models/apartment";
import { Request, Response, NextFunction } from 'express';
import cloudinary from 'cloudinary';
import * as path from 'path';
import * as fs from 'fs';
import { RequestWithUser } from "../authentication/auth";
import { UploadedFile } from "express-fileupload";

// Get all apartments
export const getApartments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apartments:IApartment[] = await Apartment.find();
    res.status(200).json({ success: true, data: apartments });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
};

// Get single apartment by ID
export const getApartmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const apartment = await Apartment.findById(req.params.id) as IApartment;

    if (!apartment) {
      return res.status(404).json({ success: false, message: 'Apartment not found' });
    }

    res.status(200).json({ success: true, data: apartment });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
};

// Create a new apartment
export const createApartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = (req.files as any).images;
    // console.log(files)
    // console.log(req.body)
    const images = [];
    for (const fileKey in files) {
      const file = files[fileKey];
      // console.log(file)
      const filePath = path.join('uploads', file.name);
      await file.mv(filePath);
      console.log(filePath)

      const myCloud = await cloudinary.v2.uploader.upload(filePath, {
        folder: 'Apartment',
      });
       fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
      images.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      });
    }
    req.body.images = images;
    const apartment = await Apartment.create(req.body) as IApartment;
    res.status(201).json({ success: true, data: apartment });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
};

// Update apartment by ID
export const updateApartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apartment = await Apartment.findByIdAndUpdate(req.params.id,req.body,{new:true}) as IApartment;

    if (!apartment) {
      return res.status(404).json({ success: false, message: 'Apartment not found' });
    }

    if (req.files) {
      let files = (req.files as any).images;
      if (files.length == undefined){
        files = [files];
      }
      for (const fileKey in files) {
        const file = files[fileKey];
        const filePath = path.join('uploads', file.name);
        await file.mv(filePath);

        const myCloud = await cloudinary.v2.uploader.upload(filePath, {
          folder: 'Apartment',
          width: 150,
          crop: 'scale',
        });
        fs.unlink(filePath, (err) => {
          if (err) throw err;
        });
        apartment.images.push({
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        });
      }
    }
    if(req.body.public_id){
      await cloudinary.v2.uploader.destroy(req.body.public_id);
    } 



    res.status(200).json({ success: true, data: apartment });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
};

// Delete apartment by ID
export const deleteApartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.id) as IApartment;

    if (!apartment) {
      return res.status(404).json({ success: false, message: 'Apartment not found' });
    }

    res.status(200).json({ success: true, message: 'Apartment deleted' });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
};

// get free apartments
export const getFreeApartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apartments = await Apartment.find({available: true});
    if(!apartments){
      return res.status(404).json({ success: false, message: 'No free apartments' });
    }

    res.status(200).json({ success: true, data: apartments });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}

// get occupied apartments
export const getOccupiedApartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apartments: IApartment[] = await Apartment.find({available: false});
    if(!apartments){
      return res.status(404).json({ success: false, message: 'No occupied apartments' });
    }
    res.status(200).json({ success: true, data: apartments });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}

// add review to apartment
export const addReview = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const apartment = await Apartment.findById(req.params.id) as IApartment;
    if (!apartment) {
      return res.status(404).json({ success: false, message: 'Apartment not found' });
    }
    const review = {
      user : req.user?.id,
      apartment: req.params.id,
      comment: req.body.comment,
      rating: req.body.rating,
      createdAt: new Date().toISOString()
    }
    apartment.reviews.push(review);
    await apartment.save();
    res.status(200).json({ success: true, data: apartment });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
}