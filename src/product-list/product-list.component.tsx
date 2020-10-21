import React from "react";
import { ProductListItem } from "./product-list-item.component";
import { IProductList } from "./product-list.interface";
import { FaPlus } from "react-icons/fa";
import styles from "./product-list.module.scss";
import { IProduct } from "../product/product.interface";

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
    <div className="row">
      <div className="col-12">
        <h2 className={styles.title}>{props.title}</h2>
      </div>
      <h3 className="card-header">
        <div className="row">
          <div className="col">{props.title}</div>
          <div className="col-auto">
            <button type="button" className={"btn btn-primary"}>
              <span className={"mr-3 " + styles.buttonAddLabel}>Добавить продукт</span>
              <FaPlus />
            </button>
          </div>
        </div>
      </h3>
      <div className="card-body">
        <ul className="list-group">
          {props.items.map((i, index) => (
            <ProductListItem key={i.uuid} {...i} index={index} onToggle={() => onItemToggle(i)} />
          ))}
        </ul>
      </div>
    </div>
  );
};
