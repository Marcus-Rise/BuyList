import type { IProductList } from "./product-list.interface";
import type { IProduct } from "../product/product.interface";
import type { IProductListService } from "./product-list.service-interface";
import { inject, injectable } from "inversify";
import faker from "faker";
import { ProductPriorityEnum } from "../product/product-priority.enum";
import type { IProductListPostDto } from "./product-list-post.dto";
import type { IProductListRepository } from "./product-list.repository-interface";
import { PRODUCT_LIST_REPOSITORY_PROVIDER } from "./product-list.repository-interface";

@injectable()
export class ProductListService implements IProductListService {
  constructor(
    @inject(PRODUCT_LIST_REPOSITORY_PROVIDER)
    private readonly repo: IProductListRepository,
  ) {
    faker.locale = "ru";
  }

  async saveItem(list: IProductList, item: IProduct): Promise<IProductList> {
    let newArr: IProduct[];

    const index = list.items.findIndex((i) => i.title === item.title);

    if (index > -1) {
      newArr = list.items;
      newArr[index] = item;
    } else {
      newArr = [item, ...list.items];
    }

    return this.repo.save({ ...list, items: newArr });
  }

  async getLatest(): Promise<IProductList> {
    let list: IProductList | null = await this.repo.find();

    if (!list) {
      const generatedList = this.generateList(3);

      list = await this.repo.save(generatedList);
    }

    return list;
  }

  private generateList(count: number): IProductListPostDto {
    const items = new Array(count).fill(1).map<IProduct>(() => ({
      title: faker.commerce.product(),
      price: Number(faker.commerce.price()),
      priority: faker.random.arrayElement(Object.values(ProductPriorityEnum)),
      active: faker.random.boolean(),
    }));

    return {
      title: "Ваш первый список",
      items,
    };
  }

  async deleteItem(list: IProductList, title: string): Promise<IProductList> {
    const items = list.items.filter((i) => i.title !== title);

    return this.repo.save({ ...list, items });
  }

  async toggleItem(list: IProductList, title: string): Promise<IProductList> {
    const item = list.items.find((i) => title === i.title);

    if (!item) {
      throw new Error();
    }

    return this.saveItem(list, {
      ...item,
      active: !item.active,
    });
  }
}
