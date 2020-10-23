import { IProductList } from "./product-list.interface";

export type IProductListPostDto = Omit<IProductList, "id">;
