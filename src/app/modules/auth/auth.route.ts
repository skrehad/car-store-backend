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

export const AuthRoutes = router;
