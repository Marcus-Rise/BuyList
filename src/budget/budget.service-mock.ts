import { IBudget } from "./budget.interface";
import { IBudgetService } from "./budget.service-interface";
import { IProduct } from "../product/product.interface";
import { ProductPriorityEnum } from "../product/product-priority.enum";
import { injectable } from "inversify";

@injectable()
export class BudgetServiceMock implements IBudgetService {
  private bestChoice: IProduct[] | null = null;
  private bestPrioritySum = 0;
  private bestPriceSum = 0;

  async calculate(items: IProduct[], limit: number): Promise<IBudget> {
    const bestItems = this.getBestChoice(items, limit);

    return {
      items: bestItems,
      sum: bestItems.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price;
      }, 0),
    };
  }

  private getBestChoice(products: IProduct[], priceLimit: number): IProduct[] {
    this.bestChoice = null;
    this.bestPrioritySum = 0;
    this.bestPriceSum = priceLimit;

    const buf: IProduct[] = Array.from(products);

    this.makeAllSets(buf);

    return this.bestChoice || [];
  }

  private makeAllSets(products: IProduct[]): void {
    if (products.length) {
      this.checkSet(products);
    }

    products.map((product) => {
      const newSet = products.filter((item) => item !== product);

      this.makeAllSets(newSet);
    });
  }

  private checkSet(products: IProduct[]): void {
    const listPrice: number = products.reduce<number>((sum: number, product: IProduct) => {
      sum = sum + product.price;

      return sum;
    }, 0);

    const listPriority: number = products.reduce<number>((sum: number, product: IProduct) => {
      let priorityCost: number;

      switch (product.priority) {
        case ProductPriorityEnum.high:
          priorityCost = 3;
          break;
        case ProductPriorityEnum.middle:
          priorityCost = 2;
          break;
        case ProductPriorityEnum.low:
          priorityCost = 1;
          break;
        default:
          priorityCost = 0;
          break;
      }

      sum = sum + priorityCost;

      return sum;
    }, 0);

    if (listPrice <= this.bestPriceSum && listPriority > this.bestPrioritySum) {
      this.bestChoice = products;
      this.bestPrioritySum = listPriority;
    }
  }
}
