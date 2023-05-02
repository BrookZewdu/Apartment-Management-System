// all user routes
import express from 'express';
import { signup, completeSignup,login,logout, forgotPassword,resetPassword,getAllUsers } from '../controllers/userControllers';



const router = express.Router();

router.route('/signup').post(signup);
router.route('/completesignup/:token').get(completeSignup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetToken').put(resetPassword);
router.route('/').get(getAllUsers);

export default router;


