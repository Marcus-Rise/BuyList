import type { IProductList } from "./product-list.interface";

type IProductListPostDto = Omit<IProductList, "id">;

export type { IProductListPostDto };
