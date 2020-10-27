import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import type { IProductList } from "../src/product-list/product-list.interface";
import type { IProduct } from "../src/product/product.interface";
import { useInject } from "../src/ioc/use-inject.decorator";
import type { IProductListService } from "../src/product-list/product-list.service-interface";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../src/product-list/product-list.service-interface";
import type { IBudgetService } from "../src/budget/budget.service-interface";
import { BUDGET_SERVICE_PROVIDER } from "../src/budget/budget.service-interface";
import type { IBudget } from "../src/budget/budget.interface";
import { ProductPriorityEnum } from "../src/product/product-priority.enum";

const ButtonAdd = lazy(() => import("../src/components/button-add.component"));
const BudgetForm = lazy(() => import("../src/budget/budget-form.component"));
const ProductList = lazy(() => import("../src/product-list/product-list.component"));
const Modal = lazy(() => import("../src/components/modal.component"));
const ProductForm = lazy(() => import("../src/product/product-form.component"));
const Budget = lazy(() => import("../src/budget/budget.component"));

const Home: React.FC = () => {
  const budgetService = useInject<IBudgetService>(BUDGET_SERVICE_PROVIDER);
  const productListService = useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER);
  const [list, setList] = useState<IProductList | null>(null);
  const [editableProduct, setEditableProduct] = useState<IProduct | null>(null);
  const [budget, setBudget] = useState<IBudget | null>(null);

  const getProductList = useCallback(() => {
    productListService.getLatest().then(setList);
  }, [productListService]);

  useEffect(getProductList, [getProductList]);

  const onSaveItem = (item: IProduct): void => {
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

  const onBudgetCalculate = useCallback(
    (val: number): void => {
      if (list) {
        budgetService
          .calculate(
            list.items.filter((i) => i.active),
            val,
          )
          .then(setBudget);
      }
    },
    [list, budgetService],
  );

  const onDelete = (title: string): void => {
    const isAllow = confirm(`Вы уверены, что хотите удалить продукт "${title}"?`);

    if (list && isAllow) {
      setEditableProduct(null);
      productListService.deleteItem(list, title).then(setList);
    }
  };

  const onAddItem = useCallback(
    (): void =>
      setEditableProduct({
        title: "",
        price: 0,
        priority: ProductPriorityEnum.middle,
        active: true,
      }),
    [],
  );

  const onCloseProductFormModal = useCallback(() => setEditableProduct(null), []);

  const onCloseBudgetModal = useCallback(() => setBudget(null), []);

  return (
    <>
      {editableProduct && (
        <Suspense fallback={<></>}>
          <Modal onClose={onCloseProductFormModal}>
            <ProductForm {...editableProduct} onSubmit={onSaveItem} onDelete={onDelete} />
          </Modal>
        </Suspense>
      )}
      {budget && (
        <Suspense fallback={<></>}>
          <Modal onClose={onCloseBudgetModal}>
            <Budget {...budget} />
          </Modal>
        </Suspense>
      )}
      {list && (
        <div className="container pt-3">
          <div className="row">
            <Suspense fallback={<></>}>
              <div className="col-12 d-flex align-items-center justify-content-center">
                <h2>{list.title}</h2>
                <ButtonAdd className="ml-3" onClick={onAddItem} />
              </div>
              <div className="col-12 py-4">
                <BudgetForm value={0} onSubmit={onBudgetCalculate} />
              </div>
              <ProductList items={list.items} onToggleItem={onItemToggle} onEditItem={setEditableProduct} />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
