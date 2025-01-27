import { ContainerModule } from "inversify";
import type { IProductListService } from "./product-list-service/product-list.service.interface";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "./product-list-service/product-list.service.provider";
import { ProductListService } from "./product-list-service/product-list.service";
import type { IProductListRepository } from "./product-list-repository";
import { PRODUCT_LIST_REPOSITORY, ProductListRepository } from "./product-list-repository";
import type { IProductListConfig } from "./product-list-config";
import { PRODUCT_LIST_CONFIG_PROVIDER, ProductListConfig } from "./product-list-config";

const ProductListModule = new ContainerModule((bind) => {
  bind<IProductListConfig>(PRODUCT_LIST_CONFIG_PROVIDER).to(ProductListConfig).inSingletonScope();
  bind<IProductListRepository>(PRODUCT_LIST_REPOSITORY).to(ProductListRepository).inSingletonScope();
  bind<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER).to(ProductListService).inSingletonScope();
});

export { ProductListModule };
