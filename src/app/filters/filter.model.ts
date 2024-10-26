import { Record } from '../records/records.model';

export interface Filter {
  serialNumber?: string;
  driverId?: number;
  startDate?: Date | null;
  endDate?: Date | null;
  isApproved?: string;
  plate?: string;
}

export type FilterCondition = ((record: Record) => boolean) | null;
