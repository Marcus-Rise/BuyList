import React from "react";
import { IProductList } from "./product-list.interface";
import { IProduct } from "../product/product.interface";

interface IProps extends IProductList {
  onItemsChange: (items: IProduct[]) => void;
}

export const ProductList: React.FC<IProps> = () => {
  return <div />;
};
