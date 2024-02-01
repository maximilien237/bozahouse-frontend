
export interface AppUser {
  id: number;
  account: string;
  howKnowUs: string;
  lastname: string;
  firstname: string;
  sex: string;
  username: string ;
  password: string ;
  confirmPassword: string;
  birthday: Date;
  lastConnexion: Date;
  createdAt: Date;
  firstConnexion: boolean;
  countConnexion: number;
  acceptTerms: boolean;
  isActivated: boolean ;
  roles: string[];


}

