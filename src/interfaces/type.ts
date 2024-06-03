import type { ICompany } from "./company";

export interface IType {
  id: number;
  deleted: boolean;
  dateCreate: Date;
  dateUpdate: Date;
  name: string;
  time: Date;
  company: ICompany;
  price: number;
}
