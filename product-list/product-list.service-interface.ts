import { IProductList } from "./product-list.interface";

export const PRODUCT_LIST_SERVICE_PROVIDER = Symbol("IProductListService");

export interface IProductListService {
  getLatest(): Promise<IProductList>;
}
