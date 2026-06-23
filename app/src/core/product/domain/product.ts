export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  quantityMax: number;
};

export function formatPrice(price: number): string {
    const euros = Math.floor(price / 100);
    const cents = (price % 100).toString().padStart(2, '0');

    return `${euros},${cents} €`;
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}


