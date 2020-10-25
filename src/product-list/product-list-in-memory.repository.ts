import { IProductList } from "./product-list.interface";
import { IProductListPostDto } from "./product-list-post.dto";
import { IProductListRepository } from "./product-list.repository-interface";
import { IProduct } from "../product/product.interface";
import { commerce, random, setLocale } from "faker";
import { ProductPriorityEnum } from "../product/product-priority.enum";
import { injectable } from "inversify";

@injectable()
export class ProductListInMemoryRepository implements IProductListRepository {
  private list: IProductList;

  constructor() {
    setLocale("ru");

    const items = new Array(3).fill(1).map<IProduct>(() => ({
      title: commerce.product(),
      price: Number(commerce.price()),
      priority: random.arrayElement(Object.values(ProductPriorityEnum)),
      active: random.boolean(),
    }));

    this.list = {
      id: 1,
      title: "Ваш первый список",
      items,
    };
  }
  async find(): Promise<IProductList | null> {
    const candidates = await this.get();

    return candidates[0] ?? null;
  }

  async get(): Promise<IProductList[]> {
    return [this.list];
  }

  async save(dto: IProductListPostDto | IProductList): Promise<IProductList> {
    this.list = {
      ...dto,
      id: this.list.id,
    };

    return this.list;
  }
}
