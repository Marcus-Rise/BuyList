import React, { FormEvent, useState } from "react";
import { IProduct } from "./product.interface";
import { ProductPriorityEnum } from "./product-priority.enum";
import { InputText } from "../components/input-text.component";
import { InputNumber } from "../components/input-number.component";
import { Button, ButtonColors } from "../components/button.component";
import { Select, SelectOption } from "../components/select.component";

interface IProps extends Partial<IProduct> {
  onSubmit: (val: Partial<IProduct>) => void;
  onDelete: (uuid: string, title: string) => void;
}

export const ProductForm: React.FC<IProps> = (props) => {
  const [title, setTitle] = useState<string | undefined>(props.title);
  const [price, setPrice] = useState<number | undefined>(props.price);
  const [priority, setPriority] = useState<ProductPriorityEnum | string>(props.priority ?? ProductPriorityEnum.middle);

  const priorityVariants: SelectOption<string>[] = Object.values(ProductPriorityEnum).map((i) => ({
    title: i,
    val: i,
  }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title && Number(price) > 0) {
      props.onSubmit({ uuid: props.uuid, active: props.active, title, priority, price });
    }
  };

  return (
    <>
      <h3 style={{ textAlign: "center", maxWidth: "100%" }}>
        {props.uuid ? `Редактирование продукта` : "Добавление продукта"}
      </h3>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center mb-3">
            <InputText required onChange={setTitle} val={title} label={"Название"} styles={{ width: "100%" }} />
          </div>
          <div className="col-12 d-flex justify-content-center mb-3">
            <InputNumber required min={1} onChange={setPrice} label={"Цена"} val={price} styles={{ width: "100%" }} />
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
            <Button type={"submit"} color={ButtonColors.accent} styles={{ width: "100%" }}>
              Сохранить
            </Button>
          </div>
          {props.uuid && (
            <div className="col-12 d-flex justify-content-center mt-3">
              <Button
                onClick={() => props.uuid && props.title && props.onDelete(props.uuid, props.title)}
                type={"button"}
                color={ButtonColors.danger}
                styles={{ width: "100%" }}
              >
                Удалить
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};
