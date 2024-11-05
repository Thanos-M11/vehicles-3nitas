import { FormControl } from '@angular/forms';

export interface VehicleRecordForm {
  serialNumber: FormControl<string | null>;
  fullName: FormControl<string | null>;
  plate: FormControl<string | null>;
  issueDate: FormControl<string | Date | null>;
  isApproved: FormControl<boolean | null>;
  tierAmount: FormControl<number | null>;
  registrationAmount: FormControl<number | null>;
  consumptionAmount: FormControl<number | null>;
  rewardAmount: FormControl<number | null>;
}
