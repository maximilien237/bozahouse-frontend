import {AppUser} from "./app-user.models";

export interface Subscription {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  endSubscription: Date;
  username: string;
  amount: number;
  isLocked: boolean;
  isActivated: boolean;
  duration: number;
  period: string;
  type: string;
  initiatorLastname: string;
  initiator: AppUser;
  beneficiary: AppUser;
  beneficiaryUsername: string;
  initAmount: number;
  initDuration: number;
  dailyAmount: number;
  numberOfUpdate: number;

  currentPage: number;
  totalPages: number;
  pageSize: number;
  realSize: number;
}
