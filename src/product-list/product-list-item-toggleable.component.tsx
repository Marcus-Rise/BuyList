import type { FC } from "react";
import React from "react";
import type { IProduct } from "../product/product.interface";
import ProductListItem from "./product-list-item.component";
import ProductListItemToggleButton from "./product-list-item-toggle-button.component";

interface IProps {
  items: IProduct[];
  onToggleItem: (i: IProduct) => void;
  className?: string;
  onItemSelected: (i: IProduct) => void;
}

const ProductListItemToggleable: FC<IProps> = (props) => {
  return (
    <>
      {props.items.map((i, index) => (
        <ProductListItem
          className={props.className}
          key={i.title}
          index={index}
          {...i}
          onClick={() => props.onItemSelected(i)}
        >
          <ProductListItemToggleButton onClick={() => props.onToggleItem(i)} active={i.active} />
        </ProductListItem>
      ))}
    </>
  );
};

export { ProductListItemToggleable };
