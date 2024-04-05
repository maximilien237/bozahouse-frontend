
export interface AppUser {

  id: string;
  account: string;
  howKnowUs: string;
  lastname: string;
  firstname: string;
  sex: string;
  email: string;
  username: string ;
  password: string ;
  confirmPassword: string;
  birthday: Date;
  promoCode: string;
  referralCode: string;
  discountDate: Date;
  lastConnexion: Date;
  createdAt: Date;
  firstConnexion: boolean;
  countConnexion: number;
  activatedHostSubscription: boolean;
  activatedNormalSubscription: boolean;
  acceptTerms: boolean;
  hostSubscriptionCounter: number;
  normalSubscriptionCounter: number;
  isLock: boolean;
  isActivated: boolean ;
  roles: string[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  realSize: number;

}

