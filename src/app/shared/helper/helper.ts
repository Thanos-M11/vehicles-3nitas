export function stringToDate(dateString: string): Date {
  const year = parseInt(dateString.slice(0, 4));
  const month = parseInt(dateString.slice(4, 6)) - 1;
  const day = parseInt(dateString.slice(6, 8));
  return new Date(year, month, day);
}

export function dateToString(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
}

export function isDate(value: any): boolean {
  return value instanceof Date && !isNaN(value.getTime());
}
