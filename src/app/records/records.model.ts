export interface Record {
  serialNumber: string;
  fullName: string;
  driverId: number;
  plate: string;
  issueDate: string;
  isApproved: boolean;
  tierAmount: number;
  registrationAmount: number;
  consumptionAmount: number;
  rewardAmount: number;
}

export type RecordState = Record[];
