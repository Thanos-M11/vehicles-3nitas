export interface Record {
  serialNumber: string;
  fullName: string;
  driverId: number;
  plate: string;
  issueDate: string | Date;
  isApproved: boolean | undefined;
  tierAmount: number;
  registrationAmount: number;
  consumptionAmount: number;
  rewardAmount: number;
}

export type RecordState = Record[];

export type RemovedRecords = { [key: string]: boolean };

export type UpdatedRecords = { [key: string]: Record };
