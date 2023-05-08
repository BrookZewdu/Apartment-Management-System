import { isAuthenticatedUser, authorizeRoles } from "../authentication/auth";
import { authorizeRoleChange } from "../authentication/rolecontrolls";
import { acceptApartmentRequest, getAllSecurityGuards, makeSecurityGuard,
    rejectApartmentRequest,deleteLeaseAgreement,getAllAcceptedApartmentRequests,getAllRejectedApartmentRequests,getAllApartmentRequests,getLeaseAgreementByApartmentId,getAllLeaseAgreements } from "../controllers/managerController";
import express from 'express';
import { getAllMantainanceRequests,getAllAcceptedMaintainanceRequests ,getAllRejectedMantainanceRequests,AcceptMentainanceRequests,RejectmaintainanceRequests} from "../controllers/maintainanceController";
const router = express.Router();

router.route('/allSecurityGuards').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllSecurityGuards);
router.route('/makesSecurityGuard').put(isAuthenticatedUser,authorizeRoles('manager','owner'),authorizeRoleChange,makeSecurityGuard);
router.route('/acceptApartmentRequest/:id').put(isAuthenticatedUser,authorizeRoles('manager','owner'),acceptApartmentRequest);
router.route('/rejectApartmentRequest/:id').put(isAuthenticatedUser,authorizeRoles('manager','owner'),rejectApartmentRequest);
router.route('/deleteLeaseAgreement/:id').delete(isAuthenticatedUser,authorizeRoles('manager','owner'),deleteLeaseAgreement);
router.route('/getAllApartmentRequests').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllApartmentRequests);
router.route('/getAllAcceptedApartmentRequests').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllAcceptedApartmentRequests);
router.route('/getAllRejectedApartmentRequests').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllRejectedApartmentRequests);
router.route('/maintenanceRequest').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllMantainanceRequests);
router.route('/maintenanceRequest/accepted').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllAcceptedMaintainanceRequests)
router.route('/maintenanceRequest/accepted/:id').put(isAuthenticatedUser,authorizeRoles('manager','owner'),AcceptMentainanceRequests)
router.route('/maintenanceRequest/rejected').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllRejectedMantainanceRequests)
router.route('/maintenanceRequest/rejected/:id').put(isAuthenticatedUser,authorizeRoles('manager','owner'),RejectmaintainanceRequests);
router.route('/leaseAgreement').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getLeaseAgreementByApartmentId);
router.route('/getAllLeaseAgreement').get(isAuthenticatedUser,authorizeRoles('manager','owner'),getAllLeaseAgreements);

export default router;