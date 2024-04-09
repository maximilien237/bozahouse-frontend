
export interface AppUser {

  id?: number;
  account: string;
  howKnowUs: string;
  lastname: string;
  firstname: string;
  sex: string;
  username: string ;
  password: string ;
  birthday: Date;
  acceptTerms: boolean;

  createdAt?: Date;
  countConnexion?: number;
  datesConnexion?: string[];



}

