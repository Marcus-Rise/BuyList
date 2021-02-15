import type { IProductListIndexedDbRepositoryDto } from "./product-list-repository";
import { ProductListModel } from "./product-list.model";
import type { IProductListPostDto } from "./product-list-post.dto";
import type { IProductListServerDto } from "./product-list.server.dto";

class ProductListModelFactory {
  static fromProductListIndexedDbRepositoryDto(dto: IProductListIndexedDbRepositoryDto): ProductListModel {
    return new ProductListModel(dto.title, dto.items, dto.id, dto.lastEditedDate);
  }

  static fromProductListPostDto(dto: IProductListPostDto): ProductListModel {
    return new ProductListModel(dto.title, dto.items, -1, dto.lastEditedDate);
  }

  static fromProductListServerDto(dto: IProductListServerDto): ProductListModel {
    return new ProductListModel(dto.title, dto.items, dto.id, new Date(dto.lastEditedDate));
  }
}

export { ProductListModelFactory };
