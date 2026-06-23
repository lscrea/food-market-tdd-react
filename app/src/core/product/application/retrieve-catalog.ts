import type {Product} from "../domain/product";
import type {ProductCatalogQuery} from "./catalog-query.ts";


export type RetrieveCatalogResult = | { kind: 'success'; products: Product[] } | { kind: 'failure'; message: string };


export async function retrieveCatalog(query: ProductCatalogQuery): Promise<RetrieveCatalogResult> {


    try {
        const products = await query.execute();

        return {
            kind: "success",
            products
        }
    } catch  {
        return {
            kind: "failure",
            message: "Error getting catalog"
        }
    }


}

// Créer retrieveCatalog avec le paramètre query et qui retourne une Promise de type RetrieveCatalogResult.
// query.execute();
// return les kind message

