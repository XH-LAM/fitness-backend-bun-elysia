import { Elysia } from 'elysia';

import UnauthorizedError from '../domain/exceptions/UnauthorizedError';

export default (app: Elysia) =>
  // @ts-expect-error This remains valid after JWT is implemented.
  app.derive(async ({ jwt, headers, request }) => {
    // TODO: Fix me later.
    if (request.url.includes('/docs')) {
      return;
    }
    // console.log("headers : ",headers)
    // const user = await jwt.verify(headers.authorization?.split(' ')[1]);
    const user = await jwt.verify(headers.authorization);
    // const user = await jwt.verify('eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3ZGZhOTUyZDU2ZDViOTA0MTQ0NjlmZSIsImV4cCI6MTc0Mjc5NzgxM30.-O0vYzkEyXZit3ld6nZcuguq5pwW8gLc8YBTYd4YT1g');
    // {
    //   "message": "User logged in successfully!",
    //   "data": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3ZGZhOTUyZDU2ZDViOTA0MTQ0NjlmZSIsImV4cCI6MTc0Mjc5NzgxM30.-O0vYzkEyXZit3ld6nZcuguq5pwW8gLc8YBTYd4YT1g"
    // }

    if (!user) {
      throw new UnauthorizedError('Invalid token!');
    }

    return {
      user
    };
  });
