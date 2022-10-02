import { NextApiRequest } from 'next';

export interface FindUserByEmail extends NextApiRequest {
  query: {
    email: string;
  };
}

export interface UpdateUserAccount extends FindUserByEmail {
  body: {
    apiKey: string;
    firstName: string;
    lastName: string;
  };
}
