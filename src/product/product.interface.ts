import { ProductPriorityEnum } from "./product-priority.enum";

export interface IProduct {
  title: string;
  active: boolean;
  price: number;
  priority: ProductPriorityEnum;
  uuid: string;
}
