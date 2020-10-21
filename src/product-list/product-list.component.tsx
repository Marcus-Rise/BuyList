import React from "react";
import { ProductListItem } from "./product-list-item.component";
import { IProductList } from "./product-list.interface";
import styles from "./product-list.module.scss";
import { IProduct } from "../product/product.interface";
import { Button, Colors } from "../components/button.component";
import { BsPlus } from "react-icons/bs";

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
      <div className="col-12 d-flex align-items-center justify-content-center">
        <h2 className={styles.title}>{props.title}</h2>
        <Button className="ml-3 p-2" rounded color={Colors.accent} onClick={() => undefined}>
          <BsPlus size={"2rem"} />
        </Button>
      </div>

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
