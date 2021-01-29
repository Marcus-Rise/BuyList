import type { NextApiHandler } from "next";
import { inject } from "../../../src/server/ioc";
import { AuthMiddleware } from "../../../src/server/auth/auth.middleware";
import type { IProductListService } from "../../../src/server/product-list";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../../../src/server/product-list";

const TestHandler: NextApiHandler = async (
  req,
  res,
  productListService = inject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER),
) => {
  await AuthMiddleware(req, res);

  const result = await productListService.initStorage();

  res.json(result);
};

export default TestHandler;
