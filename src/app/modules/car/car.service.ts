import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (payload: TCar) => {
  const isCarAlreadyExist = await Car.findOne({ title: payload.model });
  if (isCarAlreadyExist) {
    throw new Error('This Blog is Already Exist ! ');
  }
  const result = await Car.create(payload);
  return result;
};

const getAllCarsFromDB = async () => {
  // use QueryBuilder to construct the query
  const queryBuilder = Car.find();
  return queryBuilder;
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
  updateCarFromDb,
  deleteCarFromDb,
};
