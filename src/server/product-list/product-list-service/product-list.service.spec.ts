import "reflect-metadata";
import { ProductListService } from "./product-list.service";
import { ProductListModel } from "../../../product-list/product-list.model";
import { ProductPriorityEnum } from "../../../product";

describe("ProductListService", () => {
  describe("mergeProductList", () => {
    test("second is older", () => {
      const first: ProductListModel[] = [
        new ProductListModel(
          "sss",
          [
            {
              price: 100,
              active: false,
              title: "www",
              priority: ProductPriorityEnum.middle,
            },
          ],
          0,
          new Date(2020, 12, 1),
        ),
      ];
      const second: ProductListModel[] = [
        new ProductListModel(
          "aaa",
          [
            {
              price: 200,
              active: false,
              title: "awd",
              priority: ProductPriorityEnum.middle,
            },
          ],
          0,
          new Date(2020, 12, 2),
        ),
      ];

      const [synced] = ProductListService.mergeProductList(first, second);
      const [product] = synced.items;

      expect(synced.title).toBe("aaa");
      expect(synced.items).toHaveLength(1);
      expect(product.price).toBe(200);
      expect(product.title).toBe("awd");
    });
    test("first is older", () => {
      const first: ProductListModel[] = [
        new ProductListModel(
          "aaa",
          [
            {
              price: 200,
              active: false,
              title: "awd",
              priority: ProductPriorityEnum.middle,
            },
          ],
          0,
          new Date(2020, 12, 2),
        ),
      ];
      const second: ProductListModel[] = [
        new ProductListModel(
          "sss",
          [
            {
              price: 100,
              active: false,
              title: "www",
              priority: ProductPriorityEnum.middle,
            },
          ],
          0,
          new Date(2020, 12, 3),
        ),
      ];

      const [synced] = ProductListService.mergeProductList(first, second);
      const [product] = synced.items;

      expect(synced.title).toBe("sss");
      expect(synced.items).toHaveLength(1);
      expect(product.price).toBe(100);
      expect(product.title).toBe("www");
    });
  });
});
