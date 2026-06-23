import type { Product } from '../../product/domain/product';


export type CartItem = {
  productId: string;
  name: string;
  priceCents: number;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

export function emptyCart(): Cart {
  return { items: [] };
}

export function addItem(cart: Cart, product: Product, quantity = 1): Cart {
  // Garde-fou : quantité positive obligatoire.
  if (quantity <= 0) {
    return cart;
  }

  // On cherche si une ligne existe déjà pour ce produit.
  // .find(...) retourne l'item OU undefined.
  const existing = cart.items.find((item) => item.productId === product.id);

  if (existing) {
    // Cas 2 — produit déjà présent : on REMAPPE le tableau.
    return {
      items: cart.items.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      ),
    };
  }

  return {
    items: [
      ...cart.items,
      {
        productId: product.id,
        name: product.name,
        priceCents: product.price,
        quantity,
      },
    ],
  };
}