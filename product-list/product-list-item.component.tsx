import React from "react";
import { IProduct } from "../product/product.interface";
import styles from "./product-list-item.module.scss";

interface IProps extends IProduct {
  onToggle: () => void;
}

export const ProductListItem: React.FC<IProps> = (props) => {
  return (
    <li className={`list-group-item  d-flex justify-content-start align-items-center`}>
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={props.title}
          checked={!props.active}
          onChange={props.onToggle}
        />
        <label className={`custom-control-label  ${!props.active ? styles.inActive : ""}`} htmlFor={props.title}>
          {props.title}
        </label>
      </div>
    </li>
  );
};
