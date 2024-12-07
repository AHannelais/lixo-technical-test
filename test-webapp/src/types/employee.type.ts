import { Vacation } from './vacation.type';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;

  isAvailable?: boolean;

  vacations?: Vacation[];
}
