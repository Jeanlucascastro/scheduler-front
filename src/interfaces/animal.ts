import type { EAnimalType } from "@/enuns/animal-type";
import type { ICompany } from "./company";

export interface IAnimal {
  id: string;
  deleted: boolean;
  dateCreate: Date;
  dateUpdate: Date;
  name: string;
  age: number;
  weight: number;
  size: number;
  animalType: EAnimalType;
  companyId?: number;
  company?: ICompany;
  note: string;
}
