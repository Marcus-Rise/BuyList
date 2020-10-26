import type { IBudget, IBudgetProduct } from "./budget.interface";

const BUDGET_SERVICE_PROVIDER = Symbol("IBudgetService");

interface IBudgetService {
  calculate(items: IBudgetProduct[], limit: number): Promise<IBudget>;
}

export { BUDGET_SERVICE_PROVIDER };
export type { IBudgetService, IBudgetProduct };
