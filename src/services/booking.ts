import { NotFoundError } from 'elysia';
import ConflictError from '../domain/exceptions/ConflictError';
import MongoServerError from '../domain/exceptions/MongoServerError';
import { Booking } from '../models/Booking';
import { checkMachineAvailability, checkInstructorAvailability, checkCooldown } from '../utils/bookingUtils';

/**
 * Creates a new booking.
 *
 * @param {Booking} payload - The booking data to be created.
 * @returns {Promise<Booking>} A promise that resolves to the created booking.
 * @throws {ConflictError} If a booking with the same data already exists.
 * @throws {Error} If an error occurs while creating the booking.
 */
export async function create(payload: Booking) {
  try {
    // Check if the machine is available
    const isMachineAvailable = await checkMachineAvailability(payload.machineId, payload.startTime, payload.endTime);
    if (isMachineAvailable) {
      throw new ConflictError('Machine is already booked during the selected time.');
    }

    // Check if the instructor is available
    const isInstructorAvailable = await checkInstructorAvailability(payload.instructorId, payload.startTime, payload.endTime);
    if (isInstructorAvailable) {
      throw new ConflictError('Instructor is already booked during the selected time.');
    }

    // Check if the machine has cooldown violation (10 minutes gap)
    const isCooldownViolated = await checkCooldown(payload.machineId, payload.endTime);
    if (isCooldownViolated) {
      throw new ConflictError('The machine has a cooldown period violation.');
    }

    // If all checks pass, create the booking
    const booking = await Booking.create(payload);

    return booking; // Return the created booking

  } catch (e) {
    const error = e as MongoServerError;

    if (error.name === 'MongoServerError' && error.code === 11000) {
      // Handle MongoDB duplicate key error
      throw new ConflictError('Booking already exists.');
    }

    // Rethrow other errors
    throw e;
  }
}

/**
 * Fetches all bookings from the database.
 *
 * @returns {Promise<Booking[]>} A promise that resolves to an array of Booking objects.
 */
export async function fetchAll(): Promise<Booking[]> {
  try {
    return await Booking.find();
  } catch (e) {
    throw new Error('Error fetching bookings.');
  }
}

/**
 * Fetches a booking by id.
 *
 * @param {string} id The id of the booking to fetch.
 * @returns {Promise<Booking>} A promise that resolves to the Booking object.
 * @throws {NotFoundError} If the booking is not found.
 */
export async function fetchById(id: string): Promise<Booking> {
  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      throw new NotFoundError('Booking not found.');
    }

    return booking; // Return the found booking
  } catch (e) {
    throw new Error('Error fetching booking.');
  }
}
