import { isAuthenticatedUser, authorizeRoles } from "../authentication/auth";
import { authorizeRoleChange } from "../authentication/rolecontrolls";
import { getAllTenants, getSingleUser, deleteUser } from "../controllers/managerController";
import { createApartment,getApartmentById,getApartments,updateApartment,deleteApartment } from "../controllers/apartmentControllers";
import express from 'express';

const router = express.Router();

router.route('/allTenants').get(isAuthenticatedUser,authorizeRoles('manager','security guard'),getAllTenants);
router.route('/user/:id').get(isAuthenticatedUser,authorizeRoles('manager','owner','security guard'),getSingleUser);
router.route('/user/delete/:id').delete(isAuthenticatedUser,authorizeRoles('manager','owner'),authorizeRoleChange,deleteUser);

export default router;