import React from "react";
import type { IProduct } from "../product/product.interface";
import styles from "./product-list-item.module.scss";
import { Price } from "../components/price.component";
import { ProductPriorityIcon } from "../product/product-priority-icon.component";

interface IProps extends IProduct {
  onClick?: () => void;
  index: number;
  className?: string;
}

export const ProductListItem: React.FC<IProps> = (props) => {
  const classList: string[] = [props.className ?? "", styles.li, "d-flex align-items-center justify-content-between"];

  return (
    <li className={classList.join(" ")} onClick={props.onClick}>
      <p className={`m-0 ${!props.active ? styles.inActive : ""} d-flex align-items-center `}>
        <ProductPriorityIcon priority={props.priority} className={"mr-2"} />
        {props.index + 1}. {props.title}
      </p>
      <div className="d-flex align-items-center justify-content-end">
        <p className={`${styles.price} my-0`}>
          <span className={`${styles.priceCount} mr-3`}>
            <Price val={props.price} />
          </span>
        </p>
        {props.children}
      </div>
    </li>
  );
};
