import type { IProductListConfig } from "./product-list.config.interface";
import { injectable } from "inversify";

@injectable()
class ProductListConfig implements IProductListConfig {
  readonly fileName: string;
  readonly fileExtension: string;

  constructor() {
    this.fileName = process.env.CLOUD_FILE_NAME ?? "buylist.json";
    this.fileExtension = process.env.CLOUD_FILE_EXTENSION ?? "application/json";
  }
}

export { ProductListConfig };
