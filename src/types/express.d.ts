import { WinLoseType, SetUpTier } from "@prisma/client";

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
  fundHistory?: FundHistory[];
}
interface FundHistory {
  id: number;
  date: Date;
  userUserId: number;
}

interface EntryModel {
  id: number;
  name: string;
  userId: number;
  journals: JournalRecord[];
}

interface Asset {
  assetId: number;
  assetName: string;
  journals: JournalRecord[];
}

interface JournalRecord {
  recordId: number;
  userId: number;
  assetId: number;
  entryModelId: number;
  setUpTier: SetUpTier;
  entryDateTime?: Date;
  exitDateTime?: Date;
  entryPrice: number;
  SL: number;
  TP: number;
  advantage?: string;
  disadvantage?: string;
  notes?: string;
  feedback?: string;
  imageUrl?: string;
  winLose?: WinLoseType;
  profitPosition?: number;
  currentBalance: number;
  duration?: number;
  margin: number;
  riskPerTrade: number;
  leverage:number;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
      journalRecord?: JournalRecord;
      fundHistory?: FundHistory;
      entryModel?: EntryModel;
      asset?: Asset;
    }
  }
}
