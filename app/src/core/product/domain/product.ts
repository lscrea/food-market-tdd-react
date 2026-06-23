export function formatPrice(price: number): string {
    const euros = Math.floor(price / 100);
    const cents = (price % 100).toString().padStart(2, '0');

    return `${euros},${cents} €`;
}