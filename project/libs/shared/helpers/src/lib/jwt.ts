import { IUser, ITokenPayload } from '@project/core';

export function createJWTPayload(user: IUser): ITokenPayload {
  return {
    sub: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}
