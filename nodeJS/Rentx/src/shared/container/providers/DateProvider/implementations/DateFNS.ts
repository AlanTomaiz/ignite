import {
  add,
  differenceInDays,
  differenceInHours,
  isBefore,
  parseISO,
} from 'date-fns';

import { IDateProvider } from '../IDateProvider';

class DateFNS implements IDateProvider {
  parseIso(date: string): Date {
    return parseISO(date);
  }

  compareIsBefore(start_date: number | Date, end_date: number | Date): boolean {
    return isBefore(start_date, end_date);
  }

  compareInHours(start_date: number | Date, end_date: number | Date): number {
    return differenceInHours(start_date, end_date);
  }

  compareInDays(start_date: number | Date, end_date: number | Date): number {
    return differenceInDays(start_date, end_date);
  }

  addHours(hours: number): Date {
    return add(new Date(), { hours });
  }

  addMinutes(minutes: number): Date {
    return add(new Date(), { minutes });
  }
}

export { DateFNS };
