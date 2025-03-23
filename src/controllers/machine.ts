import { Context } from 'elysia';

import SuccessResponse from '../domain/types/generics/SuccessResponse';
import type { Machine } from '../models/Machine';
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
  const machines = await machineService.fetchAll();

  return {
    message: 'Machines fetched successfully.',
    data: machines
  };
};

export const fetchOne = async (context: Context) => {
  const { id } = context.params;
  const machine = await machineService.fetchById(id);

  return {
    message: 'Machine fetched successfully.',
    data: machine
  };
};
