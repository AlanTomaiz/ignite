interface IDateProvider {
  parseIso(date: string): Date;
  compareInHours(start_date: Date | number, end_date: Date | number): number;
}

export { IDateProvider };
