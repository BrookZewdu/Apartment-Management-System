import mongoose from 'mongoose';
import { config } from '../config/dev';

export const connect = (url = config.dbUrl) => {{
    return mongoose.connect(url);
}};

