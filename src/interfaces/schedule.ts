import type { IAnimal } from "./animal";
import type { ICompany } from "./company";
import type { IExecutor } from "./executor";
import type { IType } from "./type";
import type { IUser } from "./user";

export interface ISchedule {
  id: string;
  deleted: boolean;
  dateCreate: Date;
  dateUpdate: Date;
  initialTime: Date;
  finalTime: Date;
  type: IType;
  company: ICompany;
  executor: IExecutor;
  animalName: string;
  user: IUser;
  animal: IAnimal;
}
