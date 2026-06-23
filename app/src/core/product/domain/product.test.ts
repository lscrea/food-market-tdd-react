import { formatPrice, normalizeText } from "./product";

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


describe('normalizeText', () => {
    it('passe en minuscules', () => {
        expect(normalizeText('Pomme')).toBe('pomme');
    });
    
    it('retire les accents pour comparer "Café" et "cafe"', () => {
        expect(normalizeText('Café')).toBe(normalizeText('cafe'));
    });

    it('retire toutes les diacritiques courantes', () => {
        expect(normalizeText('Crème brûlée à l’ancienne')).toBe('creme brulee a l’ancienne');
    });
});
