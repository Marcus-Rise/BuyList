import type { IProduct } from "../product/product.interface";

interface IProductList {
  title: string;
  items: IProduct[];
  id: number;
}

export type { IProductList };
