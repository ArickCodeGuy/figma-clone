/** Shortenes string to be less then maxLength characters */
export function trim(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}
