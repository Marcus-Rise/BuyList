import { ContainerModule } from "inversify";
import type { IProductListService } from "./product-list.service.interface";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "./product-list.service.provider";
import { ProductListService } from "./product-list.service";

const ProductListModule = new ContainerModule((bind) => {
  bind<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER).to(ProductListService).inSingletonScope();
});

export { ProductListModule };
