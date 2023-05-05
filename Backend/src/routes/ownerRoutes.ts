import { isAuthenticatedUser, authorizeRoles } from "../authentication/auth";
import { getAllUsers, makeManager } from "../controllers/ownerControllers";
import express from 'express';

const router = express.Router();

router.route('/allUsers').get(isAuthenticatedUser,authorizeRoles('owner'),getAllUsers);
router.route('/makesManager').put(isAuthenticatedUser,authorizeRoles('owner'),makeManager);

export default router;