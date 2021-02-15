import type { IProduct } from "../product";

interface IProductList {
  title: string;
  items: IProduct[];
  id: number;
  lastEditedDate: Date;
}

export type { IProductList };
