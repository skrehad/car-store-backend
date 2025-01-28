import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();

router.post('/success/:tranId', paymentController.paymentSuccess);
router.post('/failed/:tranId', paymentController.paymentFailed);
router.put('/get-admin-order-data', paymentController.getAdminOrderData);

export const paymentRoutes = router;
