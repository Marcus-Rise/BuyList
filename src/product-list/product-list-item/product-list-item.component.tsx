import React, { useMemo } from "react";
import type { IProduct } from "../../product";
import { ProductPriorityIcon } from "../../product";
import styles from "./product-list-item.module.scss";
import { Price } from "../../components";

interface IProps extends IProduct {
  onClick?: () => void;
  index: number;
  className?: string;
}

const ProductListItem: React.FC<IProps> = (props) => {
  const classList: string[] = [props.className ?? "", styles.li, "d-flex align-items-center justify-content-between"];

  const ProductPriorityIconWrapper = useMemo(
    () => <ProductPriorityIcon priority={props.priority} className={"mr-2"} />,
    [props.priority],
  );

  const PriceWrapper = useMemo(
    () => (
      <span className={`${styles.priceCount} mr-3`}>
        <Price val={props.price} />
      </span>
    ),
    [props.price],
  );

  return (
    <li className={classList.join(" ")} onClick={props.onClick}>
      <p className={`m-0 ${!props.active ? styles.inActive : ""} d-flex align-items-center `}>
        {ProductPriorityIconWrapper}
        {props.index + 1}. {props.title}
      </p>
      <div className="d-flex align-items-center justify-content-end">
        <p className={`${styles.price} my-0`}>{PriceWrapper}</p>
        {props.children}
      </div>
    </li>
  );
};

export { ProductListItem };
