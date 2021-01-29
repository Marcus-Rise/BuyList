import type { IProductList } from "./product-list.interface";
import type { IProductListPostDto } from "./product-list-post.dto";
import type { FindParams, IProductListRepository } from "./product-list.repository-interface";
import { createInstance, INDEXEDDB } from "localforage";
import { injectable } from "inversify";

@injectable()
export class ProductListIndexedDbRepository implements IProductListRepository {
  private readonly db: LocalForage;

  constructor() {
    this.db = createInstance({
      driver: INDEXEDDB,
      name: "buy-list",
      storeName: "product-list",
    });
  }

  async find(filter?: FindParams): Promise<IProductList | null> {
    const [item] = await this.get(filter);

    return item ?? null;
  }

  async get(filter?: FindParams): Promise<IProductList[]> {
    const arr: IProductList[] = [];

    await this.db.iterate((item) => arr.push(<IProductList>item));

    return arr.filter((i) => {
      let res = true;

      if (filter?.title) {
        res = i.title === filter.title;
      }

      if (res && filter?.id) {
        res = i.id === filter.id;
      }

      return res;
    });
  }

  async save(dto: IProductListPostDto | IProductList): Promise<IProductList> {
    let id: number;

    if ("id" in dto) {
      id = dto.id;
    } else {
      const arr = await this.get();

      id =
        arr.reduce((previousValue, currentValue) => {
          return previousValue > currentValue.id ? previousValue : currentValue.id;
        }, 0) + 1;
    }

    return this.db.setItem(String(id), { ...dto, id });
  }
}
