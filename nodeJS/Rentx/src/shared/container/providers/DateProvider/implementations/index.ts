import { differenceInHours, parseISO } from 'date-fns';
import { IDateProvider } from '../IDateProvider';

class DateProvider implements IDateProvider {
  parseIso(date: string): Date {
    return parseISO(date);
  }

  compareInHours(start_date: number | Date, end_date: number | Date): number {
    return differenceInHours(start_date, end_date);
  }
}

export { DateProvider };
