// middlewares/authorizeRoleChange.ts
import {  Response, NextFunction } from 'express';
import { RequestWithUser } from './auth';

export const authorizeRoleChange = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const targetRole = req.body.role as string;
  const currentRole = req.user?.role as string;

  if (
    (currentRole === 'manager' &&
      ['tenant', 'guard'].includes(targetRole)) ||
    (currentRole === 'owner' && targetRole === 'manager')
  ) {
    return next();
  }

  return next(
    res.status(403).json({
        message: `Role (${currentRole}) is not allowed to change role to (${targetRole})`,
        }),
  );
};
