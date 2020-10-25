import type { IProductList } from "./product-list.interface";
import type { IProduct } from "../product/product.interface";

const PRODUCT_LIST_SERVICE_PROVIDER = Symbol("IProductListService");

interface IProductListService {
  getLatest(): Promise<IProductList>;

  saveItem(list: IProductList, item: IProduct): Promise<IProductList>;

  toggleItem(list: IProductList, title: string): Promise<IProductList>;

  deleteItem(list: IProductList, title: string): Promise<IProductList>;
}

export { PRODUCT_LIST_SERVICE_PROVIDER };
export type { IProductListService };
