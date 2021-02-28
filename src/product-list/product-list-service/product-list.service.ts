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
import { signIn } from "next-auth/client";

@injectable()
export class ProductListService implements IProductListService {
  get listArray(): ProductListModel[] {
    return this._listArray;
  }

  set listArray(value: ProductListModel[]) {
    this._listArray = value;
  }

  constructor(
    @inject(PRODUCT_LIST_REPOSITORY_PROVIDER)
    private readonly repo: IProductListRepository,
    @inject(BUDGET_SERVICE_PROVIDER)
    private readonly budgetService: IBudgetService,
  ) {
    makeAutoObservable(this);

    this.repo.get().then((array) => {
      this.listArray = array;
    });
  }

  private _selectedList: ProductListModel | null = null;
  private _listArray: ProductListModel[] = [];

  get selectedList(): ProductListModel | null {
    return this._selectedList;
  }

  set selectedList(value: ProductListModel | null) {
    this._selectedList = value;
  }

  async selectList(listQueryParams?: IProductListRepositoryFindParams): Promise<void> {
    const list = await this.repo.find(listQueryParams);

    if (!list) {
      this.selectedList = await this.repo.save(ProductListService.generateList());
    } else {
      this.selectedList = list;
    }
  }

  async sync(): Promise<void> {
    const fromLocal = await this.repo.get();

    await fetch("/api/product-list", {
      method: "POST",
      credentials: "same-origin",
      keepalive: true,
      body: JSON.stringify(fromLocal),
    })
      .then((res) => res.json())
      .then(async (res: IProductListServerDto[]) => {
        const listArray = res.map((i) => ProductListModelFactory.fromProductListServerDto(i));

        for (const list of listArray) {
          await this.repo.save(list);
        }

        this.listArray = await this.repo.get();
        this.selectedList = this.listArray.find((i) => i.id === this.selectedList?.id) ?? null;
      })
      .catch(() => signIn());
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
}
