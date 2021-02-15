import type { IProductList } from "./product-list.interface";
import type { IProduct } from "../product";

class ProductListModel implements IProductList {
  constructor(public title = "", public items: IProduct[] = [], public id = 0, public lastEditedDate = new Date()) {}
}

export { ProductListModel };
