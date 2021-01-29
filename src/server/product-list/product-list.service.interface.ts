type ProductListStorageId = string;

interface IProductListService {
  initStorage(): Promise<ProductListStorageId>;
}

export type { IProductListService, ProductListStorageId };
