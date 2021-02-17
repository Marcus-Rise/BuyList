import type { NextApiHandler } from "next";
import { inject } from "../../src/server/ioc";
import { AuthMiddleware } from "../../src/server/auth/auth.middleware";
import type { IProductListService } from "../../src/server/product-list";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../../src/server/product-list";
import { runMiddleware } from "../../src/server/run-middleware";
import Cors from "cors";

enum ProductListHandlerAllowedMethodsEnum {
  GET = "GET",
  PUT = "PUT",
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
      methods: [ProductListHandlerAllowedMethodsEnum.GET, ProductListHandlerAllowedMethodsEnum.PUT],
    }),
  );

  if (req.method === ProductListHandlerAllowedMethodsEnum.GET) {
    await productListService
      .getData()
      .then(res.json)
      .catch((e) => res.status(500).json(e));
  } else {
    await productListService
      .saveData(JSON.parse(req.body))
      .then(() => res.status(201).json("updated"))
      .catch((e) => res.status(500).json(e));
  }
};

export { ProductListHandlerAllowedMethodsEnum };
export default ProductListHandler;
