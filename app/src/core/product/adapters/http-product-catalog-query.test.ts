import { http, HttpResponse } from 'msw';
import { server } from '../../../test/server';
import { createHttpProductCatalogQuery } from './http-product-catalog-query';

describe('createHttpProductCatalogQuery', () => {
  it('mappe la réponse HTTP vers le modèle du domaine', async () => {
    // 1. On configure le handler MSW pour CE test uniquement.
    //    server.use(handler) ajoute un handler éphémère.
    //    Le serveur sera reset entre tests (cf. setupTests.ts).
    server.use(
      http.get('https://api.test/products', () =>
        HttpResponse.json([
          // Réponse au FORMAT API (snake_case, labels, available...).
          {
            product_id: 'p-42',
            label: 'Pomme Royal Gala',
            category: 'fruits',
            price_cents: 299,
            unit: 'kg',
            available: true,
            description: 'Fruit croquant et sucré',
          },
        ]),
      ),
    );

    // 2. On construit l'adaptateur avec l'URL qu'on vient de mocker.
    const gateway = createHttpProductCatalogQuery('https://api.test/products');

    // 3. On vérifie que le MAPPING a bien transformé les noms :
    await expect(gateway.execute()).resolves.toEqual([
      {
        id: 'p-42',
        name: 'Pomme Royal Gala',
        category: 'fruits',
        priceCents: 299,
        unit: 'kg',
        inStock: true,
        description: 'Fruit croquant et sucré',
      },
    ]);
  });

  it('lève une erreur lorsque l’API renvoie un statut non OK', async () => {
    // On simule une panne API : statut 503.
    server.use(
      http.get('https://api.test/products', () =>
        HttpResponse.json({ error: 'down' }, { status: 503 }),
      ),
    );

    const gateway = createHttpProductCatalogQuery('https://api.test/products');

    await expect(gateway.execute()).rejects.toThrow('HTTP 503');

  });
});
