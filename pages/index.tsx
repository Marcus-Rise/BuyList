import React, { useEffect, useState } from "react";
import { IProductList } from "../src/product-list/product-list.interface";
import { IProduct } from "../src/product/product.interface";
import { useInject } from "../src/ioc/use-inject.decorator";
import { IProductListService, PRODUCT_LIST_SERVICE_PROVIDER } from "../src/product-list/product-list.service-interface";
import { Button, ButtonColors } from "../src/components/button.component";
import { BsPlus } from "react-icons/bs";
import { BudgetCalculateForm } from "../src/budget/budget-calculate-form.component";
import { ProductList } from "../src/product-list/product-list.component";

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

  const onCalculationRequire = (val: number) => {
    console.debug("budget: ", val);
  };

  return (
    list && (
      <div className="container pt-3">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <h2>{list.title}</h2>
            <Button className="ml-3 p-2" rounded color={ButtonColors.accent} onClick={() => undefined}>
              <BsPlus size={"2rem"} />
            </Button>
          </div>
          <div className="col-12 py-4">
            <BudgetCalculateForm onSubmit={onCalculationRequire} />
          </div>
          <div className="col">
            <ProductList {...list} onItemsChange={onItemsChange} />
          </div>
        </div>
      </div>
    )
  );
};

export default Home;
