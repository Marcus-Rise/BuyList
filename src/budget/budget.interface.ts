import type { IProduct } from "../product/product.interface";

interface IBudget {
  items: IProduct[];
  sum: number;
}

export type { IBudget };
