import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentService } from './payment.service';

const paymentSuccess = catchAsync(async (req, res) => {
  const tranId = req.params.tranId;
  // console.log('Transaction ID:', tranId);
  await paymentService.paymentSuccessfulIntoDB(tranId);

  res.redirect(
    `https://assignment-4-frontend-psi.vercel.app/payment-successful/${req.params.tranId}`,
  );
});
const paymentFailed = catchAsync(async (req, res) => {
  res.redirect(
    `https://assignment-4-frontend-psi.vercel.app/payment-failed/${req.params.tranId}`,
  );
});

const getAdminOrderData = catchAsync(async (req, res) => {
  // console.log(req.body);
  const result = await paymentService.getAdminOrderDataFromDB(req.body.email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order Data find successfully',
    data: result,
  });
});

// const getUserOrderData = catchAsync(async (req, res) => {
//   console.log('controller', req.body); // Check if email is correctly received in body
//   const result = await paymentService.getUserOrderDataFromDB(req.body.email);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Order Data found successfully',
//     data: result,
//   });
//   console.log('controller', result); // Verify the result before sending response
// });

const acceptOrder = catchAsync(async (req, res) => {
  const result = await paymentService.acceptOrderIntoDB(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order accepted successfully',
    data: result,
  });
});
const cancelOrder = catchAsync(async (req, res) => {
  // console.log(req.body);
  const result = await paymentService.cancelOrderIntoDB(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order canceled successfully',
    data: result,
  });
});
const DeleteOrder = catchAsync(async (req, res) => {
  // console.log(req.body);
  const result = await paymentService.deleteOrderFromDB(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const paymentController = {
  paymentSuccess,
  paymentFailed,
  getAdminOrderData,
  // getUserOrderData,
  acceptOrder,
  cancelOrder,
  DeleteOrder,
};
