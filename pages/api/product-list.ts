import type { NextApiHandler } from "next";
import { inject } from "../../src/server/ioc";
import { AuthMiddleware } from "../../src/server/auth/auth.middleware";
import type { IProductListService } from "../../src/server/product-list";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../../src/server/product-list";

const ProductListHandler: NextApiHandler = async (
  req,
  res,
  productListService = inject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER),
) => {
  await AuthMiddleware(req, res);

  if (req.method === "GET") {
    const data = await productListService.getData();

    res.json(data);
  } else if (req.method === "PUT") {
    await productListService.saveData(req.body);

    res.status(201).json("updated");
  } else {
    res.status(405).json("GET and PUT methods is allowed");
  }
};

export default ProductListHandler;
