import React from "react";
import type { IProductList } from "./product-list.interface";
import ButtonAdd from "../components/button-add.component";
import BudgetForm from "../budget/budget-form.component";
import ProductListUl from "./product-list-ul.component";
import type { IProduct } from "../product/product.interface";
import { ProductListItemToggleable } from "./product-list-item-toggleable.component";

interface IProps extends IProductList {
  onAddItem: () => void;
  onCalculate: (price: number) => void;
  onEditItem: (item: IProduct) => void;
  onToggleItem: (item: IProduct) => void;
}

const ProductList: React.FC<IProps> = (props) => {
  const products = props.items.filter((i) => i.active);
  const productsInActive = props.items.filter((i) => !i.active);
  const isProductsInActiveExist = !!props.items.filter((i) => !i.active).length;

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <h2>{props.title}</h2>
          <ButtonAdd className="ml-3" onClick={props.onAddItem} />
        </div>
        <div className="col-12 py-4">
          <BudgetForm value={0} onSubmit={props.onCalculate} />
        </div>
        <div className="col-12">
          <ProductListUl>
            <ProductListItemToggleable
              items={products}
              className="mb-4"
              onItemSelected={props.onEditItem}
              onToggleItem={props.onToggleItem}
            />
          </ProductListUl>
        </div>
        {isProductsInActiveExist && (
          <>
            <div className="col-12">
              <h2 style={{ textAlign: "center" }}>Купленные</h2>
            </div>
            <div className="col-12">
              <ProductListUl>
                <ProductListItemToggleable
                  items={productsInActive}
                  className="mb-4"
                  onItemSelected={props.onEditItem}
                  onToggleItem={props.onToggleItem}
                />
              </ProductListUl>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { ProductList };
export default ProductList;
