import React from "react";
import { IProductList } from "./product-list.interface";
import ButtonAdd from "../components/button-add.component";
import BudgetForm from "../budget/budget-form.component";
import ProductListItem from "./product-list-item.component";
import ProductListUl from "./product-list-ul.component";
import ProductListItemToggleButton from "./product-list-item-toggle-button.component";
import { IProduct } from "../product/product.interface";

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
            {products.map((i, index) => (
              <ProductListItem className="mb-4" key={i.title} index={index} {...i} onClick={() => props.onEditItem(i)}>
                <ProductListItemToggleButton onClick={() => props.onToggleItem(i)} active={i.active} />
              </ProductListItem>
            ))}
          </ProductListUl>
        </div>
        {isProductsInActiveExist && (
          <>
            <div className="col-12">
              <h2 style={{ textAlign: "center" }}>Купленные</h2>
            </div>
            <div className="col-12">
              <ProductListUl>
                {productsInActive.map((i, index) => (
                  <ProductListItem
                    className="mb-4"
                    key={i.title}
                    index={index}
                    {...i}
                    onClick={() => props.onEditItem(i)}
                  >
                    <ProductListItemToggleButton onClick={() => props.onToggleItem(i)} active={i.active} />
                  </ProductListItem>
                ))}
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
