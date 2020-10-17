import { Container } from "inversify";
import { IProductListService, PRODUCT_LIST_SERVICE_PROVIDER } from "../product-list/product-list.service-interface";
import { ProductListService } from "../product-list/product-list.service";

const container = new Container();

container.bind<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER).to(ProductListService).inSingletonScope();

export { container };
