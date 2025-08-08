export type ClassName = string | number | undefined | null;

export function classNameArrayToString(arr: ClassName[]): string {
  return arr
    .map<string>((i) => {
      if (typeof i === 'string') return i;
      if (typeof i === 'number') return String(i);

      return '';
    })
    .filter((i) => i !== undefined && i !== null)
    .join(' ');
}
