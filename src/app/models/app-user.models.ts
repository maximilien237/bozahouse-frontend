
export interface AppUser {

  id?: number;
  account: string;
  howKnowUs: string;
  lastname: string;
  firstname: string;
  sex: string;
  email: string ;
  password: string ;
  birthday: Date;
  acceptTerms: boolean;

  name?: string;
  web?: string;
  linkedin?: string;
  logo?: any;

  enterpriseId?: number;

  createdAt?: Date;
  countConnexion?: number;
  lastConnexion?: Date;



}

