import { Schema, model, Document } from 'mongoose';
import { IUser } from './User';
import { IApartment } from './apartment'; // Assuming you have IApartment as the interface in your apartment.model file

interface ILeaseAgreement extends Document {
  user: IUser['_id'];
  apartment: IApartment['_id'];
  startDate: Date;
  endDate: Date;
  rent: number;
}

const leaseAgreementSchema = new Schema<ILeaseAgreement>({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  apartment: { 
    type: Schema.Types.ObjectId, 
    ref: 'Apartment', 
    required: true 
},
  startDate: { 
    type: Date, 
    required: true 
},
  endDate: { 
    type: Date, 
    required: true 
},
//   rent: { 
//     type: Number, 
//     required: true 
// },
});

const LeaseAgreement = model<ILeaseAgreement>('LeaseAgreement', leaseAgreementSchema);
export { LeaseAgreement, ILeaseAgreement };
