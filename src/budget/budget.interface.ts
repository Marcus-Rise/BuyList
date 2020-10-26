import type { IProduct } from "../product/product.interface";

type IBudgetProduct = Omit<IProduct, "active">;

interface IBudget {
  items: IBudgetProduct[];
  sum: number;
}

export type { IBudget, IBudgetProduct };
