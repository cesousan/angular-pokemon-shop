export function getRandomPrice(multiple = 100): number {
  return Math.ceil(Math.random() * multiple);
}
