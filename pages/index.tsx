import React, { useEffect, useState } from "react";
import { IProductList } from "../src/product-list/product-list.interface";
import { IProduct } from "../src/product/product.interface";
import { useInject } from "../src/ioc/use-inject.decorator";
import { IProductListService, PRODUCT_LIST_SERVICE_PROVIDER } from "../src/product-list/product-list.service-interface";
import { Button, Colors } from "../src/components/button.component";
import { BsPlus } from "react-icons/bs";
import { ProductListItem } from "../src/product-list/product-list-item.component";
import { BudgetCalculateForm } from "../src/budget/budget-calculate-form.component";

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

  const onItemToggle = (item: IProduct): void => {
    if (list) {
      const newArr: IProduct[] = [...list.items];
      const index = list.items.findIndex((i) => i.uuid === item.uuid);

      newArr[index].active = !item.active;

      onItemsChange(newArr);
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
            <Button className="ml-3 p-2" rounded color={Colors.accent} onClick={() => undefined}>
              <BsPlus size={"2rem"} />
            </Button>
          </div>
          <div className="col-12 py-4">
            <BudgetCalculateForm onSubmit={onCalculationRequire} />
          </div>
          <div className="col">
            <div className="row">
              <div className="card-body">
                <ul className="list-group">
                  {list.items.map((i, index) => (
                    <ProductListItem key={i.uuid} {...i} index={index} onToggle={() => onItemToggle(i)} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Home;
