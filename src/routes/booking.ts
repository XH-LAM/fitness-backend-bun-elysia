import { Elysia, t } from 'elysia';
import * as bookingController from '../controllers/booking';

export default (app: Elysia) =>
  app
    // Fetch a single booking by ID
    .get('/booking/:id', bookingController.fetchOne)
    
    // Create a new booking with validation for the request body
    .post('/booking', bookingController.create, {
      body: t.Object({
        userId: t.String({ 
          match: /^[0-9a-fA-F]{24}$/, // Validates MongoDB ObjectId (24-character hex string)
          message: 'Invalid userId format. Must be a valid MongoDB ObjectId.' 
        }),
        machineId: t.String({ 
          match: /^[0-9a-fA-F]{24}$/, // Validates MongoDB ObjectId (24-character hex string)
          message: 'Invalid machineId format. Must be a valid MongoDB ObjectId.' 
        }),
        instructorId: t.String({ 
          match: /^[0-9a-fA-F]{24}$/, // Validates MongoDB ObjectId (24-character hex string)
          message: 'Invalid instructorId format. Must be a valid MongoDB ObjectId.' 
        }),
        startTime: t.Date(),  // Validates that startTime is a Date
        endTime: t.Date()     // Validates that endTime is a Date
      })
    })
    
    // Fetch all bookings
    .get('/bookings', bookingController.fetchAll);
