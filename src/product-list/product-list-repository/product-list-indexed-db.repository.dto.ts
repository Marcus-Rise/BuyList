import type { IProduct } from "../../product";
import type { ProductListModel } from "../product-list.model";

interface IProductListIndexedDbRepositoryDto {
  title: string;
  items: IProduct[];
  id: number;
  lastEditedDate: Date;
}

class ProductListIndexedDbRepositoryDto implements IProductListIndexedDbRepositoryDto {
  id: number;
  items: IProduct[];
  lastEditedDate: Date;
  title: string;

  constructor(model: ProductListModel) {
    this.id = model.id;
    this.items = model.items;
    this.title = model.title;
    this.lastEditedDate = model.lastEditedDate;
  }
}

export type { IProductListIndexedDbRepositoryDto };
export { ProductListIndexedDbRepositoryDto };
