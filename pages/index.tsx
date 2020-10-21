import React, { useEffect, useState } from "react";
import { ProductList } from "../src/product-list/product-list.component";
import { IProductList } from "../src/product-list/product-list.interface";
import { IProduct } from "../src/product/product.interface";
import { useInject } from "../src/ioc/use-inject.decorator";
import { IProductListService, PRODUCT_LIST_SERVICE_PROVIDER } from "../src/product-list/product-list.service-interface";

const Home: React.FC = () => {
  const service = useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER);
  const [list, setList] = useState<IProductList | null>(null);

  useEffect(() => {
    service.getLatest().then((data) => {
      setList(data);
    });
  }, []);

  const onItemsChange = (items: IProduct[]): void => {
    if (list) {
      setList({
        ...list,
        items,
      });
    }
  };

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col">{list && <ProductList {...list} onItemsChange={onItemsChange} />}</div>
      </div>
    </div>
  );
};

export default Home;
