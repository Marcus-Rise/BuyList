import React from "react";
import { PriceStringify } from "./price-stringify.function";

interface IProps {
  val: number;
}

const Price: React.FC<IProps> = ({ val }) => {
  return <>{PriceStringify(val)} &#8381;</>;
};

export { Price };
