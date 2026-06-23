

// type dto
export type ProductDto = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  quantityMax: number;
};

// function createHttpProductCatalogQuery(baseUrl: string): ProductCatalogQuery {....