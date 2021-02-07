import type { IProductList } from "../product-list.interface";
import type { IProduct } from "../../product/product.interface";
import type { IProductListService } from "./product-list.service-interface";
import { inject, injectable } from "inversify";
import { ProductPriorityEnum } from "../../product/product-priority.enum";
import type { IProductListPostDto } from "../product-list-post.dto";
import type { IProductListRepository } from "../product-list-repository";
import { PRODUCT_LIST_REPOSITORY_PROVIDER } from "../product-list-repository";
import type { IBudget, IBudgetService } from "../../budget";
import { BUDGET_SERVICE_PROVIDER } from "../../budget";

@injectable()
export class ProductListService implements IProductListService {
  constructor(
    @inject(PRODUCT_LIST_REPOSITORY_PROVIDER)
    private readonly repo: IProductListRepository,
    @inject(BUDGET_SERVICE_PROVIDER)
    private readonly budgetService: IBudgetService,
  ) {}

  private static generateList(): IProductListPostDto {
    return {
      title: "Ваш первый список",
      items: [
        {
          title: "Пальто",
          price: 15000,
          priority: ProductPriorityEnum.middle,
          active: true,
        },
        {
          title: "Обувь",
          price: 8000,
          priority: ProductPriorityEnum.high,
          active: true,
        },
        {
          title: "Скатерть",
          price: 2000,
          priority: ProductPriorityEnum.low,
          active: false,
        },
        {
          title: "Подгузники",
          price: 1000,
          priority: ProductPriorityEnum.middle,
          active: false,
        },
      ],
    };
  }

  async sync(): Promise<void> {
    const list = await this.repo.get();

    await fetch("/api/product-list", {
      method: "PUT",
      credentials: "same-origin",
      keepalive: true,
      body: JSON.stringify(list),
    });
  }

  async getById(id: number): Promise<IProductList | null> {
    return this.repo.find({ id });
  }

  async saveItemById(listId: number, item: IProduct): Promise<IProductList> {
    const list = await this.getById(listId);

    if (!list) {
      throw new Error();
    }

    return this.saveItem(list, item);
  }

  async toggleItemById(listId: number, title: string): Promise<IProductList> {
    const list = await this.getById(listId);

    if (!list) {
      throw new Error();
    }

    return this.toggleItem(list, title);
  }

  async deleteItemById(listId: number, title: string): Promise<IProductList> {
    const list = await this.getById(listId);

    if (!list) {
      throw new Error();
    }

    return this.deleteItem(list, title);
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
      const generatedList = ProductListService.generateList();

      list = await this.repo.save(generatedList);
    }

    return list;
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

  async calculateBudgetById(listId: number, limit: number): Promise<IBudget> {
    const list = await this.getById(listId);

    if (!list) {
      throw new Error();
    }

    return this.budgetService.calculate(
      list.items.filter((i) => i.active),
      limit,
    );
  }
}
