export interface SubscriptionStatistic {
  id:            number;
  createdAt:          Date;
  totalSubscription: number;
  totalDailyAmount: number;
  totalAmount: number;
  numberOfSubscriptionPerDay: number;
  totalNumberOfSubscription: number;

  currentPage: number;
  totalPages: number;
  pageSize: number;
  realSize: number;
}
