import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TLoginUser, TRegisterUser } from './auth.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { createToken, loginUserEmail } from './auth.utils';
import { UserRegister } from './auth.model';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist

  const user = await UserRegister.isUserExistsEmail(payload?.email);

  //console.log('user', user);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  // checking if the password is correct
  if (
    !(await UserRegister.isPasswordMatched(payload?.password, user?.password))
  )
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client
  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  //console.log(jwtPayload);

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const decodedAccessToken = jwt.decode(token) as { email: string };
  const emailFromAccessToken = decodedAccessToken?.email;

  loginUserEmail(emailFromAccessToken);

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    token,
    email: payload.email,
    refreshToken,
  };
};

const registerUser = async (payload: TRegisterUser) => {
  const result = await UserRegister.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserRegister.find();
  return result;
};

const deActiveAccount = async (id: string) => {
  // console.log(id);
  const result = await UserRegister.findByIdAndUpdate(id, { isBlocked: true });
  return result;
};
const makeActiveAccount = async (id: string) => {
  // console.log(id);
  const result = await UserRegister.findByIdAndUpdate(id, { isBlocked: false });
  return result;
};

const changeRoleFromDB = async (userInfo: { role: string; email: string }) => {
  // console.log('service ', userInfo);

  const result = await UserRegister.findOneAndUpdate(
    { email: userInfo.email },
    { role: userInfo.role },
  );
  return result;
};

// const changePassword = async (
//   _id: string,
//   payload: { oldPassword: string; newPassword: string },
// ) => {
//   // checking if the user is exist
//   const user = await UserRegister.findById(_id);
//   console.log('p', user);

//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
//   }
//   // checking if the user is already deleted

//   // checking if the user is blocked

//   //checking if the password is correct

//   // if (!(await UserRegister.isPasswordMatched(payload.oldPassword, user?.password)))
//   //   throw new AppError(
//   //     StatusCodes.FORBIDDEN,
//   //     'Password do not matched',
//   //   );

//   //hash new password
//   // const newHashedPassword = await bcrypt.hash(
//   //   payload.newPassword,
//   //   Number(config.bcrypt_salt_rounds),
//   // );

//   // await UserRegister.findOneAndUpdate(
//   //   {
//   //     id: userData.userId,
//   //     role: userData.role,
//   //   },
//   //   {
//   //     password: newHashedPassword,
//   //     needsPasswordChange: false,
//   //     // for when password is changed
//   //     passwordChangedAt: new Date(),
//   //   },
//   // );

//   return null;
// };

export const AuthServices = {
  loginUser,
  registerUser,
  getAllUserFromDB,
  deActiveAccount,
  makeActiveAccount,
  changeRoleFromDB,
  // changePassword,
};
