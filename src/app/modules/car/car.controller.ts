import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';

const createCar = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Car is created successfully',
    data: result,
  });
});

const getAllCar = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Cars are find successfully',
    data: result,
  });
});

// for update Car data
const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.updateCarFromDb(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is updated successfully',
    data: result,
  });
});

// for delete Car data
const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CarServices.deleteCarFromDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Car is delete successfully',
    data: [],
  });
});

export const CarController = {
  createCar,
  getAllCar,
  updateCar,
  deleteCar,
};
