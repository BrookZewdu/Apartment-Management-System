import { Document } from 'mongoose';
import { IApartment } from './apartment';
import { IUser } from './User';

export interface IReview extends Document {
  user: IUser["_id"];
  apartment: IApartment["_id"];
  comment: string;
  rating: number;
  createdAt: Date;
}
