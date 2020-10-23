import { IProductList } from "./product-list.interface";
import { IProduct } from "../product/product.interface";

export const PRODUCT_LIST_SERVICE_PROVIDER = Symbol("IProductListService");

export interface IProductListService {
  getLatest(): Promise<IProductList>;

  saveItem(list: IProductList, item: IProduct): Promise<IProductList>;

  toggleItem(list: IProductList, title: string): Promise<IProductList>;

  deleteItem(list: IProductList, title: string): Promise<IProductList>;
}
