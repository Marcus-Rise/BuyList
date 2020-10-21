import { IProductListService } from "./product-list.service-interface";
import { IProductList } from "./product-list.interface";
import faker from "faker";
import { IProduct } from "../product/product.interface";
import { ProductPriorityEnum } from "../product/product-priority.enum";
import { injectable } from "inversify";

@injectable()
export class ProductListService implements IProductListService {
  private list: IProductList | null = null;

  constructor() {
    faker.locale = "ru";
  }

  async save(list: IProductList, item: Partial<IProduct>): Promise<IProductList> {
    let newArr: IProduct[];

    if (item.uuid) {
      newArr = [...list.items];
      const index = list.items.findIndex((i) => i.uuid === item.uuid);

      newArr[index] = {
        uuid: item.uuid,
        active: !!item.active,
        title: item.title ?? "",
        price: item.price ?? 0,
        priority: item.priority ?? ProductPriorityEnum.middle,
      };
    } else {
      const newItem: IProduct = {
        uuid: faker.random.uuid(),
        active: !!item.active,
        title: item.title ?? "",
        price: item.price ?? 0,
        priority: item.priority ?? ProductPriorityEnum.middle,
      };

      newArr = [newItem, ...list.items];
    }

    return {
      ...list,
      items: newArr,
    };
  }

  async getLatest(): Promise<IProductList> {
    if (!this.list) {
      this.list = this.generateList(10);
    }

    return this.list;
  }

  private generateList(count: number): IProductList {
    const items = new Array(count).fill(1).map<IProduct>(() => ({
      title: faker.commerce.product(),
      price: Number(faker.commerce.price()),
      priority: faker.random.arrayElement(Object.values(ProductPriorityEnum)),
      active: faker.random.boolean(),
      uuid: faker.random.uuid(),
    }));

    return {
      title: "Ваш первый список",
      items,
    };
  }
}
