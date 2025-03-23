import { Elysia, t } from 'elysia';
import * as machineController from '../controllers/machine';

export default (app: Elysia) =>
  app
    // Fetch a single machine by ID
    .get('/machines/:id', machineController.fetchOne)
    
    // Create a new machine with validation for the request body
    .post('/machines', machineController.create, {
      body: t.Object({
        machineType: t.String({ minLength: 1, maxLength: 256 }),      // The type of the machine (e.g., treadmill, bike)
        location: t.String({ minLength: 1, maxLength: 256 }),         // The location of the machine (e.g., gym room or section)
        description: t.String({ minLength: 1, maxLength: 512 }),      // A brief description of the machine (e.g., model, features)
      })
    })
    
    // Fetch all machines
    .get('/machines', machineController.fetchAll);
