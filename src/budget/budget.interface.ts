import { IProduct } from "../product/product.interface";

export interface IBudget {
  items: IProduct[];
  sum: number;
}
