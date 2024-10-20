export interface Filter {
  serialNumber?: string;
  driverId?: number;
  startDate?: Date | null;
  endDate?: Date | null;
  isApproved?: string;
  plate?: string;
}
