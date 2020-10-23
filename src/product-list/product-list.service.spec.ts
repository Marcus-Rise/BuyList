import "reflect-metadata";
import { ProductListService } from "./product-list.service";
import { IProductListRepository } from "./product-list.repository-interface";
import { mock } from "jest-mock-extended";
import { ProductPriorityEnum } from "../product/product-priority.enum";

describe("ProductListService", () => {
  let service: ProductListService;

  describe("saveItem", () => {
    test("ok", async () => {
      service = new ProductListService(
        mock<IProductListRepository>({
          save: (dto) => Promise.resolve({ ...dto, id: 1 }),
        }),
      );

      const list = { title: "", id: 1, items: [] };
      const item = { title: "", price: 1, active: true, priority: ProductPriorityEnum.middle };
      const res = await service.saveItem(list, item);

      expect(res.items.includes(item)).toBeTruthy();
    });
  });
});
