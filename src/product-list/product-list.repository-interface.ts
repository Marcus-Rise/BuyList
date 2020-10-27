import type { IProductList } from "./product-list.interface";
import type { IProductListPostDto } from "./product-list-post.dto";

const PRODUCT_LIST_REPOSITORY_PROVIDER = Symbol("IProductListRepository");

interface FindParams {
  title?: string;
  id?: number;
}

interface IProductListRepository {
  save(dto: IProductListPostDto | IProductList): Promise<IProductList>;

  find(filter?: FindParams): Promise<IProductList | null>;

  get(filter?: FindParams): Promise<IProductList[]>;
}

export { PRODUCT_LIST_REPOSITORY_PROVIDER };
export type { IProductListRepository, FindParams };
