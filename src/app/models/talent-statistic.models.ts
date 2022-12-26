export interface TalentStatistic{

  id: number;
  createdAt: Date;
  totalTalent: number;
  totalTalentPerDay: number;
  totalTalentValid: number;
  totalTalentNotValid: number;

  currentPage: number;
  totalPages: number;
  pageSize: number;
  realSize: number;
}
