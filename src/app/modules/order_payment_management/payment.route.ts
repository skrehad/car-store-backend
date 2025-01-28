import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();

router.post('/success/:tranId', paymentController.paymentSuccess);
router.post('/failed/:tranId', paymentController.paymentFailed);
router.put('/get-admin-order-data', paymentController.getAdminOrderData);
router.put('/get-user-order-data', paymentController.getUserOrderData);

export const paymentRoutes = router;
