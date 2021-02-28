import type { IProductListService } from "./product-list.service.interface";
import { inject, injectable } from "inversify";
import type { IProductListRepository } from "../product-list-repository";
import { PRODUCT_LIST_REPOSITORY } from "../product-list-repository";
import type { IProductList } from "../../../product-list";
import type { ProductListModel } from "../../../product-list/product-list.model";
import { isAfter } from "date-fns";

@injectable()
class ProductListService implements IProductListService {
  constructor(@inject(PRODUCT_LIST_REPOSITORY) private readonly repo: IProductListRepository) {}

  static mergeProductList(first: ProductListModel[], second: ProductListModel[]): ProductListModel[] {
    const arrayToMerge: ProductListModel[] = [...first, ...second];
    const synced: ProductListModel[] = [];

    arrayToMerge.forEach((item, index, self) => {
      const doubles = self.filter((i) => item.id === i.id);

      if (doubles.length > 1) {
        const latestItem = doubles.reduce((previous, current) => {
          if (isAfter(new Date(previous.lastEditedDate), new Date(current.lastEditedDate))) {
            return previous;
          } else {
            return current;
          }
        });

        synced.push(latestItem);

        doubles.forEach((i) => {
          const index = self.indexOf(i);

          if (index > -1) {
            self.splice(index, 1);
          }
        });
      } else {
        synced.push(item);

        const index = self.indexOf(item);

        if (index > -1) {
          self.splice(index, 1);
        }
      }
    });

    return synced;
  }

  async getData(): Promise<IProductList[]> {
    return this.repo.get();
  }

  async saveData(data: IProductList[]): Promise<void> {
    return this.repo.save(data);
  }

  async sync(fromClient: ProductListModel[]): Promise<ProductListModel[]> {
    const fromCloud = await this.repo.get();

    return ProductListService.mergeProductList(fromClient, fromCloud);
  }
}

export { ProductListService };
