import type { FormEvent } from "react";
import React, { useCallback, useMemo, useState } from "react";
import type { IProduct } from "./product.interface";
import { ProductPriorityEnum } from "./product-priority.enum";
import { InputText } from "../components/input-text.component";
import { Button, ButtonColors } from "../components/button.component";
import type { SelectOption } from "../components/select.component";
import { Select } from "../components/select.component";
import { InputPrice } from "../components/input-price.component";

interface IProps extends IProduct {
  onSubmit: (val: IProduct) => void;
  onDelete: (title: string) => void;
}

const ProductForm: React.FC<IProps> = (props) => {
  const [title, setTitle] = useState<string>(props.title);
  const [price, setPrice] = useState<number>(props.price);
  const [priority, setPriority] = useState<ProductPriorityEnum | string>(props.priority ?? ProductPriorityEnum.middle);

  const priorityVariants: SelectOption<string>[] = useMemo(
    () =>
      Object.values(ProductPriorityEnum).map((i) => ({
        title: i,
        val: i,
      })),
    [],
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (title && Number(price) > 0) {
        props.onSubmit({ active: props.active, title, priority, price });
      }
    },
    [props, title, priority, price],
  );

  const isEditMode = useMemo(() => !!props.title, [props.title]);

  const modalTitle = useMemo(() => (isEditMode ? `Редактирование продукта` : "Добавление продукта"), [isEditMode]);

  const onDelete = useCallback(() => props.onDelete(props.title), [props]);

  return (
    <>
      <h3 style={{ textAlign: "center", maxWidth: "100%" }}>{modalTitle}</h3>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center mb-3">
            <InputText required onChange={setTitle} val={title} label={"Название"} styles={{ width: "100%" }} />
          </div>
          <div className="col-12 d-flex justify-content-center mb-3">
            <InputPrice required min={1} onChange={setPrice} label={"Цена"} val={price} styles={{ width: "100%" }} />
          </div>
          <div className="col-12 d-flex justify-content-center mb-3">
            <Select
              onChange={setPriority}
              label={"Приоритет"}
              val={priority}
              items={priorityVariants}
              styles={{ width: "100%" }}
            />
          </div>
          <div className="col-12 d-flex justify-content-center">
            <Button type={"submit"} color={ButtonColors.primary} styles={{ width: "100%" }}>
              Сохранить
            </Button>
          </div>
          {isEditMode && (
            <div className="col-12 d-flex justify-content-center mt-3">
              <Button onClick={onDelete} type={"button"} color={ButtonColors.danger} styles={{ width: "100%" }}>
                Удалить
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export { ProductForm };
export default ProductForm;
