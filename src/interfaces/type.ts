import type { ICompany } from "./company";

export interface IType {
  id: string;
  deleted: boolean;
  dateCreate: Date;
  dateUpdate: Date;
  name: string;
  time: Date;
  company: ICompany;
}
