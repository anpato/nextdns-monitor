import { UserProfile } from '@prisma/client';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import db from '../services/prisma.service';

export const SSP_UserApiKey = async (
  ctx: GetServerSidePropsContext
): Promise<Pick<UserProfile, 'apiKey'> | null> => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  console.log(session);
  const userApiKey = await db.user.findUniqueOrThrow({
    where: {
      email: session?.user?.email ?? ''
    },
    include: {
      UserProfile: true
    }
  });

  if (userApiKey) {
    const profile = await db.userProfile.findFirst({
      where: {
        userId: userApiKey?.id
      }
    });

    return userApiKey.UserProfile;
  }
  let err = new Error();
  err.message = 'Profile not found';
  throw err;
};

export const SS_UserApiKey = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Pick<UserProfile, 'apiKey'> | null | void> => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const userApiKey = await db.user.findUniqueOrThrow({
    where: {
      email: session?.user?.email ?? ''
    }
  });

  if (userApiKey) {
    const profile = await db.userProfile.findFirst({
      where: {
        userId: userApiKey?.id
      }
    });

    return profile;
  }

  return res.status(401).send({ message: 'Unauthorized' });
};
