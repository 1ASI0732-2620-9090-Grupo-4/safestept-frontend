/** Formats a price as US dollars with a comma every three digits, e.g. `$1,234.50`. */
export function formatPrice(price: number): string {
  const fixed = price.toFixed(2);
  const parts = /^(-?)(\d+)\.(\d{2})$/.exec(fixed);
  if (parts === null) {
    // NaN, Infinity or numbers so large that toFixed uses exponent notation
    return `$${fixed}`;
  }
  const [, sign, integer, decimals] = parts;
  const groups: string[] = [];
  for (let end = integer.length; end > 0; end -= 3) {
    groups.unshift(integer.slice(Math.max(0, end - 3), end));
  }
  return `$${sign}${groups.join(',')}.${decimals}`;
}
