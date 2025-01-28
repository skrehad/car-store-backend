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

export const paymentService = {
  paymentSuccessfulIntoDB,
  getAdminOrderDataFromDB,
  getUserOrderDataFromDB,
};
