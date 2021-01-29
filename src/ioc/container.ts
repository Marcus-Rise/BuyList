import "reflect-metadata";
import { Container } from "inversify";
import type { IBudgetService } from "../budget/budget.service-interface";
import { BUDGET_SERVICE_PROVIDER } from "../budget/budget.service-interface";
import { BudgetService } from "../budget/budget.service";
import { ProductListModule } from "../product-list";

const container = new Container();

container.load(ProductListModule);
container.bind<IBudgetService>(BUDGET_SERVICE_PROVIDER).to(BudgetService).inSingletonScope();

export { container };
