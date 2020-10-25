import type { IProductList } from "./product-list.interface";
import type { IProductListPostDto } from "./product-list-post.dto";
import type { IProductListRepository } from "./product-list.repository-interface";
import { injectable } from "inversify";

@injectable()
export class ProductListInMemoryRepository implements IProductListRepository {
  private collection: IProductList[] = [];

  async find(): Promise<IProductList | null> {
    const [item] = await this.get();

    return item ?? null;
  }

  async get(): Promise<IProductList[]> {
    return this.collection;
  }

  async save(dto: IProductListPostDto | IProductList): Promise<IProductList> {
    let id;

    if ("id" in dto) {
      id = dto.id;
    } else {
      id = this.collection.reduce((previousValue, currentValue) => {
        return previousValue > currentValue.id ? previousValue : currentValue.id;
      }, 0);
    }

    const list: IProductList = {
      ...dto,
      id,
    };

    this.collection.push(list);

    return list;
  }
}
