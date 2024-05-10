import type { ICompany } from "./company";
import type { IExecutor } from "./executor";
import type { IType } from "./type";

export interface ISchedule {
  id: string;
  deleted: boolean;
  dateCreate: Date;
  dateUpdate: Date;
  initialTime: Date;
  finalTime: Date;
  type: IType;
  company: ICompany;
  executor: IExecutor
}
