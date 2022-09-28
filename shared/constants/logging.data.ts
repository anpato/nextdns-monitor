import { Prisma } from '@prisma/client';

export const logOptions: Prisma.LogLevel[] = ['info', 'error', 'query'];
