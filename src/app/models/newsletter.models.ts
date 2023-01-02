
export interface News {
  id:            number;
  subject:          string;
  frenchContent: string;
  englishContent: string;
  sendingDate: Date;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  realSize: number;
}
