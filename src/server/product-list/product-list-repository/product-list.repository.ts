import type { IProductListRepository } from "./product-list.repository.interface";
import type { IProductList } from "../../../product-list";
import { inject, injectable } from "inversify";
import type { IGoogleDriveService } from "../../google";
import { GOOGLE_DRIVE_SERVICE } from "../../google";
import type { ILogger } from "../../logger";
import { LOGGER } from "../../logger";

@injectable()
class ProductListRepository implements IProductListRepository {
  private static readonly FILE_NAME = "buylist.json";
  private static readonly MIME_TYPE = "application/json";

  constructor(
    @inject(LOGGER) private readonly logger: ILogger,
    @inject(GOOGLE_DRIVE_SERVICE) private readonly googleDrive: IGoogleDriveService,
  ) {}

  async save(dto: IProductList[]): Promise<void> {
    const fileCreated = await this.googleDrive.writeFile(
      ProductListRepository.FILE_NAME,
      ProductListRepository.MIME_TYPE,
      JSON.stringify(dto),
      true,
    );

    if (this.googleDrive.isError(fileCreated)) {
      this.logger.error(fileCreated, ProductListRepository.name);
    }
  }

  async get(): Promise<IProductList[]> {
    let res: IProductList[] = [];
    const fileList = await this.googleDrive.getFileList();

    if (!this.googleDrive.isError(fileList)) {
      const file = fileList.find((i) => i.name === ProductListRepository.FILE_NAME);

      if (file) {
        const content = await this.googleDrive.readFile(file.id);

        if (!this.googleDrive.isError(content)) {
          res = JSON.parse(content);
        } else {
          this.logger.error(content, ProductListRepository.name);
        }
      }
    } else {
      this.logger.error(fileList, ProductListRepository.name);
    }

    return res;
  }
}

export { ProductListRepository };
