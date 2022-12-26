import {AppUser} from "./app-user.models";

export interface News {
  id:            number;
  subject:          string;
  frenchContent: string;
  englishContent: string;
  sendingDate: Date;
  createdAt: Date;
  updatedAt: Date;
  user: AppUser;
  username: string;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  realSize: number;
}
