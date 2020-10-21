import React, { FormEvent, useState } from "react";
import { IProduct } from "./product.interface";
import { ProductPriorityEnum } from "./product-priority.enum";
import { InputText } from "../components/input-text.component";
import { InputNumber } from "../components/input-number.component";
import { Button, ButtonColors } from "../components/button.component";

interface IProps extends Partial<IProduct> {
  onSubmit: (val: Partial<IProduct>) => void;
}

export const ProductForm: React.FC<IProps> = (props) => {
  const [title, setTitle] = useState<string | undefined>(props.title);
  const [price, setPrice] = useState<number | undefined>(props.price);
  const [priority] = useState<ProductPriorityEnum | undefined>(props.priority);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    props.onSubmit({ uuid: props.uuid, active: props.active, title, priority, price });
  };

  return (
    <>
      <h3 style={{ textAlign: "center", maxWidth: "100%" }}>
        {props.uuid ? `Редактирование продукта` : "Добавление продукта"}
      </h3>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center mb-3">
            <InputText onChange={setTitle} val={title} label={"Название"} />
          </div>
          <div className="col-12 d-flex justify-content-center mb-3">
            <InputNumber onChange={setPrice} label={"Цена"} val={price} />
          </div>
          <div className="col-12 d-flex justify-content-center">
            <Button type={"submit"} color={ButtonColors.accent}>
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
