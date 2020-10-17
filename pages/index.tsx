import React, { useCallback, useState } from "react";
import { ProductList } from "../product-list/product-list.component";
import { IProductList } from "../product-list/product-list.interface";
import { IProduct } from "../product/product.interface";

const Home: React.FC = () => {
  const [list, setList] = useState<IProductList>({
    title: "test",
    items: [
      {
        title: "test",
        active: false,
      },
      {
        title: "test2",
        active: true,
      },
    ],
  });

  const onItemsChange = useCallback(
    (items: IProduct[]): void => {
      setList({
        ...list,
        items,
      });
    },
    [list],
  );

  return (
    <div className="container pt-3">
      <div className="row align-items-center">
        <div className="col">
          <ProductList {...list} onItemsChange={onItemsChange} />
        </div>
      </div>
    </div>
  );
};

export default Home;
