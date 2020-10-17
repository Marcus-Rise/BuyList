import React from "react";
import { ProductList } from "../product-list/product-list.component";
import { IProductList } from "../product-list/product-list.interface";

const Home: React.FC = () => {
  const list: IProductList = {
    title: "test",
    items: [
      {
        title: "test",
      },
      {
        title: "test2",
      },
    ],
  };

  return (
    <div className="container pt-3">
      <div className="row align-items-center">
        <div className="col">
          <ProductList {...list} />
        </div>
      </div>
    </div>
  );
};

export default Home;
