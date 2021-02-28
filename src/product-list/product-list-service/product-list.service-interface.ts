import type { IProduct } from "../../product";
import type { IBudget } from "../../budget";
import type { IProductListRepositoryFindParams } from "../product-list-repository";
import type { ProductListModel } from "../product-list.model";

const PRODUCT_LIST_SERVICE_PROVIDER = Symbol("IProductListService");

interface IProductListService {
  readonly selectedList: ProductListModel | null;

  readonly listArray: ProductListModel[];

  readonly lastSyncDay: Date | null;

  readonly isSyncInProgress: boolean;

  sync(): Promise<void>;

  selectList(listQueryParams?: IProductListRepositoryFindParams): Promise<void>;

  toggleProduct(listQueryParams: IProductListRepositoryFindParams, productTitle: string): Promise<void>;

  deleteProduct(listQueryParams: IProductListRepositoryFindParams, productTitle: string): Promise<void>;

  saveProduct(listQueryParams: IProductListRepositoryFindParams, product: IProduct): Promise<void>;

  calculateListBudget(listQueryParams: IProductListRepositoryFindParams, limit: number): Promise<IBudget | null>;
}

export { PRODUCT_LIST_SERVICE_PROVIDER };
export type { IProductListService };
