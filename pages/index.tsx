import React, { useEffect, useState } from "react";
import { IProductList } from "../src/product-list/product-list.interface";
import { IProduct } from "../src/product/product.interface";
import { useInject } from "../src/ioc/use-inject.decorator";
import { IProductListService, PRODUCT_LIST_SERVICE_PROVIDER } from "../src/product-list/product-list.service-interface";
import { Button, ButtonColors } from "../src/components/button.component";
import { BsPlus } from "react-icons/bs";
import { BudgetCalculateForm } from "../src/budget/budget-calculate-form.component";
import { Modal } from "../src/components/modal.component";
import { ProductForm } from "../src/product/product-form.component";
import { ProductListItem } from "../src/product-list/product-list-item.component";

const Home: React.FC = () => {
  const service = useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER);
  const [list, setList] = useState<IProductList | null>(null);
  const [editableProduct, setEditableProduct] = useState<Partial<IProduct> | null>(null);

  useEffect(() => {
    service.getLatest().then((data) => {
      setList(data);
    });
  }, []);

  const saveItem = (item: Partial<IProduct>): void => {
    if (list) {
      service.save(list, item).then(setList);
    }

    setEditableProduct(null);
  };

  const onItemToggle = (item: IProduct): void => {
    if (list) {
      service
        .save(list, {
          ...item,
          active: !item.active,
        })
        .then(setList);
    }
  };

  const onCalculationRequire = (val: number) => {
    console.debug("budget: ", val);
  };

  return (
    list && (
      <React.Fragment>
        {editableProduct && (
          <Modal onClose={() => setEditableProduct(null)}>
            <ProductForm {...editableProduct} onSubmit={saveItem} />
          </Modal>
        )}
        <div className="container pt-3">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <h2>{list.title}</h2>
              <Button className="ml-3 p-2" rounded color={ButtonColors.accent} onClick={() => setEditableProduct({})}>
                <BsPlus size={"2rem"} />
              </Button>
            </div>
            <div className="col-12 py-4">
              <BudgetCalculateForm onSubmit={onCalculationRequire} />
            </div>
            <div className="col">
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {list.items.map((i, index) => (
                  <ProductListItem
                    className="mb-4"
                    key={i.uuid}
                    {...i}
                    index={index}
                    onToggle={() => onItemToggle(i)}
                    onClick={() => setEditableProduct(i)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default Home;
