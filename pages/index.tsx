import React, { lazy, Suspense, useEffect, useState } from "react";
import type { IProductList } from "../src/product-list/product-list.interface";
import type { IProduct } from "../src/product/product.interface";
import { useInject } from "../src/ioc/use-inject.decorator";
import type { IProductListService } from "../src/product-list/product-list.service-interface";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../src/product-list/product-list.service-interface";
import type { IBudgetService } from "../src/budget/budget.service-interface";
import { BUDGET_SERVICE_PROVIDER } from "../src/budget/budget.service-interface";
import type { IBudget } from "../src/budget/budget.interface";
import { ProductPriorityEnum } from "../src/product/product-priority.enum";

const BudgetForm = lazy(() => import("../src/budget/budget-form.component"));
const Modal = lazy(() => import("../src/components/modal.component"));
const ProductForm = lazy(() => import("../src/product/product-form.component"));
const Budget = lazy(() => import("../src/budget/budget.component"));
const ButtonAdd = lazy(() => import("../src/components/button-add.component"));
const ProductListItemToggleButton = lazy(() => import("../src/product-list/product-list-item-toggle-button.component"));
const ProductList = lazy(() => import("../src/product-list/product-list.component"));
const ProductListItem = lazy(() => import("../src/product-list/product-list-item.component"));

const Home: React.FC = () => {
  const budgetService = useInject<IBudgetService>(BUDGET_SERVICE_PROVIDER);
  const productListService = useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER);
  const [list, setList] = useState<IProductList | null>(null);
  const [editableProduct, setEditableProduct] = useState<IProduct | null>(null);
  const [budget, setBudget] = useState<IBudget | null>(null);

  useEffect(() => {
    productListService.getLatest().then(setList);
  }, []);

  const saveItem = (item: IProduct): void => {
    if (list) {
      productListService.saveItem(list, item).then(setList);
    }

    setEditableProduct(null);
  };

  const onItemToggle = (item: IProduct): void => {
    if (list) {
      productListService.toggleItem(list, item.title).then(setList);
    }
  };

  const calculateBudget = (val: number) => {
    if (list) {
      budgetService
        .calculate(
          list.items.filter((i) => i.active),
          val,
        )
        .then(setBudget);
    }
  };

  const onDelete = (title: string) => {
    const isAllow = confirm(`Вы уверены, что хотите удалить продукт "${title}"?`);

    if (list && isAllow) {
      setEditableProduct(null);
      productListService.deleteItem(list, title).then(setList);
    }
  };

  return (
    list && (
      <Suspense fallback={<></>}>
        {editableProduct && (
          <Modal onClose={() => setEditableProduct(null)}>
            <ProductForm {...editableProduct} onSubmit={saveItem} onDelete={onDelete} />
          </Modal>
        )}
        {budget && (
          <Modal onClose={() => setBudget(null)}>
            <Budget {...budget} />
          </Modal>
        )}
        <div className="container pt-3">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <h2>{list.title}</h2>
              <ButtonAdd
                className="ml-3"
                onClick={() =>
                  setEditableProduct({
                    title: "",
                    priority: ProductPriorityEnum.middle,
                    active: true,
                    price: 0,
                  })
                }
              />
            </div>
            <div className="col-12 py-4">
              <BudgetForm value={0} onSubmit={calculateBudget} />
            </div>
            <div className="col-12">
              <ProductList>
                {list.items
                  .filter((i) => i.active)
                  .map((i, index) => (
                    <ProductListItem
                      className="mb-4"
                      key={i.title}
                      index={index}
                      {...i}
                      onClick={() => setEditableProduct(i)}
                    >
                      <ProductListItemToggleButton onClick={() => onItemToggle(i)} active={i.active} />
                    </ProductListItem>
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
                          key={i.title}
                          index={index}
                          {...i}
                          onClick={() => setEditableProduct(i)}
                        >
                          <ProductListItemToggleButton onClick={() => onItemToggle(i)} active={i.active} />
                        </ProductListItem>
                      ))}
                  </ProductList>
                </div>
              </>
            )}
          </div>
        </div>
      </Suspense>
    )
  );
};

export default Home;
