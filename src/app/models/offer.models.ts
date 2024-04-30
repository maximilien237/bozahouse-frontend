import {Enterprise} from "./Enterprise";

export interface Offer {
  id?: number;
  type?: string;
  title?: string;
  mission?: string;
  skills?: string;
  needPeople?: number;
  domain?: string;
  address?: string;
  tel?: string;
  countryCode?: string;
  whatsAppNumber?: string;
  experience?: string;
  email?: string;
  salary?: string;
  endOffer?: Date;
  valid?: boolean;
  workMode?: string;
  profile?: string;
  duration?: number;
  reference?: string;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  fcb?: string;
  web?: string;
  linkedin?: string;
  contract?: string;
  timeAgo?: string
  candidatureInstruction?: string;
  firstname?: string;

  page?: number;
  size?: number;
  appUserId?: number;
  enterprise?: Enterprise

}

