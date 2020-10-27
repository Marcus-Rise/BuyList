import React from "react";
import type { IBudget } from "./budget.interface";
import { ProductListUl } from "../product-list/product-list-ul.component";
import { ProductListItem } from "../product-list/product-list-item.component";
import { Price } from "../components/price.component";

type IProps = IBudget;

const BudgetOptimal: React.FC<IProps> = (props) => {
  return (
    <>
      <h3 style={{ textAlign: "center", maxWidth: "100%" }}>Оптимальный список</h3>
      <h4 style={{ textAlign: "center", maxWidth: "100%" }}>
        Сумма: <Price val={props.sum} />
      </h4>
      <div className="row">
        <div className="col-12">
          <ProductListUl>
            {props.items.map((i, index) => (
              <ProductListItem className="mb-4" key={i.title} index={index} {...i} active={true} />
            ))}
          </ProductListUl>
        </div>
      </div>
    </>
  );
};

export { BudgetOptimal };
export default BudgetOptimal;
