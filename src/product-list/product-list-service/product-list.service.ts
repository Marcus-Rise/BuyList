import type { IProductList } from "../product-list.interface";
import type { IProduct } from "../../product";
import { ProductPriorityEnum } from "../../product";
import type { IProductListService } from "./product-list.service-interface";
import { inject, injectable } from "inversify";
import type { IProductListRepository, IProductListRepositoryFindParams } from "../product-list-repository";
import { PRODUCT_LIST_REPOSITORY_PROVIDER } from "../product-list-repository";
import type { IBudget, IBudgetService } from "../../budget";
import { BUDGET_SERVICE_PROVIDER } from "../../budget";
import { makeAutoObservable } from "mobx";
import { ProductListModel } from "../product-list.model";
import type { IProductListServerDto } from "../product-list.server.dto";
import { ProductListModelFactory } from "../product-list.model.factory";

@injectable()
export class ProductListService implements IProductListService {
  constructor(
    @inject(PRODUCT_LIST_REPOSITORY_PROVIDER)
    private readonly repo: IProductListRepository,
    @inject(BUDGET_SERVICE_PROVIDER)
    private readonly budgetService: IBudgetService,
  ) {
    makeAutoObservable(this);

    this.repo.find().then((list) => {
      if (!list) {
        this.repo.save(ProductListService.generateList()).then((generatedList) => {
          this.selectedList = generatedList;
        });
      } else {
        this.selectedList = list;
      }

      this.sync();
    });
  }

  private _selectedList: IProductList | null = null;

  get selectedList(): IProductList | null {
    return this._selectedList;
  }

  set selectedList(value: IProductList | null) {
    this._selectedList = value;
    this.sync();
  }

  private static generateList(): ProductListModel {
    return new ProductListModel(
      "Ваш первый список",
      [
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
      1,
    );
  }

  async saveProduct(listQueryParams: IProductListRepositoryFindParams, product: IProduct): Promise<void> {
    const list = await this.repo.find(listQueryParams);

    if (list) {
      let newArr: IProduct[];

      const index = list.items.findIndex((i) => i.title === product.title);

      if (index > -1) {
        newArr = list.items;
        newArr[index] = product;
      } else {
        newArr = [product, ...list.items];
      }

      list.items = newArr;

      this.selectedList = await this.repo.save(list);
    }
  }

  async toggleProduct(listQueryParams: IProductListRepositoryFindParams, productTitle: string): Promise<void> {
    const list = await this.repo.find(listQueryParams);

    if (list) {
      const index = list.items.findIndex((i) => productTitle === i.title);

      if (index > -1) {
        list.items[index].active = !list.items[index].active;

        this.selectedList = await this.repo.save(list);
      }
    }
  }

  async deleteProduct(listQueryParams: IProductListRepositoryFindParams, productTitle: string): Promise<void> {
    const list = await this.repo.find(listQueryParams);

    if (list) {
      list.items = list.items.filter((i) => i.title !== productTitle);

      this.selectedList = await this.repo.save(list);
    }
  }

  async calculateListBudget(listQueryParams: IProductListRepositoryFindParams, limit: number): Promise<IBudget | null> {
    let budget: IBudget | null;
    const list = await this.repo.find(listQueryParams);

    if (list) {
      budget = await this.budgetService.calculate(
        list.items.filter((i) => i.active),
        limit,
      );
    } else {
      budget = null;
    }

    return budget;
  }

  private async getFromCloud(): Promise<ProductListModel[]> {
    const res = await fetch("/api/product-list", {
      method: "GET",
      credentials: "same-origin",
    });
    const data = (await res.json()) as IProductListServerDto[];

    return data.map<ProductListModel>((i) => ProductListModelFactory.fromProductListServerDto(i));
  }

  private async sync(): Promise<void> {
    const fromLocal = await this.repo.get();
    const fromCloud = await this.getFromCloud();
    const arrayToMerge: ProductListModel[] = [...fromCloud, ...fromLocal];
    const synced: ProductListModel[] = [];

    arrayToMerge.forEach((item, index, self) => {
      const doubles = self.filter((i) => item.id === i.id);

      if (doubles.length > 1) {
        const latestItem = doubles.reduce((previous, current) => {
          if (previous.lastEditedDate.getMilliseconds() > current.lastEditedDate.getMilliseconds()) {
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

    await fetch("/api/product-list", {
      method: "PUT",
      credentials: "same-origin",
      keepalive: true,
      body: JSON.stringify(synced),
    });
  }
}
