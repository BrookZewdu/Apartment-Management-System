import Apartment,{IApartment} from "../models/apartment";
import { Request, Response, NextFunction } from 'express';

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
    const apartment = await Apartment.create(req.body) as IApartment;
    res.status(201).json({ success: true, data: apartment });
  } catch (error) {
    res.status(400).json({ success: false, data: (error as Error).message });
  }
};

// Update apartment by ID
export const updateApartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!apartment) {
      return res.status(404).json({ success: false, message: 'Apartment not found' });
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