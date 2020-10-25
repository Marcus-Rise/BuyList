import "reflect-metadata";
import { ProductListService } from "./product-list.service";
import type { IProductListRepository } from "./product-list.repository-interface";
import { mock } from "jest-mock-extended";
import { ProductPriorityEnum } from "../product/product-priority.enum";
import { container } from "../ioc/container";

describe("ProductListService", () => {
  let service: ProductListService;

  describe("constructor", () => {
    test("container", () => {
      service = container.resolve(ProductListService);

      expect(service).not.toBeUndefined();
    });
  });

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

  describe("getLatest", () => {
    test("first case", async () => {
      service = new ProductListService(
        mock<IProductListRepository>({
          find: () => Promise.resolve(null),
          save: (dto) => Promise.resolve({ ...dto, id: 1 }),
        }),
      );

      const item = await service.getLatest();

      expect(item).not.toBeUndefined();
      expect(item.title.length).toBeGreaterThan(1);
      expect(item.items).toHaveLength(4);
      expect(item.id).toEqual(1);
    });
  });
});
