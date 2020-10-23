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
import { ProductList } from "../src/product-list/product-list.component";
import { BUDGET_SERVICE_PROVIDER, IBudgetService } from "../src/budget/budget.service-interface";

const Home: React.FC = () => {
  const productListService = useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER);
  const budgetService = useInject<IBudgetService>(BUDGET_SERVICE_PROVIDER);
  const [list, setList] = useState<IProductList | null>(null);
  const [editableProduct, setEditableProduct] = useState<Partial<IProduct> | null>(null);

  useEffect(() => {
    productListService.getLatest().then((data) => {
      setList(data);
    });
  }, []);

  const saveItem = (item: Partial<IProduct>): void => {
    if (list) {
      productListService.save(list, item).then(setList);
    }

    setEditableProduct(null);
  };

  const onItemToggle = (item: IProduct): void => {
    if (list) {
      productListService.toggleItem(list, item.uuid).then(setList);
    }
  };

  const onCalculationRequire = (val: number) => {
    if (list) {
      budgetService
        .calculate(
          list.items.filter((i) => i.active),
          val,
        )
        .then((data) => {
          console.debug(data);
        });
    }
  };

  const onDelete = (uuid: string, title: string) => {
    const isAllow = confirm(`Вы уверены, что хотите удалить продукт "${title}"?`);

    if (list && isAllow) {
      setEditableProduct(null);
      productListService.deleteItem(list, uuid).then(setList);
    }
  };

  return (
    list && (
      <React.Fragment>
        {editableProduct && (
          <Modal onClose={() => setEditableProduct(null)}>
            <ProductForm {...editableProduct} onSubmit={saveItem} onDelete={onDelete} />
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
            <div className="col-12">
              <ProductList>
                {list.items
                  .filter((i) => i.active)
                  .map((i, index) => (
                    <ProductListItem
                      className="mb-4"
                      key={i.uuid}
                      {...i}
                      index={index}
                      onToggle={() => onItemToggle(i)}
                      onClick={() => setEditableProduct(i)}
                    />
                  ))}
              </ProductList>
            </div>
            {!!list.items.filter((i) => !i.active).length && (
              <>
                <div className="col-12">
                  <h2 style={{ textAlign: "center" }}>Купленные</h2>
                </div>
                <div className="col-12">
                  <ProductList>
                    {list.items
                      .filter((i) => !i.active)
                      .map((i, index) => (
                        <ProductListItem
                          className="mb-4"
                          key={i.uuid}
                          {...i}
                          index={index}
                          onToggle={() => onItemToggle(i)}
                          onClick={() => setEditableProduct(i)}
                        />
                      ))}
                  </ProductList>
                </div>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default Home;
