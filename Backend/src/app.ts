import express, { Request, Response } from 'express';
import { connectToDatabase } from './config/database';
import cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
import UserRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import fileupload from 'express-fileupload';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
