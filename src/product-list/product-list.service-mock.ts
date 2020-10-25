import type { IProductListService } from "./product-list.service-interface";
import type { IProductList } from "./product-list.interface";
import { injectable } from "inversify";

@injectable()
export class ProductListServiceMock implements IProductListService {
  async saveItem(list: IProductList): Promise<IProductList> {
    return list;
  }

  async getLatest(): Promise<IProductList> {
    return {
      id: 1,
      title: "",
      items: [],
    };
  }

  async deleteItem(): Promise<IProductList> {
    return {
      id: 1,
      title: "",
      items: [],
    };
  }

  async toggleItem(list: IProductList): Promise<IProductList> {
    return list;
  }
}
