import { Elysia, t } from 'elysia';
import * as instructorController from '../controllers/instructor';

export default (app: Elysia) =>
  app
    // Fetch a single instructor by ID
    .get('/instructors/:id', instructorController.fetchOne)
    
    // Create a new instructor with validation for the request body
    .post('/instructors', instructorController.create, {
      body: t.Object({
        name: t.String({ minLength: 1, maxLength: 256 }),           // Name should be a string
        email: t.String({ minLength: 1, maxLength: 256 }),          // Email should be a string
        phoneNumber: t.String({ minLength: 1, maxLength: 256 }),    // Phone number should be a string
        ratePerHour: t.Number(),                                    // Changed to t.Number since ratePerHour is numeric
      })
    })
    
    // Fetch all instructors
    .get('/instructors', instructorController.fetchAll);
