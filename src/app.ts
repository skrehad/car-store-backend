import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import SSLCommerzPayment from 'sslcommerz-lts';

// Import custom modules and middlewares
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import config from './app/config';
import { paymentRoutes } from './app/modules/order_payment_management/payment.route';
import { Order } from './app/modules/order_payment_management/payment.model';
import { Car } from './app/modules/car/car.model';

// Configuration variables
const store_id = config.store_id as string;
const store_passwd = config.store_pass as string;
const is_live = false;

// Initialize Express app
const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(bodyParser.json());

// Application routes
app.use('/api', router);
app.use('/payment', paymentRoutes);

// Test route
app.get('/', async (req: Request, res: Response) => {
  res.send('Server is running');
});

// Payment Order Route
const tran_id = new mongoose.Types.ObjectId().toString();
app.post('/order', async (req: Request, res: Response) => {
  const orderInfo = req.body;

  try {
    // Fetch product details
    const product = await Car.findById({ _id: orderInfo.productId });

    // Prepare payment data
    const userInfo = orderInfo.userInfo;
    const data = {
      total_amount: product?.price, // Ensure product price exists
      currency: 'BDT',
      tran_id: tran_id,
      success_url: `http://localhost:4000/payment/success/${tran_id}`,
      fail_url: `http://localhost:4000/payment/failed/${tran_id}`,
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: product?.name || 'Unknown Product',
      product_category: 'Books',
      product_profile: orderInfo.productId,
      cus_name: userInfo?.name,
      cus_email: userInfo?.email,
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: userInfo?.phone || '01711111111',
      cus_fax: '01711111111',
      ship_name: userInfo?.name || 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    // Initialize payment session
    const apiResponse: any = await sslcz.init(data);

    if (!apiResponse?.GatewayPageURL) {
      throw new Error('Invalid Gateway URL from SSLCommerz');
    }

    res.send({ url: apiResponse.GatewayPageURL });

    // Save order to database
    const finalOrder = {
      product,
      paidStatus: false,
      transactionId: tran_id,
      userInfo,
    };
    await Order.create(finalOrder);
    console.log('Order created successfully:', finalOrder);
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Error handling middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
