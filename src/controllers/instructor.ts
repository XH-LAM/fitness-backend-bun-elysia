import { Context } from 'elysia';

import SuccessResponse from '../domain/types/generics/SuccessResponse';
import type { Instructor } from '../models/Instructor';
import * as instructorService from '../services/instructor';

export const create = async (context: Context): Promise<SuccessResponse<Instructor>> => {
  const body = context.body as Instructor;

  const data = await instructorService.create(body);

  return {
    data,
    message: 'Instructor created successfully.'
  };
};

export const fetchAll = async () => {
  const instructors = await instructorService.fetchAll();

  return {
    message: 'Instructor fetched successfully.',
    data: instructors
  };
};

export const fetchOne = async (context: Context) => {
  const { id } = context.params;
  const instructor = await instructorService.fetchById(id);

  return {
    message: 'Instructor fetched successfully.',
    data: instructor
  };
};
