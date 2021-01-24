import "reflect-metadata";
import { Container } from "inversify";
import type { IProductListService } from "../product-list/product-list.service-interface";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../product-list/product-list.service-interface";
import type { IBudgetService } from "../budget/budget.service-interface";
import { BUDGET_SERVICE_PROVIDER } from "../budget/budget.service-interface";
import { BudgetService } from "../budget/budget.service";
import type { IProductListRepository } from "../product-list/product-list.repository-interface";
import { PRODUCT_LIST_REPOSITORY_PROVIDER } from "../product-list/product-list.repository-interface";
import { ProductListService } from "../product-list/product-list.service";
import { ProductListIndexedDbRepository } from "../product-list/product-list-indexed-db.repository";
import { GoogleModule } from "../google";

const container = new Container();

container.load(GoogleModule);

container
  .bind<IProductListRepository>(PRODUCT_LIST_REPOSITORY_PROVIDER)
  .to(ProductListIndexedDbRepository)
  .inSingletonScope();
container.bind<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER).to(ProductListService).inSingletonScope();
container.bind<IBudgetService>(BUDGET_SERVICE_PROVIDER).to(BudgetService).inSingletonScope();

export { container };
