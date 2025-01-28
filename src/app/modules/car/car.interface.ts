export type TCar = {
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible';
  description: string;
  stock: number;
  availability: boolean;
  image?: string;
};
