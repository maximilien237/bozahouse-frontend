export interface Testimony {
  id: number;
  createdAt: Date;
  message:  string;
  updatedAt: Date;
  authorUsername: string;
  authorLastname: string;
  authorFirstname: string;
  currentPage: number;
  totalPages: number;
  pageSize: number;

}
