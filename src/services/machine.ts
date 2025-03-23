import { NotFoundError } from 'elysia';

import ConflictError from '../domain/exceptions/ConflictError';
import MongoServerError from '../domain/exceptions/MongoServerError';
import { Machine } from '../models/machine';

/**
 * Creates a new machine.
 *
 * @param {Machine} payload - The machine data to be created.
 * @returns {Promise<Machine>} A promise that resolves to the created machine.
 * @throws {ConflictError} If a machine with the same data already exists.
 * @throws {Error} If an error occurs while creating the machine.
 */
export async function create(payload: Machine) {
  try {
    // const machine = await Machine.findOne({ email: payload.email });

    // if (machine) {
    //   throw new ConflictError('Machine already exists!');
    // }

    return await Machine.create(payload);
  } catch (e) {
    const error = e as MongoServerError;

    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ConflictError('Machine exists.');
    }

    throw error;
  }
}

/**
 * Fetches all users from the database.
 *
 * @returns {Promise<Machine[]>} A promise that resolves to an array of Machine objects.
 */
export function fetchAll(): Promise<Machine[]> {
  return Machine.find();
}

/**
 * Fetches a machine by id.
 *
 * @param {string} id The id of the machine to fetch.
 * @returns {Promise<Machine>} A promise that resolves array Machine objects.
 */
export async function fetchById(id: string): Promise<Machine> {
  const machine = await Machine.findById(id);

  if (!machine) {
    throw new NotFoundError('Machine not found.');
  }

  return machine;
}
