import type { IProduct } from "../product";

interface IProductListServerDto {
  title: string;
  items: IProduct[];
  id: number;
  lastEditedDate: string;
}

export type { IProductListServerDto };
