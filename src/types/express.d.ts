import { JournalRecord, EntryModel } from '@prisma/client';

interface User {
  userId: number;
  username: string | null;
  email: string | null;
  hashPassword?: string | null;
  startFund: number;
  yourModel: string;
  addFund: number;
  journalRecords?: JournalRecord[];
  entryModels?: EntryModel[];
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
