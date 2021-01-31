import type { IProductList } from "../../../product-list";

interface IProductListService {
  getData(): Promise<IProductList[]>;

  saveData(data: IProductList[]): Promise<void>;
}

export type { IProductListService };
