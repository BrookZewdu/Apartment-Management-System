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
