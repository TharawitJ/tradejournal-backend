import { WinLoseType, SetUpTier } from "@prisma/client";

interface User {
  userId: number;
  username: string;
  email: string;
  hashPassword?: string;
  startFund: number | null;
  addFund: number | null;
  journalRecords?: JournalRecord[];
  entryModels?: EntryModel[];
  fundHistory?: FundHistory[];
}
interface FundHistory {
  fundId: number;
  date: Date;
  userId: number;
  amouth: number;
}

interface EntryModel {
  modelId: number;
  modelName: string;
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
  advantage?: string | null;
  disadvantage?: string | null;
  notes?: string | null;
  feedback?: string | null;
  imageUrl?: string | null;
  winLose?: WinLoseType | "OPEN";
  profitPosition?: number | null;
  currentBalance: number;
  duration?: number | null;
  margin: number;
  riskPerTrade: number;
  leverage: number;
  side: string;
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
