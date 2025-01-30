import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();

router.post('/success/:tranId', paymentController.paymentSuccess);
router.post('/failed/:tranId', paymentController.paymentFailed);
router.put('/get-order-data', paymentController.getAdminOrderData);
// router.put('/get-user-order-data', paymentController.getUserOrderData);
router.put('/accept-order', paymentController.acceptOrder);
router.put('/cancel-order', paymentController.cancelOrder);
router.put('/delete-order', paymentController.DeleteOrder);

export const paymentRoutes = router;
