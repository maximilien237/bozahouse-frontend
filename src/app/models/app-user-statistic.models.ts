export interface AppUserStatistic{
  id: number;
  createdAt: Date;
  totalAppUser: number;
  totalAppUserPerDay: number;
  totalAppUserActivated: number;
  totalAppUserDisabled: number;
  totalAppUserHostSubscription: number;
  totalAppUserNormalSubscription: number;

  currentPage: number;
  totalPages: number;
  pageSize: number;
  realSize: number;
}
