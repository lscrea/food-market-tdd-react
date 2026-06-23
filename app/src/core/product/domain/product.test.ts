import { formatPrice } from "./product";

describe('formatPrice', () => {
  it.each([
    [0, '0,00 €'],
    [1, '0,01 €'],
    [10, '0,10 €'],
    [100, '1,00 €'],
    [1000, '10,00 €'],
    [1234, '12,34 €'],
    [123456, '1234,56 €'],
  ])('should format %d as %s', (price, expected) => {
    expect(formatPrice(price)).toBe(expected);
  });
});