import { NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { UpdateUserAccount } from '../../../../shared/constants/types/user-request.type';
import db from '../../../../shared/services/prisma.service';

export default async function handler(
  req: UpdateUserAccount,
  res: NextApiResponse
) {
  const userEmail = await db.user.findUnique({
    where: {
      email: req.query.email
    }
  });

  if (userEmail) {
    await db.user.update({
      data: {
        name: `${req.body.firstName} ${req.body.lastName}`
      },
      where: {
        email: userEmail?.email || ''
      }
    });
    const user = await db.userProfile.create({
      data: {
        apiKey: req.body.apiKey,
        userId: userEmail.id
      }
    });

    return res.send(user);
  }

  res.status(401).send({ message: 'Unauthorized' });
}
