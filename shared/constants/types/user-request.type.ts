import { NextApiRequest } from 'next';

export interface FindUserByEmail extends NextApiRequest {
  query: {
    email: string;
  };
}
