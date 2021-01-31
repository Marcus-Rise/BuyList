import type { IProductList } from "../../../product-list";

interface IProductListRepository {
  save(dto: IProductList[]): Promise<void>;

  get(): Promise<IProductList[]>;
}

export type { IProductListRepository };
