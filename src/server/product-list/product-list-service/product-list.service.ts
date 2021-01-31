import type { IProductListService } from "./product-list.service.interface";
import { inject, injectable } from "inversify";
import type { IProductListRepository } from "../product-list-repository";
import { PRODUCT_LIST_REPOSITORY } from "../product-list-repository";
import type { IProductList } from "../../../product-list";

@injectable()
class ProductListService implements IProductListService {
  constructor(@inject(PRODUCT_LIST_REPOSITORY) private readonly repo: IProductListRepository) {}

  async getData(): Promise<IProductList[]> {
    return this.repo.get();
  }

  async saveData(data: IProductList[]): Promise<void> {
    return this.repo.save(data);
  }
}

export { ProductListService };
