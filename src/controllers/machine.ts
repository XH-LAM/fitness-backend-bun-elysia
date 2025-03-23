import { Context } from 'elysia';

import { ContextWithUser } from '../domain/types/extends/ContextWithUser';
import SuccessResponse from '../domain/types/generics/SuccessResponse';
import LoggedInUser from '../domain/types/LoggedInUser';
import type { Machine } from '../models/machine';
import * as machineService from '../services/machine';

export const create = async (context: Context): Promise<SuccessResponse<Machine>> => {
  const body = context.body as Machine;

  const data = await machineService.create(body);

  return {
    data,
    message: 'Machine created successfully.'
  };
};

export const fetchAll = async () => {
  const users = await machineService.fetchAll();

  return {
    message: 'Machines fetched successfully.',
    data: users
  };
};

export const fetchOne = async (context: Context) => {
  const { id } = context.params;
  const user = await machineService.fetchById(id);

  return {
    message: 'Machine fetched successfully.',
    data: user
  };
};
