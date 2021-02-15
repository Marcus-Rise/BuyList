import type { IProductListPostDto } from "../product-list-post.dto";
import type { IProductListRepository, IProductListRepositoryFindParams } from "./product-list.repository-interface";
import { createInstance, INDEXEDDB } from "localforage";
import { injectable } from "inversify";
import { ProductListModel } from "../product-list.model";
import type { IProductListIndexedDbRepositoryDto } from "./product-list-indexed-db.repository.dto";
import { ProductListIndexedDbRepositoryDto } from "./product-list-indexed-db.repository.dto";
import { ProductListModelFactory } from "../product-list.model.factory";

@injectable()
export class ProductListIndexedDbRepository implements IProductListRepository {
  private readonly db: LocalForage | null;

  constructor() {
    try {
      if (window) {
        this.db = createInstance({
          driver: INDEXEDDB,
          name: "buy-list",
          storeName: "product-list",
        });
      } else {
        this.db = null;
      }
    } catch {
      this.db = null;
    }
  }

  async find(filter?: IProductListRepositoryFindParams): Promise<ProductListModel | null> {
    const [item] = await this.get(filter);

    return item ?? null;
  }

  async get(filter?: IProductListRepositoryFindParams): Promise<ProductListModel[]> {
    const arr: ProductListModel[] = [];

    await this.db?.iterate<IProductListIndexedDbRepositoryDto, void>((item) =>
      arr.push(ProductListModelFactory.fromProductListIndexedDbRepositoryDto(item)),
    );

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

  async save(dtoOrModel: IProductListPostDto | ProductListModel): Promise<ProductListModel | null> {
    let id: number;

    dtoOrModel.lastEditedDate = new Date();

    if (dtoOrModel instanceof ProductListModel) {
      id = dtoOrModel.id;

      await this.db?.setItem<IProductListIndexedDbRepositoryDto>(
        String(dtoOrModel.id),
        new ProductListIndexedDbRepositoryDto(dtoOrModel),
      );
    } else {
      const arr = await this.get();

      id =
        arr.reduce((previousValue, currentValue) => {
          return previousValue > currentValue.id ? previousValue : currentValue.id;
        }, 0) + 1;

      await this.db?.setItem(String(id), { ...dtoOrModel, id });
    }

    return this.find({ id });
  }
}
