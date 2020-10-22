import { IProductList } from "./product-list.interface";
import { IProduct } from "../product/product.interface";

export const PRODUCT_LIST_SERVICE_PROVIDER = Symbol("IProductListService");

export interface IProductListService {
  getLatest(): Promise<IProductList>;

  save(list: IProductList, item: Partial<IProduct>): Promise<IProductList>;

  toggleItem(list: IProductList, uuid: string): Promise<IProductList>;

  deleteItem(list: IProductList, uuid: string): Promise<IProductList>;
}
