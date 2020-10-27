import type { FormEvent } from "react";
import React, { useMemo, useState } from "react";
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

  const isEditMode = !!props.title;
  const modalTitle = isEditMode ? `Редактирование продукта` : "Добавление продукта";
  const priorityVariants: SelectOption<string>[] = useMemo(
    () =>
      Object.values(ProductPriorityEnum).map((i) => ({
        title: i,
        val: i,
      })),
    [],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title && Number(price) > 0) {
      props.onSubmit({ active: props.active, title, priority, price });
    }
  };

  const onDelete = () => props.onDelete(props.title);

  const SubmitButton = useMemo(
    () => (
      <Button type={"submit"} color={ButtonColors.primary} styles={{ width: "100%" }}>
        Сохранить
      </Button>
    ),
    [],
  );

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
          <div className="col-12 d-flex justify-content-center">{SubmitButton}</div>
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
