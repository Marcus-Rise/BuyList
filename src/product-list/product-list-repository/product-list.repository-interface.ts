import type { IProductListPostDto } from "../product-list-post.dto";
import type { ProductListModel } from "../product-list.model";

const PRODUCT_LIST_REPOSITORY_PROVIDER = Symbol("IProductListRepository");

interface IProductListRepositoryFindParams {
  title?: string;
  id?: number;
}

interface IProductListRepository {
  save(dto: IProductListPostDto | ProductListModel): Promise<ProductListModel | null>;

  find(filter?: IProductListRepositoryFindParams): Promise<ProductListModel | null>;

  get(filter?: IProductListRepositoryFindParams): Promise<ProductListModel[]>;
}

export { PRODUCT_LIST_REPOSITORY_PROVIDER };
export type { IProductListRepository, IProductListRepositoryFindParams };
