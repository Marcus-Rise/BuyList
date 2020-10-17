import React, { useCallback } from "react";
import { IProduct } from "../product/product.interface";
import styles from "./product-list-item.module.scss";
import { ProductPriorityEnum } from "../product/product-priority.enum";
import { ColorEnum } from "../bootstrap/types";
import { FaCheck } from "react-icons/fa";

interface IProps extends IProduct {
  onToggle: () => void;
  index: number;
}

export const ProductListItem: React.FC<IProps> = (props) => {
  const getPriorityBadgeClass = useCallback((): ColorEnum => {
    let res: ColorEnum;

    switch (props.priority) {
      case ProductPriorityEnum.high:
        res = ColorEnum.danger;
        break;
      case ProductPriorityEnum.middle:
        res = ColorEnum.warning;
        break;
      case ProductPriorityEnum.low:
        res = ColorEnum.secondary;
        break;
    }

    return res;
  }, [props.priority]);

  return (
    <li className={`list-group-item`}>
      <div className="row">
        <div className="col">
          <p className={`mb-0 ${!props.active ? styles.inActive : ""}`}>
            {props.index + 1}. {props.title}
          </p>
          <p className="mb-0">
            <span className="badge badge-primary badge-pill mr-1">&#8381; {props.price}</span>
            <span className={`badge badge-${getPriorityBadgeClass()} badge-pill`}>{props.priority} приоритет</span>
          </p>
        </div>
        <div className={`col-auto d-flex align-items-center`}>
          <button
            type="button"
            className={`btn btn-sm btn-${props.active ? "outline-primary" : "success"} ${styles.toggleButton}`}
            onClick={props.onToggle}
          >
            <FaCheck style={props.active ? { color: "white" } : {}} />
          </button>
        </div>
      </div>
    </li>
  );
};
