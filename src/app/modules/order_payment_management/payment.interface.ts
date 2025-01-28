interface Car {
  _id: string; // MongoDB ObjectId as a string
  name: string;
  brand: string;
  model: string;
  category: string;
  description: string;
  image: string;
  availability: boolean;
  stock: number;
  year: number;
  price: number;
  __v: number;
}

interface UserInfo {
  name: string;
  email: string;
  role: string; // e.g., 'user', 'admin', etc.
  iat: number; // Issued at (timestamp)
  exp: number; // Expiry timestamp
}

export interface TOrder {
  _id: string;
  car: Car;
  paidStatus: boolean;
  transactionId: string;
  userInfo: UserInfo;
}
