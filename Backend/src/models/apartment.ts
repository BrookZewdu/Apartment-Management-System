import { Schema, model, Document } from "mongoose";
import { IUser } from "./User";
import { IReview } from "./review";

export interface IApartment extends Document {
  name: string;
  price: number;
  description: string;
  ratings: number;
  images: {
    public_id: string;
    url: string;
  }[];
  createdAt: Date;
  reviews: IReview["_id"][];
  available: boolean;
  occupants: IUser["_id"] | null;
}

const ApartmentSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  ratings: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  images: [
    {
      public_id: { 
        type: String, 
        required: true 
      },
      url: { 
        type: String, 
        required: true 
      },
    },
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  available: { type: Boolean, required: true, default: true },
  occupants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  ],
});

const Apartment = model<IApartment>("Apartment", ApartmentSchema);
export default Apartment;
=======
import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from './User';

interface IApartment extends Document {
  name: string;
  address: string;
  available: boolean;
  numberOfRooms: number;
  avatar: {
    public_id: string;
    url: string;
    };
  createdAt: Date;
}

const apartmentSchema = new Schema<IApartment>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, "Name can't be more than 100 characters"],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
    available: {
    type: Boolean,
    required: true,
    default: true,
    },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
}
});

const Apartment = model<IApartment>('Apartment', apartmentSchema);
export { Apartment, IApartment };
