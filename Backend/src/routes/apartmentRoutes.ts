import express from 'express';
import { isAuthenticatedUser, authorizeRoles } from '../authentication/auth';
import { createApartment,getApartmentById,getApartments,
    updateApartment,deleteApartment,addReview,getFreeApartments,getOccupiedApartments } from "../controllers/apartmentControllers";
import { authorizeRoleChange } from '../authentication/rolecontrolls';

const router = express.Router();

router.route('/createApartment').post(isAuthenticatedUser,authorizeRoles('owner','manager'),createApartment);
router.route('/:id').get(isAuthenticatedUser,getApartmentById);
router.route('/').get(isAuthenticatedUser,getApartments);
router.route('/update/:id').put(isAuthenticatedUser,authorizeRoles('owner','manager'),updateApartment);
router.route('/delete/:id').delete(isAuthenticatedUser,authorizeRoles('manager','owner'),deleteApartment);
router.route('/addReview/:id').put(isAuthenticatedUser,addReview);
router.route('/free/apartment').get(isAuthenticatedUser,getFreeApartments);
router.route('/occupied/apartment').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getOccupiedApartments);

export default router;