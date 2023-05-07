import { isAuthenticatedUser, authorizeRoles } from "../authentication/auth";
import { authorizeRoleChange } from "../authentication/rolecontrolls";
import { acceptApartmentRequest, getAllSecurityGuards, makeSecurityGuard,rejectApartmentRequest } from "../controllers/managerController";
import express from 'express';

const router = express.Router();

router.route('/allSecurityGuards').get(isAuthenticatedUser,authorizeRoles('manager'),getAllSecurityGuards);
router.route('/makesSecurityGuard').put(isAuthenticatedUser,authorizeRoles('manager'),authorizeRoleChange,makeSecurityGuard);
router.route('/acceptApartmentRequest/:id').put(isAuthenticatedUser,authorizeRoles('manager'),authorizeRoleChange,acceptApartmentRequest);
router.route('/rejectApartmentRequest/:id').put(isAuthenticatedUser,authorizeRoles('manager'),authorizeRoleChange,rejectApartmentRequest);

export default router;