import { IProductList } from "./product-list.interface";
import { IProductListPostDto } from "./product-list-post.dto";
import { FindParams, IProductListRepository } from "./product-list.repository-interface";
import localForage from "localforage";

export class ProductListIndexedDbRepository implements IProductListRepository {
  private readonly db: LocalForage;

  constructor() {
    this.db = localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: "buy-list",
      storeName: "product-list",
    });
  }

  async find(filter?: FindParams): Promise<IProductList | null> {
    const candidates = await this.get(filter);

    return candidates[0] ?? null;
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

      id = arr.reduce((previousValue, currentValue) => {
        return previousValue > currentValue.id ? previousValue : currentValue.id;
      }, 0);
    }

    return this.db.setItem(String(id), { ...dto, id: id });
  }
}
