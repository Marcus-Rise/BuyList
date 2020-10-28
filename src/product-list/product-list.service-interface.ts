import type { IProductList } from "./product-list.interface";
import type { IProduct } from "../product/product.interface";
import type { IBudget } from "../budget/budget.interface";

const PRODUCT_LIST_SERVICE_PROVIDER = Symbol("IProductListService");

interface IProductListService {
  getLatest(): Promise<IProductList>;

  getById(id: number): Promise<IProductList | null>;

  saveItem(list: IProductList, item: IProduct): Promise<IProductList>;

  toggleItem(list: IProductList, title: string): Promise<IProductList>;

  deleteItem(list: IProductList, title: string): Promise<IProductList>;

  saveItemById(listId: number, item: IProduct): Promise<IProductList>;

  toggleItemById(listId: number, title: string): Promise<IProductList>;

  deleteItemById(listId: number, title: string): Promise<IProductList>;

  calculateBudgetById(listId: number, limit: number): Promise<IBudget>;
}

export { PRODUCT_LIST_SERVICE_PROVIDER };
export type { IProductListService };
