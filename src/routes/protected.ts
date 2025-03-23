import { Elysia } from 'elysia';

import * as authController from '../controllers/auth';
import authPlugin from '../plugins/authenticate';
import userRoutes from '../routes/user';
import instructorRoutes from '../routes/instructor';
import machineRoutes from '../routes/machine';
import bookingRoutes from '../routes/booking';


export default (app: Elysia) => 
    app
    // .use(authPlugin)
    .use(userRoutes)
    .use(instructorRoutes)
    .use(machineRoutes)
    .use(bookingRoutes)
    .post('/logout', authController.logout);
