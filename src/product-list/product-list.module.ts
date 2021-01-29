import { ContainerModule } from "inversify";
import type { IProductListRepository } from "./product-list-repository";
import { PRODUCT_LIST_REPOSITORY_PROVIDER, ProductListIndexedDbRepository } from "./product-list-repository";
import type { IProductListService } from "./product-list-service";
import { PRODUCT_LIST_SERVICE_PROVIDER, ProductListService } from "./product-list-service";

const ProductListModule = new ContainerModule((bind) => {
  bind<IProductListRepository>(PRODUCT_LIST_REPOSITORY_PROVIDER).to(ProductListIndexedDbRepository).inSingletonScope();
  bind<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER).to(ProductListService).inSingletonScope();
});

export { ProductListModule };
