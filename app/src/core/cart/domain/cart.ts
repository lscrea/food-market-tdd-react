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

  const existing = cart.items.find((item) => item.productId === product.id);

  if (existing) {
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
        priceCents: product.priceCents,
        quantity,
      },
    ],
  };
}

export function removeItem(cart: Cart, productId: string): Cart {
  return {
    items: cart.items.filter((item) => item.productId !== productId),
  };
}

export function updateQuantity(cart: Cart, productId: string, quantity: number): Cart {
  if (quantity <= 0) {
    return removeItem(cart, productId);
  }
  return {
    items: cart.items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item,
    ),
  };
}

export function cartTotal(cart: Cart): number {
  return cart.items.reduce((acc, item) => acc + item.priceCents * item.quantity, 0);
}

export function cartItemCount(cart: Cart): number {
  return cart.items.reduce((acc, item) => acc + item.quantity, 0);
}
