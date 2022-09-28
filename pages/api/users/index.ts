import { NextApiResponse } from 'next';
import { FindUserByEmail } from '../../../shared/constants/types/user-request.type';
import db from '../../../shared/services/prisma.service';

export default async function handler(
  req: FindUserByEmail,
  res: NextApiResponse
) {
  const { email } = req.query;

  const user = await db.user.findUnique({
    where: {
      email
    }
  });
  res.send(user);
}
