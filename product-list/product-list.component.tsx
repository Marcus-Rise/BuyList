import React from "react";
import { ProductListItem } from "./product-list-item.component";
import { IProductList } from "./product-list.interface";

type IProps = IProductList;

export const ProductList: React.FC<IProps> = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <ul className="list-group">
          {props.items.map((i) => (
            <ProductListItem key={i.title} {...i} />
          ))}
        </ul>
      </div>
    </div>
  );
};
