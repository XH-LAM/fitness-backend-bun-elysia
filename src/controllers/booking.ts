import { Context } from 'elysia';

import SuccessResponse from '../domain/types/generics/SuccessResponse';
import type { Booking } from '../models/Booking';
import * as bookingService from '../services/booking';

export const create = async (context: Context): Promise<SuccessResponse<Booking>> => {
  const body = context.body as Booking;

  const data = await bookingService.create(body);

  return {
    data,
    message: 'Booking created successfully.'
  };
};

export const fetchAll = async () => {
  const bookings = await bookingService.fetchAll();

  return {
    message: 'Bookings fetched successfully.',
    data: bookings
  };
};

export const fetchOne = async (context: Context) => {
  const { id } = context.params;
  const booking = await bookingService.fetchById(id);

  return {
    message: 'Booking fetched successfully.',
    data: booking
  };
};
