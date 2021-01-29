import type { NextApiHandler } from "next";
import { inject } from "../../../src/server/ioc";
import { AuthMiddleware } from "../../../src/server/auth/auth.middleware";
import type { IProductListService } from "../../../src/server/product-list";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../../../src/server/product-list";
import type { IGoogleDriveService } from "../../../src/server/google";
import { GOOGLE_DRIVE_SERVICE } from "../../../src/server/google";

const TestHandler: NextApiHandler = async (
  req,
  res,
  productListService = inject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER),
  googleDrive = inject<IGoogleDriveService>(GOOGLE_DRIVE_SERVICE),
) => {
  await AuthMiddleware(req, res);

  const fileId = await productListService.initStorage();

  if (fileId) {
    const data = await googleDrive.readFile(fileId);
    res.json(data);
  } else {
    res.status(500).json("not file");
  }
};

export default TestHandler;
