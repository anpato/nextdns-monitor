import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiRequest } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import db from '../../../shared/services/prisma.service';

const user = JSON.parse(process.env.AUTH_USER || '{}');
export const authOptions: NextAuthOptions = {
  secret: '1234',
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/new-user'
  },
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: 'anpato1994@gmail.com',
          pass: process.env.EMAIL_PASSWORD
        }
      }
    })
  ]
};

export default NextAuth(authOptions);
