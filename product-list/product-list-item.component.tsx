import React, { useCallback } from "react";
import { IProduct } from "../product/product.interface";
import styles from "./product-list-item.module.scss";
import { ProductPriorityEnum } from "../product/product-priority.enum";
import { ColorEnum } from "../bootstrap/types";

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

  const key: string = props.uuid;

  return (
    <li className={`list-group-item`}>
      <div className="d-flex w-100 justify-content-between mb-1">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id={key}
            checked={!props.active}
            onChange={props.onToggle}
          />
          <label className={`custom-control-label  ${!props.active ? styles.inActive : ""}`} htmlFor={key}>
            {props.index + 1}. {props.title}
          </label>
        </div>
      </div>
      <p className="mb-1">
        <span className="badge badge-primary badge-pill mr-1">&#8381; {props.price}</span>
        <span className={`badge badge-${getPriorityBadgeClass()} badge-pill`}>{props.priority} приоритет</span>
      </p>
    </li>
  );
};
