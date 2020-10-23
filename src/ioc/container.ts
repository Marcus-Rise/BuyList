import "reflect-metadata";
import { Container } from "inversify";
import { IProductListService, PRODUCT_LIST_SERVICE_PROVIDER } from "../product-list/product-list.service-interface";
import { BUDGET_SERVICE_PROVIDER, IBudgetService } from "../budget/budget.service-interface";
import { BudgetService } from "../budget/budget.service";
import {
  IProductListRepository,
  PRODUCT_LIST_REPOSITORY_PROVIDER,
} from "../product-list/product-list.repository-interface";
import { ProductListService } from "../product-list/product-list.service";
import { ProductListInMemoryRepository } from "../product-list/product-list-in-memory.repository";

const container = new Container();

container
  .bind<IProductListRepository>(PRODUCT_LIST_REPOSITORY_PROVIDER)
  .to(ProductListInMemoryRepository)
  .inSingletonScope();
container.bind<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER).to(ProductListService).inSingletonScope();
container.bind<IBudgetService>(BUDGET_SERVICE_PROVIDER).to(BudgetService).inSingletonScope();

export { container };
