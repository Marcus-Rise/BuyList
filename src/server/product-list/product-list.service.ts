import type { IProductListService, ProductListStorageId } from "./product-list.service.interface";
import { inject, injectable } from "inversify";
import type { IGoogleDriveService } from "../google";
import { GOOGLE_DRIVE_SERVICE } from "../google";

@injectable()
class ProductListService implements IProductListService {
  constructor(@inject(GOOGLE_DRIVE_SERVICE) private readonly googleDrive: IGoogleDriveService) {}

  async initStorage(): Promise<ProductListStorageId> {
    let res: ProductListStorageId = "";
    const FILE_NAME = "test2.text";
    const list = await this.googleDrive.getFileList();

    if (Array.isArray(list)) {
      const fileFound = list.find((i) => i.name === FILE_NAME);

      if (!fileFound) {
        const fileCreated = await this.googleDrive.createFile(FILE_NAME, "text/plain", "hello");

        if (!this.googleDrive.isError(fileCreated)) {
          res = fileCreated.id;
        } else {
          console.error(fileCreated);
        }
      } else {
        res = fileFound.id;
      }
    }

    return res;
  }
}

export { ProductListService };
