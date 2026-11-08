import { formatPrice } from './format-price';

describe('formatPrice', () => {
  it('keeps two decimals and no separator below one thousand', () => {
    expect(formatPrice(0)).toBe('$0.00');
    expect(formatPrice(9.5)).toBe('$9.50');
    expect(formatPrice(999.99)).toBe('$999.99');
  });

  it('adds a comma every three digits of the integer part', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
    expect(formatPrice(1234.5)).toBe('$1,234.50');
    expect(formatPrice(1234567.891)).toBe('$1,234,567.89');
  });

  it('keeps the sign of negative amounts', () => {
    expect(formatPrice(-234.5)).toBe('$-234.50');
    expect(formatPrice(-1234.5)).toBe('$-1,234.50');
  });

  it('returns the value as is when it is not a finite number', () => {
    expect(formatPrice(Number.NaN)).toBe('$NaN');
    expect(formatPrice(Number.POSITIVE_INFINITY)).toBe('$Infinity');
    expect(formatPrice(1e21)).toBe('$1e+21');
  });
});
