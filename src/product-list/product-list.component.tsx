import React from "react";
import ProductListUl from "./product-list-ul.component";
import type { IProduct } from "../product/product.interface";
import { ProductListItemToggleable } from "./product-list-item-toggleable.component";

interface IProps {
  items: IProduct[];
  onEditItem: (item: IProduct) => void;
  onToggleItem: (item: IProduct) => void;
}

const ProductList: React.FC<IProps> = (props) => {
  const products = props.items.filter((i) => i.active);
  const productsInActive = props.items.filter((i) => !i.active);
  const isProductsInActiveExist = !!productsInActive.length;

  return (
    <>
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
    </>
  );
};

export { ProductList };
export default ProductList;
