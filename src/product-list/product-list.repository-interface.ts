import { IProductList } from "./product-list.interface";
import { IProductListPostDto } from "./product-list-post.dto";

export const PRODUCT_LIST_REPOSITORY_PROVIDER = Symbol("IProductListRepository");

export interface FindParams {
  title?: string;
  id?: number;
}

export interface IProductListRepository {
  save(dto: IProductListPostDto | IProductList): Promise<IProductList>;

  find(filter?: FindParams): Promise<IProductList | null>;

  get(filter?: FindParams): Promise<IProductList[]>;
}
