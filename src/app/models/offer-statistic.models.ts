export interface OfferStatistic{

  id: number;
  createdAt: Date;
  totalOffer: number;
  totalOfferPerDay: number;
  totalOfferValid: number;
  totalOfferNotValid: number;

  currentPage: number;
  totalPages: number;
  pageSize: number;
  realSize: number;
}
