import { IProductList } from "./product-list.interface";
import { IProductListPostDto } from "./product-list-post.dto";
import { IProductListRepository } from "./product-list.repository-interface";
import { IProduct } from "../product/product.interface";
import faker from "faker";
import { ProductPriorityEnum } from "../product/product-priority.enum";

export class ProductListInMemoryRepository implements IProductListRepository {
  private list: IProductList;

  constructor() {
    faker.locale = "ru";

    const items = new Array(3).fill(1).map<IProduct>(() => ({
      title: faker.commerce.product(),
      price: Number(faker.commerce.price()),
      priority: faker.random.arrayElement(Object.values(ProductPriorityEnum)),
      active: faker.random.boolean(),
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
