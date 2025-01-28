import { z } from 'zod';

// carValidationSchema
export const carValidationSchema = z.object({
  name: z.string().trim().min(4, 'Name is required').max(50),
  brand: z.string().trim().min(4, 'Brand is required').max(50),
  model: z.string().trim().min(4, 'Model is required').max(50),
  year: z
    .number()
    .min(2000, 'Year must be 2000 or later')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  price: z.number().positive('Price must be a positive number'),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({
      message: 'Category must be one of: Sedan, SUV, Truck, Coupe, Convertible',
    }),
  }),
  description: z.string().trim().min(10, 'Description is required').max(200),
  stock: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
  availability: z.boolean(),
});

export const updateCarValidationSchema = z.object({
  name: z.string().trim().min(4, 'Name is required').max(15).optional(),
  brand: z.string().trim().min(4, 'Brand is required').max(15).optional(),
  model: z.string().trim().min(4, 'Model is required').max(15).optional(),
  year: z
    .number()
    .min(2000, 'Year must be 2000 or later')
    .max(new Date().getFullYear(), 'Year cannot be in the future')
    .optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  category: z
    .enum(['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible'], {
      errorMap: () => ({
        message:
          'Category must be one of: Sedan, SUV, Hatchback, Coupe, Convertible',
      }),
    })
    .optional(),
  description: z
    .string()
    .trim()
    .min(5, 'Description is required')
    .max(200)
    .optional(),
  stock: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer')
    .optional(),
  availability: z.boolean().optional(),
});

export const CarValidation = {
  carValidationSchema,
  updateCarValidationSchema,
};
