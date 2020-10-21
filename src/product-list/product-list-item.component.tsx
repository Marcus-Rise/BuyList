import React from "react";
import { IProduct } from "../product/product.interface";
import styles from "./product-list-item.module.scss";
import { ProductPriorityEnum } from "../product/product-priority.enum";
import { FaCheck } from "react-icons/fa";
import { Button } from "../components/button.component";

interface IProps extends IProduct {
  onToggle: () => void;
  index: number;
  className?: string;
}

export const ProductListItem: React.FC<IProps> = (props) => {
  const classList: string[] = [props.className ?? "", styles.li, "d-flex align-items-center justify-content-between"];

  switch (props.priority) {
    case ProductPriorityEnum.high:
      classList.push(styles.danger);
      break;
    case ProductPriorityEnum.low:
      classList.push(styles.secondary);
      break;
    default:
      classList.push(styles.primary);
      break;
  }

  return (
    <li className={classList.join(" ")}>
      <p className={`m-0 ${!props.active ? styles.inActive : ""}`}>
        {props.index + 1}. {props.title}
      </p>
      <div className="d-flex align-items-center justify-content-end">
        <p className={`${styles.price} my-0`}>
          &#8381; <span className={`${styles.priceCount} mr-3`}>{props.price}</span>
        </p>
        <Button className={`${styles.toggleButton}`} size={"1.2rem"} rounded onClick={props.onToggle}>
          <FaCheck style={props.active ? { color: "white" } : {}} />
        </Button>
      </div>
    </li>
  );
};
