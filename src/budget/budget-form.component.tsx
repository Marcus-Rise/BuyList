import React, { FormEvent, useState } from "react";
import { InputNumber } from "../components/input-number.component";
import { Button, ButtonColors } from "../components/button.component";

interface IProps {
  value?: number;
  onSubmit: (val: number) => void;
}

export const BudgetForm: React.FC<IProps> = (props) => {
  const [value, setValue] = useState<number | undefined>(props.value);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const number = Number(value);

    if (number > 0) {
      props.onSubmit(number);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row justify-content-between align-items-center">
        <div className="col-7">
          <InputNumber
            val={props.value}
            label={"Сумма бюджета"}
            onChange={setValue}
            styles={{
              textAlign: "center",
            }}
            noLabel
            required
            min={1}
          />
        </div>
        <div className="col-auto">
          <Button type={"submit"} color={ButtonColors.accent}>
            Посчитать
          </Button>
        </div>
      </div>
    </form>
  );
};