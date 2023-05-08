//user wants to register for the apartement model using mongoose
import { Schema, model, Document } from 'mongoose';
import {IUser} from './User';
import {IApartment} from './apartment';
import { ILeaseAgreement } from './LeaseAgreement';

// Define the interface for the Apartment Request model
export interface IApartmentRequest extends Document {
  [x: string]: any;
  user: IUser['_id'];
  apartment: IApartment['_id'];
  status: string;
  createdAt: Date;
  meetingDate:Date;
}

// Define the schema for the Apartment Request model
const ApartmentRequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
    apartment: {
    type: Schema.Types.ObjectId,
    ref: 'Apartment',
    required: true,
    },
    status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
    meetingDate: {
    type: Date,
    required: true,
    },
    });

// Create and export the Apartment Request model
const ApartmentRequest = model<IApartmentRequest>('ApartmentRequest', ApartmentRequestSchema);
export default ApartmentRequest;



