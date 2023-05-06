import mongoose, { Schema, model, Document } from "mongoose";
export interface IApplication extends Document {
  apartmentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  status: string[];
  dateApplied: Date;
}

const ApplicationsSchema: Schema = new Schema({
  apartmentId: {
    type: mongoose.Types.ObjectId,
    ref: "Apartment",
    required: true,
  },
  userId: { 
    type: mongoose.Types.ObjectId,
    ref: "User", 
    required: true 
  },
  status: { 
    type: ['pending', 'approved', 'rejected'], 
    required: true 
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  }
});

const Applications = model<IApplication>("Application", ApplicationsSchema);
export default Applications;
