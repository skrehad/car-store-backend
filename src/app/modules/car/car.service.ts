import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (payload: TCar) => {
  const isCarAlreadyExist = await Car.findOne({ title: payload.model });
  if (isCarAlreadyExist) {
    throw new Error('This Car is Already Exist ! ');
  }
  const result = await Car.create(payload);
  return result;
};

const getAllCarsFromDB = async () => {
  // use QueryBuilder to construct the query
  const result = await Car.find();
  return result;
};
const getSingleCarsFromDB = async (id: string) => {
  // use QueryBuilder to construct the query
  const result = await Car.findById(id);
  return result;
};

const updateCarFromDb = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCarFromDb = async (id: string) => {
  const result = await Car.findByIdAndDelete(id);
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarsFromDB,
  updateCarFromDb,
  deleteCarFromDb,
};
