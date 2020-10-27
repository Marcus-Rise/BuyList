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

  useEffect(() => {
    productListService.getLatest().then(setList);
  }, []);

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

  const calculateBudget = (val: number): void => {
    if (list) {
      budgetService
        .calculate(
          list.items.filter((i) => i.active),
          val,
        )
        .then(setBudget);
    }
  };

  const onDelete = (title: string): void => {
    const isAllow = confirm(`Вы уверены, что хотите удалить продукт "${title}"?`);

    if (list && isAllow) {
      setEditableProduct(null);
      productListService.deleteItem(list, title).then(setList);
    }
  };

  const onAddItem = (): void =>
    setEditableProduct({
      title: "",
      price: 0,
      priority: ProductPriorityEnum.middle,
      active: true,
    });

  return (
    <>
      {editableProduct && (
        <Suspense fallback={<></>}>
          <Modal onClose={() => setEditableProduct(null)}>
            <ProductForm {...editableProduct} onSubmit={onSaveItem} onDelete={onDelete} />
          </Modal>
        </Suspense>
      )}
      {budget && (
        <Suspense fallback={<></>}>
          <Modal onClose={() => setBudget(null)}>
            <Budget {...budget} />
          </Modal>
        </Suspense>
      )}
      {list && (
        <Suspense fallback={<></>}>
          <ProductList
            {...list}
            onCalculate={calculateBudget}
            onToggleItem={onItemToggle}
            onEditItem={setEditableProduct}
            onAddItem={onAddItem}
          />
        </Suspense>
      )}
    </>
  );
};

export default Home;
