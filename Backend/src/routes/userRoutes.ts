// all user routes
import express from 'express';
import { signup, completeSignup,login,logout, forgotPassword,resetPassword,getAllUsers,
    updateDetails,updatePassword,getSingleUser,deleteUser,makeApartmentRequest, getApplications, applyForApartment
 } from '../controllers/userControllers';



const router = express.Router();

router.route('/signup').post(signup);
router.route('/verify-email/:token').get(completeSignup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetToken').put(resetPassword);
router.route('/').get(getAllUsers);
router.route('/updatedetails').put(updateDetails);
router.route('/updatepassword').put(updatePassword);
router.route('/applications').get(getApplications);
router.route('/apply/:apartment_id').post(applyForApartment);

export default router;


