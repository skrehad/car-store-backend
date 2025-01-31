import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Id is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});
const RegisterValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email format'),
  password: z.string({ required_error: 'Password is required.' }),
  role: z.enum(['admin', 'user']).default('user'),
  isBlocked: z.boolean().default(false),
});

const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: 'Old password is required',
  }),
  newPassword: z.string({ required_error: 'Password is required' }),
});

export const AuthValidation = {
  loginValidationSchema,
  RegisterValidationSchema,
  changePasswordValidationSchema,
};
