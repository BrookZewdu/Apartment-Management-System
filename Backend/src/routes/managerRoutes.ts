import { isAuthenticatedUser, authorizeRoles } from "../authentication/auth";
import { authorizeRoleChange } from "../authentication/rolecontrolls";
import { acceptApartmentRequest, getAllSecurityGuards, makeSecurityGuard,
    rejectApartmentRequest,deleteLeaseAgreement,getAllAcceptedApartmentRequests,getAllRejectedApartmentRequests,getAllApartmentRequests,getLeaseAgreementByApartmentId,getAllLeaseAgreements } from "../controllers/managerController";
import express from 'express';
import { getAllMentainanceRequests,getAllAcceptedMentainanceRequests ,getAllRejectedMentainanceRequests,AcceptMentainanceRequests,RejectMentainanceRequests} from "../controllers/mentainanceControllers";
const router = express.Router();

router.route('/allSecurityGuards').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllSecurityGuards);
router.route('/makesSecurityGuard').put(isAuthenticatedUser,authorizeRoles('manager','owner'),authorizeRoleChange,makeSecurityGuard);
router.route('/acceptApartmentRequest/:id').put(isAuthenticatedUser,authorizeRoles('manager','owner'),acceptApartmentRequest);
router.route('/rejectApartmentRequest/:id').put(isAuthenticatedUser,authorizeRoles('manager','owner'),rejectApartmentRequest);
router.route('/deleteLeaseAgreement/:id').delete(isAuthenticatedUser,authorizeRoles('manager','owner'),deleteLeaseAgreement);
router.route('/getAllApartmentRequests').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllApartmentRequests);
router.route('/getAllAcceptedApartmentRequests').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllAcceptedApartmentRequests);
router.route('/getAllRejectedApartmentRequests').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllRejectedApartmentRequests);
router.route('/maintenanceRequest').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllMentainanceRequests);
router.route('/maintenanceRequest/accepted').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllAcceptedMentainanceRequests)
router.route('/maintenanceRequest/accepted/:id').put(isAuthenticatedUser,authorizeRoles('manager','owner'),AcceptMentainanceRequests)
router.route('/maintenanceRequest/rejected').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllRejectedMentainanceRequests)
router.route('/maintenanceRequest/rejected/:id').put(isAuthenticatedUser,authorizeRoles('manager','owner'),RejectMentainanceRequests);
router.route('/leaseAgreement').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getLeaseAgreementByApartmentId);
router.route('/getAllLeaseAgreement').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllLeaseAgreements);

export default router;