import type { IProductList } from "../../../product-list";
import type { ProductListModel } from "../../../product-list/product-list.model";

interface IProductListService {
  getData(): Promise<IProductList[]>;

  saveData(data: IProductList[]): Promise<void>;

  sync(fromClient: ProductListModel[]): Promise<ProductListModel[]>;
}

export type { IProductListService };
