import { Record } from './records.model';

export interface Filter {
  serialNumber: string | null | undefined;
  driverId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  isApproved?: boolean;
  plate?: string;
}

export type FilterCondition = ((record: Record) => boolean) | null;
