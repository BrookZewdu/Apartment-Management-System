import { Response } from 'express';
import { IUser } from '../models/User';
import { userWithoutPassword } from '../models_methods/user_methods';

// Create the sendTokenResponse function
export const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  // Generate the JWT token using the user's getJwtToken() method
  const token = user.getJwtToken();

  // Set cookie options
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
  };

  // Set the secure flag in the cookie options if in a production environment
  
  const userJSON = userWithoutPassword(user);

  // Send the JWT token as a cookie in the response
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      data: userJSON,
    });
};
