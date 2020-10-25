import React from "react";
import { ProductPriceStringify } from "./product-price-stringify.function";

interface IProps {
  val: number;
}

const ProductPrice: React.FC<IProps> = ({ val }) => {
  return <>{ProductPriceStringify(val)} &#8381;</>;
};

export { ProductPrice };
