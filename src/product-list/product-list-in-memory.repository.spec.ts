import "reflect-metadata";
import { ProductListInMemoryRepository } from "./product-list-in-memory.repository";

describe("ProductListInMemoryRepository", () => {
  let service: ProductListInMemoryRepository;

  describe("get", () => {
    test("ok", async () => {
      service = new ProductListInMemoryRepository();

      const res = await service.get();

      expect(res).toHaveLength(1);

      const [item] = res;

      expect(item.title.length).toBeGreaterThan(1);
      expect(item.items).toHaveLength(3);
      expect(item.id).toEqual(1);
    });
  });
});
