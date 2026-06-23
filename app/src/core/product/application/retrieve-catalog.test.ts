import type { Product } from "../domain/product";
import { retrieveCatalog } from "./retrieve-catalog";

const product1: Product = {
    id: '1',
    name: 'Product 1',
    price: 100,
    category: 'Category 1',
    description: 'Description 1',
    inStock: true,
    quantityMax: 10,
};

describe('retrieveCatalog', () => {
  it('renvoie les produits reçus du port', async () => {
    const okQuery = { execute: jest.fn().mockResolvedValue([product1]) };
    // L'appel au use case. await indispensable car retrieveCatalog est async.
    const result = await retrieveCatalog(okQuery);

    // On valide le shape ENTIER : kind ET products.
    expect(result).toEqual({ kind: 'success', products: [product1] });
  });

  it('transforme une panne technique en résultat métier failure', async () => {
    // Faux port qui rejette. mockRejectedValue = "rejette avec cette erreur".
    const failingQuery = { execute: jest.fn().mockRejectedValue(new Error('503')) };

    // Pattern asynchrone Jest :
    //   await expect(promise).resolves.toEqual(...)
    // C'est plus court qu'un await + expect classique.
    await expect(retrieveCatalog(failingQuery)).resolves.toEqual({
      kind: 'failure',
      message: 'Impossible de charger le catalogue.',
    });
  });
});








