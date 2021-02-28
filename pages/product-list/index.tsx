import type { FC } from "react";
import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useInject } from "../../src/ioc";
import type { IProductListService } from "../../src/product-list";
import { PRODUCT_LIST_SERVICE_PROVIDER, ProductList } from "../../src/product-list";
import type { IProduct } from "../../src/product";
import { ProductPriorityEnum } from "../../src/product";
import type { IBudget } from "../../src/budget";
import { BudgetForm } from "../../src/budget";
import { ButtonAdd } from "../../src/components";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

const Modal = lazy(() => import("../../src/components/modal"));
const ProductForm = lazy(() => import("../../src/product/product-form/product-form.component"));
const BudgetOptimal = lazy(() => import("../../src/budget/budget-optimal.component"));

const ProductListDashboard: FC<{
  service: IProductListService;
}> = ({ service }) => {
  const router = useRouter();
  const [editableProduct, setEditableProduct] = useState<IProduct | null>(null);
  const [budget, setBudget] = useState<IBudget | null>(null);

  const load = useCallback(async () => {
    const id = router.query.id;

    if (typeof id === "string" && Number(id) !== service.selectedList?.id) {
      await service.selectList({ id: Number(id) });
    } else if (typeof id !== "string") {
      await service.selectList();

      await router.replace(`/product-list?id=${service.selectedList?.id}`);
    }
  }, [router, service]);

  useEffect(() => {
    load();
  }, [load]);

  const onSaveItem = useCallback(
    (item: IProduct): void => {
      service.saveProduct({ id: service.selectedList?.id }, item);

      setEditableProduct(null);
    },
    [service],
  );

  const onItemToggle = useCallback(
    (itemTitle: string): void => {
      service.toggleProduct({ id: service.selectedList?.id }, itemTitle);
    },
    [service],
  );

  const onBudgetCalculate = useCallback(
    (val: number): void => {
      service.calculateListBudget({ id: service.selectedList?.id }, val).then(setBudget);
    },
    [service],
  );

  const onDelete = useCallback(
    (title: string): void => {
      const isAllow = confirm(`Вы уверены, что хотите удалить продукт "${title}"?`);

      if (isAllow) {
        setEditableProduct(null);
        service.deleteProduct({ id: service.selectedList?.id }, title);
      }
    },
    [service],
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
        <h2>{service.selectedList?.title}</h2>
        <ButtonAdd className="ml-3" onClick={onAddItem} />
      </>
    ),
    [service.selectedList?.title, onAddItem],
  );

  const BudgetFormWrapper = useMemo(() => <BudgetForm value={0} onSubmit={onBudgetCalculate} />, [onBudgetCalculate]);

  const ProductListWrapper = useMemo(
    () => (
      <ProductList
        items={service.selectedList?.items ?? []}
        onToggleItem={onItemToggle}
        onEditItem={setEditableProduct}
      />
    ),
    [service.selectedList?.items, onItemToggle],
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
      {service.selectedList && (
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

const ObservedProductListDashboard = observer(ProductListDashboard);

const InjectedProductListDashboard: FC = () => (
  <ObservedProductListDashboard service={useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER)} />
);

export default InjectedProductListDashboard;
