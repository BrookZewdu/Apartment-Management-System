import jwt,{JwtPayload} from 'jsonwebtoken';

import User from '../models/User';
import { Request, Response, NextFunction } from 'express';


import { IUser } from '../models/User';

export interface RequestWithUser extends Request {
  user?: IUser | null;
}

export const isAuthenticatedUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    console.log('not authenticated');
    return res.status(401).json({ message: 'Login first to access this resource' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  req.user = await User.findById((decoded as JwtPayload).id);
  next();
};


export const authorizeRoles = (...roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as string)) {
      return res.status(403).json({
        message: `Role (${req.user?.role}) is not allowed to access this resource`,
      });
    }
    next();
  };
};

