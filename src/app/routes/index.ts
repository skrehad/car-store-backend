import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CarRoutes } from '../modules/car/car.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/car',
    route: CarRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  //   {
  //     path: '/admin',
  //     route: AdminRoutes,
  //   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
