import express from 'express';
import { isAuthenticatedUser, authorizeRoles } from "../authentication/auth";

import { acceptVisitor,rejectVisitor } from '../controllers/guardControllers';

const router = express.Router();

router.route('/acceptVisitor/:id').put(isAuthenticatedUser,authorizeRoles('guard'),acceptVisitor);
router.route('/rejectVisitor/:id').put(isAuthenticatedUser,authorizeRoles('guard'),rejectVisitor);

export default router;