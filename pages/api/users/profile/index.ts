import { NextApiResponse } from 'next';
import { FindUserByEmail } from '../../../../shared/constants/types/user-request.type';
import db from '../../../../shared/services/prisma.service';

export default async function handler(
  req: FindUserByEmail,
  res: NextApiResponse
) {
  const profile = await db.userProfile.findFirst({
    where: {
      user: {
        email: req.query.email
      }
    },
    select: {
      apiKey: true
    }
  });
  res.send(profile);
}
