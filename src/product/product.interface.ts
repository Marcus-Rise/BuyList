import type { ProductPriorityEnum } from "./product-priority-icon";

interface IProduct {
  title: string;
  active: boolean;
  price: number;
  priority: ProductPriorityEnum | string;
}

export type { IProduct };
