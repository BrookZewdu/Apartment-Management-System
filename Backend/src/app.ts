import express, { Request, Response } from 'express';
import { connectToDatabase } from './config/database';
import cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
import UserRoutes from './routes/userRoutes';
import ApartmentRoutes from './routes/apartmentRoutes';
import CommonRoutes from './routes/commonRoutes';
import GuardRoutes from './routes/guardRoutes';
import OwnerRoutes from './routes/ownerRoutes';
import ManagerRoutes from './routes/managerRoutes';
import cookieParser from 'cookie-parser';
import fileupload from 'express-fileupload';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

connectToDatabase();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileupload());
app.use('/api/users', UserRoutes);
app.use('/api/apartments', ApartmentRoutes);
app.use('/api/common', CommonRoutes);
app.use('/api/guard', GuardRoutes);
app.use('/api/owner', OwnerRoutes);
app.use('/api/manager', ManagerRoutes);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});