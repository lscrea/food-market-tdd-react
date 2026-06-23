import type {Product} from "../domain/product.ts";

export interface ProductCatalogQuery {
    execute: () => Promise<Product[]>
}