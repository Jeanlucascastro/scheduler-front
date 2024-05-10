import type { EAvailability } from "@/enuns/availability";
import type { ICompany } from "./company";

export interface IExecutor {
  id: string;
  deleted: boolean;
  dateCreate: Date;
  dateUpdate: Date;
  name: string;
  availability: EAvailability;
  company: ICompany;
}
