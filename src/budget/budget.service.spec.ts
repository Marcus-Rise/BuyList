import "reflect-metadata";
import { BudgetService } from "./budget.service";
import { ProductPriorityEnum } from "../product/product-priority.enum";
import type { IBudgetProduct } from "./budget.interface";

describe("BudgetService", () => {
  let service: BudgetService;

  beforeAll(() => {
    service = new BudgetService();
  });

  describe("calculate", () => {
    test("three products", async () => {
      const first: IBudgetProduct = {
        title: "first",
        price: 250,
        priority: ProductPriorityEnum.low,
      };
      const second: IBudgetProduct = {
        title: "second",
        price: 150,
        priority: ProductPriorityEnum.middle,
      };
      const third: IBudgetProduct = {
        title: "third",
        price: 250,
        priority: ProductPriorityEnum.high,
      };
      const { sum, items } = await service.calculate([first, second, third], 500);

      expect(sum).toEqual(second.price + third.price);
      expect(items).toEqual([second, third]);
    });

    test("one product in limit", async () => {
      const first: IBudgetProduct = { title: "first", price: 150, priority: ProductPriorityEnum.middle };
      const { items, sum } = await service.calculate([first], 500);

      expect(items).toEqual([first]);
      expect(sum).toEqual(first.price);
    });

    test("one product out of limit", async () => {
      const first: IBudgetProduct = { title: "first", price: 150, priority: ProductPriorityEnum.middle };
      const { items, sum } = await service.calculate([first], 100);

      expect(items).toEqual([]);
      expect(sum).toEqual(0);
    });

    describe("comp building", () => {
      const motherBoard: IBudgetProduct = { title: "motherboard", priority: ProductPriorityEnum.middle, price: 15000 };
      const cpu: IBudgetProduct = { title: "cpu", priority: ProductPriorityEnum.high, price: 25000 };
      const memory: IBudgetProduct = { title: "memory", priority: ProductPriorityEnum.low, price: 10000 };
      const gpu: IBudgetProduct = { title: "gpu", priority: ProductPriorityEnum.high, price: 40000 };
      const disk: IBudgetProduct = { title: "disk", priority: ProductPriorityEnum.low, price: 10000 };

      const products = [motherBoard, cpu, disk, memory, gpu];

      test("30000", async () => {
        const { sum, items } = await service.calculate(products, 30000);

        expect(items).toEqual([cpu]);
        expect(sum).toEqual(cpu.price);
      });

      test("25000", async () => {
        const { sum, items } = await service.calculate(products, 25000);

        expect(items).toEqual([cpu]);
        expect(sum).toEqual(cpu.price);
      });

      test("50000", async () => {
        const { sum, items } = await service.calculate(products, 50000);

        expect(items).toEqual([motherBoard, cpu, memory]);
        expect(sum).toEqual(cpu.price + motherBoard.price + memory.price);
      });

      test("90000", async () => {
        const { sum, items } = await service.calculate(products, 90000);

        expect(items).toEqual([motherBoard, cpu, memory, gpu]);
        expect(sum).toEqual(cpu.price + motherBoard.price + memory.price + gpu.price);
      });
    });
  });
});
