import type { NextApiHandler } from "next";
import { inject } from "../../src/server/ioc";
import { AuthMiddleware } from "../../src/server/auth/auth.middleware";
import type { IProductListService } from "../../src/server/product-list";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../../src/server/product-list";
import { runMiddleware } from "../../src/server/run-middleware";
import Cors from "cors";
import type { IProductListServerDto } from "../../src/product-list/product-list.server.dto";
import { ProductListModelFactory } from "../../src/product-list/product-list.model.factory";

enum ProductListHandlerAllowedMethodsEnum {
  GET = "GET",
  POST = "POST",
}

const ProductListHandler: NextApiHandler = async (
  req,
  res,
  productListService = inject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER),
) => {
  await AuthMiddleware(req, res);

  await runMiddleware(
    req,
    res,
    Cors({
      methods: [ProductListHandlerAllowedMethodsEnum.GET, ProductListHandlerAllowedMethodsEnum.POST],
    }),
  );

  if (req.method === ProductListHandlerAllowedMethodsEnum.GET) {
    await productListService
      .getData()
      .then(res.json)
      .catch((e) => res.status(500).json(e));
  } else {
    const listDtoArray = (JSON.parse(req.body) as IProductListServerDto[]).map((i) =>
      ProductListModelFactory.fromProductListServerDto(i),
    );
    const synced = await productListService.sync(listDtoArray);

    await productListService
      .saveData(synced)
      .then(() => res.status(200).json(synced))
      .catch((e) => res.status(500).json(e));
  }
};

export { ProductListHandlerAllowedMethodsEnum };
export default ProductListHandler;
