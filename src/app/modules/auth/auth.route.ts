import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// for login user
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

// for create a new user
router.post(
  '/register',
  validateRequest(AuthValidation.RegisterValidationSchema),
  AuthController.createRegisterUser,
);

router.post('/admin/block-user', AuthController.DeactivateAccount);
router.post('/admin/make-active-user', AuthController.ActivateAccount);

router.get('/admin/get-all-user-information', AuthController.getAllUser);

router.post('/admin/change-user-role', AuthController.ChangeRole);

// router.post(
//   '/change-password',
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthController.changePassword,
// );

export const AuthRoutes = router;
