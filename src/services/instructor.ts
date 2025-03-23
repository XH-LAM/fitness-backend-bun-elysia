import { NotFoundError } from 'elysia';

import ConflictError from '../domain/exceptions/ConflictError';
import MongoServerError from '../domain/exceptions/MongoServerError';
import { Instructor } from '../models/Instructor';

/**
 * Creates a new instructor.
 *
 * @param {Instructor} payload - The instructor data to be created.
 * @returns {Promise<Instructor>} A promise that resolves to the created instructor.
 * @throws {ConflictError} If a instructor with the same data already exists.
 * @throws {Error} If an error occurs while creating the instructor.
 */
export async function create(payload: Instructor) {
  try {
    // const instructor = await Instructor.findOne({ email: payload.email });

    // if (instructor) {
    //   throw new ConflictError('Instructor already exists!');
    // }

    return await Instructor.create(payload);
  } catch (e) {
    const error = e as MongoServerError;

    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ConflictError('Instructor exists.');
    }

    throw error;
  }
}

/**
 * Fetches all users from the database.
 *
 * @returns {Promise<Instructor[]>} A promise that resolves to an array of Instructor objects.
 */
export function fetchAll(): Promise<Instructor[]> {
  return Instructor.find();
}

/**
 * Fetches a instructor by id.
 *
 * @param {string} id The id of the instructor to fetch.
 * @returns {Promise<Instructor>} A promise that resolves array Instructor objects.
 */
export async function fetchById(id: string): Promise<Instructor> {
  const instructor = await Instructor.findById(id);

  if (!instructor) {
    throw new NotFoundError('Instructor not found.');
  }

  return instructor;
}
