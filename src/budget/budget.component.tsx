import React from "react";
import { IBudget } from "./budget.interface";
import { ProductList } from "../product-list/product-list.component";
import { ProductListItem } from "../product-list/product-list-item.component";

type IProps = IBudget;

export const Budget: React.FC<IProps> = (props) => {
  return (
    <>
      <h3 style={{ textAlign: "center", maxWidth: "100%" }}>Оптимальный список</h3>
      <div className="row">
        <div className="col-12">
          <ProductList>
            {props.items.map((i, index) => (
              <ProductListItem className="mb-4" key={i.uuid} index={index} {...i} />
            ))}
          </ProductList>
        </div>
      </div>
    </>
  );
};
