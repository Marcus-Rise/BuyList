import React from "react";
import { IProductList } from "./product-list.interface";
import { IProduct } from "../product/product.interface";
import { ProductListItem } from "./product-list-item.component";
import styles from "./product-list.module.scss";

interface IProps extends IProductList {
  onItemsChange: (items: IProduct[]) => void;
}

export const ProductList: React.FC<IProps> = (props) => {
  const onItemToggle = (item: IProduct): void => {
    const newArr: IProduct[] = [...props.items];
    const index = props.items.findIndex((i) => i.uuid === item.uuid);

    newArr[index].active = !item.active;

    props.onItemsChange(newArr);
  };

  return (
    <ul className={styles.ul}>
      {props.items.map((i, index) => (
        <ProductListItem key={i.uuid} {...i} index={index} onToggle={() => onItemToggle(i)} />
      ))}
    </ul>
  );
};
