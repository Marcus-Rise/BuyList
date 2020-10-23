import { IProduct } from "../product/product.interface";
import { IBudget } from "./budget.interface";

export const BUDGET_SERVICE_PROVIDER = Symbol("IBudgetService");

export interface IBudgetService {
  calculate(items: IProduct[], limit: number): Promise<IBudget>;
}
