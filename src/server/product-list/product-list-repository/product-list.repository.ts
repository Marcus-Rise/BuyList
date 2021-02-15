import type { IProductListRepository } from "./product-list.repository.interface";
import type { IProductList } from "../../../product-list";
import { inject, injectable } from "inversify";
import type { IGoogleDriveService } from "../../google";
import { GOOGLE_DRIVE_SERVICE } from "../../google";
import type { ILogger } from "../../logger";
import { LOGGER } from "../../logger";
import type { IProductListConfig } from "../product-list-config";
import { PRODUCT_LIST_CONFIG_PROVIDER } from "../product-list-config";

@injectable()
class ProductListRepository implements IProductListRepository {
  constructor(
    @inject(PRODUCT_LIST_CONFIG_PROVIDER) private readonly config: IProductListConfig,
    @inject(GOOGLE_DRIVE_SERVICE) private readonly googleDrive: IGoogleDriveService,
    @inject(LOGGER) private readonly logger: ILogger,
  ) {}

  async save(dto: IProductList[]): Promise<void> {
    const fileCreated = await this.googleDrive.writeFile(
      this.config.fileName,
      this.config.fileExtension,
      JSON.stringify(dto),
      true,
    );

    if (this.googleDrive.isError(fileCreated)) {
      this.logger.error(fileCreated, ProductListRepository.name);

      throw new Error(fileCreated.text);
    }
  }

  async get(): Promise<IProductList[]> {
    let res: IProductList[] = [];
    const fileList = await this.googleDrive.getFileList();

    if (!this.googleDrive.isError(fileList)) {
      const file = fileList.find((i) => i.name === this.config.fileName);

      if (file) {
        const content = await this.googleDrive.readFile(file.id);

        if (!this.googleDrive.isError(content)) {
          res = JSON.parse(content);
        } else {
          this.logger.error(content, ProductListRepository.name);
          throw new Error(content.text);
        }
      }
    } else {
      this.logger.error(fileList, ProductListRepository.name);
      throw new Error(fileList.text);
    }

    return res;
  }
}

export { ProductListRepository };
