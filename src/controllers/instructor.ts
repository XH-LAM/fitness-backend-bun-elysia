import { Context } from 'elysia';

import { ContextWithUser } from '../domain/types/extends/ContextWithUser';
import SuccessResponse from '../domain/types/generics/SuccessResponse';
import LoggedInUser from '../domain/types/LoggedInUser';
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
  const users = await instructorService.fetchAll();

  return {
    message: 'Instructor fetched successfully.',
    data: users
  };
};

export const fetchOne = async (context: Context) => {
  const { id } = context.params;
  const user = await instructorService.fetchById(id);

  return {
    message: 'Instructor fetched successfully.',
    data: user
  };
};
