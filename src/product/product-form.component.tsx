import type { FormEvent } from "react";
import React, { useCallback, useMemo, useState } from "react";
import type { IProduct } from "./product.interface";
import { ProductPriorityEnum } from "./product-priority.enum";
import { InputText } from "../components/input-text.component";
import { Button, ButtonColors } from "../components";
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

  const isEditMode = useMemo(() => !!props.title, [props.title]);
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

  const onDelete = useCallback(() => props.onDelete(props.title), [props]);

  const SelectWrapper = useMemo(
    () => (
      <Select
        onChange={setPriority}
        label={"Приоритет"}
        val={priority}
        items={priorityVariants}
        styles={{ width: "100%" }}
      />
    ),
    [priority, priorityVariants],
  );
  const SubmitButton = useMemo(
    () => (
      <Button type={"submit"} color={ButtonColors.primary} styles={{ width: "100%" }}>
        Сохранить
      </Button>
    ),
    [],
  );
  const InputPriceWrapper = useMemo(
    () => <InputPrice required min={1} onChange={setPrice} label={"Цена"} val={price} styles={{ width: "100%" }} />,
    [price],
  );
  const InputTextWrapper = useMemo(
    () => <InputText required onChange={setTitle} val={title} label={"Название"} styles={{ width: "100%" }} />,
    [title],
  );
  const Header = useMemo(
    () => (
      <h3 style={{ textAlign: "center", maxWidth: "100%" }}>
        {isEditMode ? `Редактирование продукта` : "Добавление продукта"}
      </h3>
    ),
    [isEditMode],
  );

  const DeleteButton = useMemo(
    () => (
      <>
        {isEditMode && (
          <div className="col-12 d-flex justify-content-center mt-3">
            <Button onClick={onDelete} type={"button"} color={ButtonColors.danger} styles={{ width: "100%" }}>
              Удалить
            </Button>
          </div>
        )}
      </>
    ),
    [isEditMode, onDelete],
  );

  return (
    <div>
      {Header}
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center mb-3">{InputTextWrapper}</div>
          <div className="col-12 d-flex justify-content-center mb-3">{InputPriceWrapper}</div>
          <div className="col-12 d-flex justify-content-center mb-3">{SelectWrapper}</div>
          <div className="col-12 d-flex justify-content-center">{SubmitButton}</div>
          {DeleteButton}
        </div>
      </form>
    </div>
  );
};

export { ProductForm };
export default ProductForm;
