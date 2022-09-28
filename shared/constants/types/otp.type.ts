import { NextApiRequest } from 'next';

export interface OTPRequest extends NextApiRequest {
  body: {
    otp: string;
    email: string;
  };
}

export interface UserEmailRequest extends NextApiRequest {
  body: {
    email: string;
  };
}
