import React from "react";
import ProductListUl from "./product-list-ul.component";
import type { IProduct } from "../product";
import { ProductListItemToggleable } from "./product-list-item-toggleable.component";
import styles from "./product-list.module.scss";

interface IProps {
  items: IProduct[];
  onEditItem: (item: IProduct) => void;
  onToggleItem: (itemTitle: string) => void;
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
            <h2 className={styles.title}>Купленные</h2>
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
