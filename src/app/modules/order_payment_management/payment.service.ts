import { Order } from './payment.model';

const paymentSuccessfulIntoDB = async (transactionId: string) => {
  const result = await Order.findOneAndUpdate(
    { transactionId: transactionId },
    { paidStatus: true },
    {
      new: true,
    },
  );

  return result;
};

const getAdminOrderDataFromDB = async (email: string) => {
  // console.log(email);
  const result = await Order.find({
    paidStatus: true,
    'product.authorEmail': email,
  });
  return result;
};

const getUserOrderDataFromDB = async (email: string) => {
  // console.log(email);
  const result = await Order.find({
    paidStatus: true,
    'userInfo.email': email,
  });
  return result;
};

const acceptOrderIntoDB = async (id: string) => {
  const result = await Order.findByIdAndUpdate(id, {
    orderStatus: 'accepted',
  });
  return result;
};
const cancelOrderIntoDB = async (id: string) => {
  const result = await Order.findByIdAndUpdate(id, {
    orderStatus: 'canceled',
  });
  return result;
};
const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const paymentService = {
  paymentSuccessfulIntoDB,
  getAdminOrderDataFromDB,
  getUserOrderDataFromDB,
  acceptOrderIntoDB,
  cancelOrderIntoDB,
  deleteOrderFromDB,
};
