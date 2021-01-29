import type { IProductListService } from "./product-list.service-interface";
import type { IProductList } from "./product-list.interface";
import { injectable } from "inversify";
import type { IBudget } from "../budget/budget.interface";

@injectable()
export class ProductListServiceMock implements IProductListService {
  calculateBudgetById(): Promise<IBudget> {
    throw new Error("Method not implemented.");
  }

  private readonly list = {
    id: 1,
    title: "",
    items: [],
  };

  async saveItem(list: IProductList): Promise<IProductList> {
    return list;
  }

  async getLatest(): Promise<IProductList> {
    return this.list;
  }

  async deleteItem(): Promise<IProductList> {
    return this.list;
  }

  async toggleItem(list: IProductList): Promise<IProductList> {
    return list;
  }

  async deleteItemById(listId: number): Promise<IProductList> {
    return {
      ...this.list,
      id: listId,
    };
  }

  async getById(id: number): Promise<IProductList | null> {
    return {
      ...this.list,
      id,
    };
  }

  async saveItemById(listId: number): Promise<IProductList> {
    return {
      ...this.list,
      id: listId,
    };
  }

  async toggleItemById(listId: number): Promise<IProductList> {
    return {
      ...this.list,
      id: listId,
    };
  }
}
