import mongoose, { model } from 'mongoose';
import { TOrder } from './payment.interface';

// Product Schema
const ProductSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [4, 'Name name must be at least 4 characters long'],
    maxlength: [50, 'Name name must be at most 15 characters long'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    minlength: [4, 'Brand name must be at least 4 characters long'],
    maxlength: [50, 'Brand name must be at most 15 characters long'],
    trim: true,
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1886, 'Year must be 1886 or later'],
    max: [new Date().getFullYear(), 'Year cannot be in the future'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  category: {
    type: String,
    enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
    required: [true, 'Category is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  image: { type: String, default: '' },
  stock: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be a non-negative number'],
  },
  availability: {
    type: Boolean,
    required: [true, 'In stock status is required'],
  },
});

// UserInfo Schema
const UserInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'], // Add roles as needed
  },
  iat: {
    type: Number,
    required: true,
  },
  exp: {
    type: Number,
    required: true,
  },
});

// Order Schema
const OrderSchema = new mongoose.Schema({
  product: {
    type: ProductSchema,
    required: true,
  },
  paidStatus: {
    type: Boolean,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  userInfo: {
    type: UserInfoSchema,
    required: true,
  },
});

export const Order = model<TOrder>('Order', OrderSchema);
