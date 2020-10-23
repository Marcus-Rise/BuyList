import "reflect-metadata";
import { Container } from "inversify";
import { IProductListService, PRODUCT_LIST_SERVICE_PROVIDER } from "../product-list/product-list.service-interface";
import { ProductListServiceMock } from "../product-list/product-list.service-mock";
import { BUDGET_SERVICE_PROVIDER, IBudgetService } from "../budget/budget.service-interface";
import { BudgetService } from "../budget/budget.service";

const container = new Container();

container.bind<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER).to(ProductListServiceMock).inSingletonScope();
container.bind<IBudgetService>(BUDGET_SERVICE_PROVIDER).to(BudgetService).inSingletonScope();

export { container };
