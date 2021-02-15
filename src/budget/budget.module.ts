import { ContainerModule } from "inversify";
import type { IBudgetService } from "./budget.service-interface";
import { BUDGET_SERVICE_PROVIDER } from "./budget.service-interface";
import { BudgetService } from "./budget.service";

const BudgetModule = new ContainerModule((bind) => {
  bind<IBudgetService>(BUDGET_SERVICE_PROVIDER).to(BudgetService).inSingletonScope();
});

export { BudgetModule };
