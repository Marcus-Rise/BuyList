import { ProductPriorityEnum } from "./product-priority.enum";

interface IProduct {
  title: string;
  active: boolean;
  price: number;
  priority: ProductPriorityEnum | string;
}

export type { IProduct };
