import { PrismaClient } from '@prisma/client';
import { logOptions } from '../constants/logging.data';

const db = new PrismaClient({
  log: logOptions
});

export default db;
