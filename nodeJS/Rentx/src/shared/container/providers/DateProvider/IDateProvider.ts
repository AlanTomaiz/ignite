interface IDateProvider {
  parseIso(date: string): Date;
  compareInHours(start_date: Date | number, end_date: Date | number): number;
  compareInDays(start_date: Date | number, end_date: Date | number): number;
  compareIsBefore(start_date: Date | number, end_date: Date | number): boolean;
  addHours(hours: number): Date;
  addMinutes(minutes: number): Date;
}

export { IDateProvider };
