export const numberToString = (num: number) =>
  (!!num && (num.toString() as any)) || null;
