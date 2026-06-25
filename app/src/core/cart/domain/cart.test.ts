
import {
  addItem,
  cartItemCount,
  cartTotal,
  emptyCart,
  removeItem,
  updateQuantity,
} from './cart';
import type { Product } from '../../product/domain/product';

const pomme: Product = {
  id: 'p-1',
  name: 'Pomme Royal Gala',
  category: 'fruits',
  priceCents: 299,
  unit: 'kg',
  inStock: true,
};

const baguette: Product = {
  id: 'p-2',
  name: 'Baguette tradition',
  category: 'boulangerie',
  priceCents: 130,
  unit: 'unite',
  inStock: true,
};

describe('addItem', () => {
  it('ajoute un produit dans un panier vide', () => {
    const cart = addItem(emptyCart(), pomme);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toMatchObject({ productId: 'p-1', quantity: 1, priceCents: 299 });
  });

  it('incrémente la quantité si le produit est déjà dans le panier', () => {
    let cart = addItem(emptyCart(), pomme);
    cart = addItem(cart, pomme);

    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(2);
  });

  it('accepte une quantité personnalisée', () => {
    const cart = addItem(emptyCart(), pomme, 3);

    expect(cart.items[0].quantity).toBe(3);
  });

  it('ignore une quantité nulle ou négative', () => {
    const cart = addItem(emptyCart(), pomme, 0);

    expect(cart.items).toHaveLength(0);
  });

  it('ne modifie pas le panier source (immutabilité)', () => {
    const original = emptyCart();
    addItem(original, pomme); // on ignore le résultat exprès

    expect(original.items).toHaveLength(0);
  });
});

describe('removeItem', () => {
  it('retire le produit du panier', () => {
    const cart = addItem(addItem(emptyCart(), pomme), baguette);
    const result = removeItem(cart, 'p-1');

    expect(result.items.map((i) => i.productId)).toEqual(['p-2']);
  });

  it('reste sans effet si le produit n’est pas dans le panier', () => {
    const cart = addItem(emptyCart(), pomme);

    const result = removeItem(cart, 'inexistant');

    expect(result.items).toHaveLength(1);
  });
});

describe('updateQuantity', () => {
  it('met à jour la quantité d’un produit existant', () => {
    const cart = addItem(emptyCart(), pomme);

    const result = updateQuantity(cart, 'p-1', 5);

    expect(result.items[0].quantity).toBe(5);
  });

  it('retire le produit si la nouvelle quantité est 0 ou négative', () => {
    const cart = addItem(emptyCart(), pomme);

    expect(updateQuantity(cart, 'p-1', 0).items).toHaveLength(0);
    expect(updateQuantity(cart, 'p-1', -2).items).toHaveLength(0);
  });
});

describe('cartTotal', () => {
  it('vaut 0 pour un panier vide', () => {
    expect(cartTotal(emptyCart())).toBe(0);
  });

  it('somme prix × quantité de chaque ligne', () => {
    // Math : 2×299 + 3×130 = 598 + 390 = 988 centimes.
    let cart = addItem(emptyCart(), pomme, 2);
    cart = addItem(cart, baguette, 3);

    // On vérifie le résultat EN CENTIMES (pas en euros). C'est le contrat du domaine.
    expect(cartTotal(cart)).toBe(988);
  });
});

describe('cartItemCount', () => {
  it('compte la quantité totale (pas le nombre de lignes)', () => {
    let cart = addItem(emptyCart(), pomme, 3);
    cart = addItem(cart, baguette, 2);

    // On veut 5, pas 2.
    expect(cartItemCount(cart)).toBe(5);
  });
});
