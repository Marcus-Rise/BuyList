import type { FC } from "react";
import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useInject } from "../../src/ioc/use-inject.decorator";
import type { IProductListService } from "../../src/product-list/product-list.service-interface";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../../src/product-list/product-list.service-interface";
import type { IProductList } from "../../src/product-list/product-list.interface";
import type { IProduct } from "../../src/product/product.interface";
import type { IBudget } from "../../src/budget/budget.interface";
import { ProductPriorityEnum } from "../../src/product/product-priority.enum";
import { useRouter } from "next/router";
import ButtonAdd from "../../src/components/button-add.component";
import BudgetForm from "../../src/budget/budget-form.component";
import ProductList from "../../src/product-list/product-list.component";

const Modal = lazy(() => import("../../src/components/modal"));
const ProductForm = lazy(() => import("../../src/product/product-form.component"));
const BudgetOptimal = lazy(() => import("../../src/budget/budget-optimal.component"));

const ProductListDashboard: FC<{
  service: IProductListService;
}> = ({ service }) => {
  const router = useRouter();
  const id = useMemo(() => Number(router.query.id), [router.query.id]);
  const [list, setList] = useState<IProductList | null>(null);
  const [editableProduct, setEditableProduct] = useState<IProduct | null>(null);
  const [budget, setBudget] = useState<IBudget | null>(null);

  const getProductList = useCallback(() => {
    service.getById(id).then(setList);
  }, [id, service]);

  useEffect(getProductList, [getProductList]);

  const onSaveItem = useCallback(
    (item: IProduct): void => {
      service.saveItemById(id, item).then(setList);

      setEditableProduct(null);
    },
    [id, service],
  );

  const onItemToggle = useCallback(
    (itemTitle: string): void => {
      service.toggleItemById(id, itemTitle).then(setList);
    },
    [service, id],
  );

  const onBudgetCalculate = useCallback(
    (val: number): void => {
      service.calculateBudgetById(id, val).then(setBudget);
    },
    [service, id],
  );

  const onDelete = useCallback(
    (title: string): void => {
      const isAllow = confirm(`Вы уверены, что хотите удалить продукт "${title}"?`);

      if (isAllow) {
        setEditableProduct(null);
        service.deleteItemById(id, title).then(setList);
      }
    },
    [service, id],
  );

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

  const ProductListHeader = useMemo(
    () => (
      <>
        <h2>{list?.title}</h2>
        <ButtonAdd className="ml-3" onClick={onAddItem} />
      </>
    ),
    [list?.title, onAddItem],
  );

  const BudgetFormWrapper = useMemo(() => <BudgetForm value={0} onSubmit={onBudgetCalculate} />, [onBudgetCalculate]);

  const ProductListWrapper = useMemo(
    () => <ProductList items={list?.items ?? []} onToggleItem={onItemToggle} onEditItem={setEditableProduct} />,
    [list?.items, onItemToggle],
  );

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
            <BudgetOptimal {...budget} />
          </Modal>
        </Suspense>
      )}
      {list && (
        <div className="container pt-3">
          <div className="row">
            <Suspense fallback={<></>}>
              <div className="col-12 d-flex align-items-center justify-content-center">{ProductListHeader} </div>
              <div className="col-12 py-4">{BudgetFormWrapper}</div>
              {ProductListWrapper}
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

const InjectedProductListDashboard: FC = () => (
  <ProductListDashboard service={useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER)} />
);

export default InjectedProductListDashboard;
