import { RefreshToken } from '../types';

export const getTokenFromArray = (tokenInArray: { token: RefreshToken }[]): RefreshToken | null => {
  if (!tokenInArray.length) {
    return null;
  }

  const [{ token }] = tokenInArray;

  return token;
};
