export function formatDate(dateString: string): Date {
  // console.log(dateString);
  const cleanedDate = dateString.trim();
  const year = cleanedDate.slice(0, 4);
  const month = cleanedDate.slice(4, 6);
  const day = cleanedDate.slice(6, 8);
  return new Date(`${year}-${month}-${day}`);
}
