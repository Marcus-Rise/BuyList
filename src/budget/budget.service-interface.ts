import type { IProduct } from "../product/product.interface";
import type { IBudget } from "./budget.interface";

const BUDGET_SERVICE_PROVIDER = Symbol("IBudgetService");

interface IBudgetService {
  calculate(items: IProduct[], limit: number): Promise<IBudget>;
}

export { BUDGET_SERVICE_PROVIDER };
export type { IBudgetService };
