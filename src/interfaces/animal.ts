import type { EAnimalType } from "@/enuns/animal-type";

export interface IAnimal {
  id: string;
  deleted: boolean;
  dateCreate: Date;
  dateUpdate: Date;
  name: string;
  age: number;
  weight: number;
  size: number;
  animalType: EAnimalType
}
