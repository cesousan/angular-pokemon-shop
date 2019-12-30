export function getRandomPrice(multiple = 100): number {
  return Math.ceil(Math.random() * multiple);
}

export function getConstantPriceFromStr(str: string): number {
  return str.split('').reduce((acc, curr) => acc + curr.charCodeAt(0), 0)
}
