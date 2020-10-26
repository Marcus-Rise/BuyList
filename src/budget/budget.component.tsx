import React from "react";
import type { IBudget } from "./budget.interface";
import { ProductList } from "../product-list/product-list.component";
import { ProductListItem } from "../product-list/product-list-item.component";
import { Price } from "../components/price.component";

type IProps = IBudget;

export const Budget: React.FC<IProps> = (props) => {
  return (
    <>
      <h3 style={{ textAlign: "center", maxWidth: "100%" }}>Оптимальный список</h3>
      <h4 style={{ textAlign: "center", maxWidth: "100%" }}>
        Сумма: <Price val={props.sum} />
      </h4>
      <div className="row">
        <div className="col-12">
          <ProductList>
            {props.items.map((i, index) => (
              <ProductListItem className="mb-4" key={i.title} index={index} {...i} active={true} />
            ))}
          </ProductList>
        </div>
      </div>
    </>
  );
};
