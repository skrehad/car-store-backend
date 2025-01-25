import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../auth/auth.constant';
import auth from '../../middlewares/auth';
import { CarController } from './car.controller';
import { CarValidation } from './car.validation';
const router = express.Router();

// for create a Car post
router.post(
  '/create-car',
  //   auth(USER_ROLE.admin),
  validateRequest(CarValidation.carValidationSchema),
  CarController.createCar,
);
// for get all Car post
router.get('/', CarController.getAllCar);

// for update a Car post
router.patch(
  '/:id',
  //   auth(USER_ROLE.admin),
  validateRequest(CarValidation.updateCarValidationSchema),
  CarController.updateCar,
);

// for delete a Car post
router.delete('/:id', auth(USER_ROLE.admin), CarController.deleteCar);

export const CarRoutes = router;
