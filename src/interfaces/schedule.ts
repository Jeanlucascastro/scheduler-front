import type { IAnimal } from "./animal";
import type { ICompany } from "./company";
import type { IExecutor } from "./executor";
import type { IType } from "./type";
import type { IUser } from "./user";

export interface ISchedule {
  id: number;
  deleted: boolean;
  dateCreate: Date | null;
  dateUpdate: Date | null;
  initialTime: Date | null;
  finalTime: Date | null;
  type: IType | null;
  company?: ICompany | null;
  executor: IExecutor | null;
  animalName: string;
  user: IUser | null;
  animal: IAnimal | null;
  animalId?: number;
  note: string
  companyId?: number;
  typeId?: number;
 }
