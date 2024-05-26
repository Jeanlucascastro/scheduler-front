export interface ICreateScheduleDTO {
  initialTime: Date | null;
  typeId?: number;
  companyId?: number;
  animalName: string;
  note: string;
  animalId?: number;
}