import { describe, expect, it } from '@jest/globals';

import { app } from '../src/app';
import config from '../src/config';
import { getRequest } from '.';

describe('Elysia', () => {
  it('return a response', async () => {
    const response = await app.handle(getRequest('/')).then(res => res.json());
    // console.log("response :",response)
    // console.log("response :",config.app.name)
    // console.log("response :",config.app.version)
    expect(response).toMatchObject({
      name: config.app.name,
      version: config.app.version
    });
  });
});
