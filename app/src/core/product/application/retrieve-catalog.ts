import type { Product } from '../domain/product';

interface ProductCatalogQuery {
  execute(): Promise<Product[]>;
}

export type RetrieveCatalogResult =
  | { kind: 'success'; products: Product[] }
  | { kind: 'failure'; message: string };


export async function retrieveCatalog(
  query: ProductCatalogQuery,
): Promise<RetrieveCatalogResult> {
  try {
    const products = await query.execute();
    return { kind: 'success', products };
  } catch {

    return { kind: 'failure', message: 'Impossible de charger le catalogue.' };
  }
}
