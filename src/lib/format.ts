export function formatPrice(amount: number): string {
  return `S/ ${Number.isInteger(amount) ? amount : amount.toFixed(2)}`
}
