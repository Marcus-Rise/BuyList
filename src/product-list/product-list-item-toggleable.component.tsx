import type { FC } from "react";
import React from "react";
import type { IProduct } from "../product/product.interface";
import { ProductListItem } from "./product-list-item";
import { ProductListItemToggleButton } from "./product-list-item-toggle-button";

interface IProps {
  items: IProduct[];
  onToggleItem: (title: string) => void;
  className?: string;
  onItemSelected: (i: IProduct) => void;
}

const ProductListItemToggleable: FC<IProps> = (props) => {
  return (
    <>
      {props.items.map((i, index) => {
        const onToggle = () => props.onToggleItem(i.title);

        const onSelect = () => props.onItemSelected(i);

        return (
          <ProductListItem className={props.className} key={i.title} index={index} {...i} onClick={onSelect}>
            <ProductListItemToggleButton onClick={onToggle} active={i.active} />
          </ProductListItem>
        );
      })}
    </>
  );
};

export { ProductListItemToggleable };
