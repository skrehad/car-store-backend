import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const createRegisterUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is register successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, token } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is login successfully',
    data: {
      token,
    },
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User information find successfully',
    data: result,
  });
});
const DeactivateAccount = catchAsync(async (req, res) => {
  // console.log(req.body.id);
  const result = await AuthServices.deActiveAccount(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Account Deactivate successfully',
    data: result,
  });
});

const ActivateAccount = catchAsync(async (req, res) => {
  // console.log(req.body.id);
  const result = await AuthServices.makeActiveAccount(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Account Activate successfully',
    data: result,
  });
});
const ChangeRole = catchAsync(async (req, res) => {
  // console.log(req.body);
  // console.log(req.body.id);

  const result = await AuthServices.changeRoleFromDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Role Changed successfully',
    data: result,
  });
});

export const AuthController = {
  createRegisterUser,
  loginUser,
  getAllUser,
  DeactivateAccount,
  ActivateAccount,
  ChangeRole,
};
