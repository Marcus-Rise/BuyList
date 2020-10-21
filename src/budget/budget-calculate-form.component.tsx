import React, { FormEvent, useState } from "react";
import { InputNumber } from "../components/input-number.component";
import { Button, Colors } from "../components/button.component";

interface IProps {
  value?: number;
  onSubmit: (val: number) => void;
}

export const BudgetCalculateForm: React.FC<IProps> = (props) => {
  const [value, setValue] = useState<number | undefined>(props.value);

  const onSubmit = (e: FormEvent) => {
    const number = Number(value);

    if (number > 0) {
      e.preventDefault();
      props.onSubmit(number);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row justify-content-between align-items-center">
        <div className="col-7">
          <InputNumber val={props.value} label={"Сумма бюджета"} size={"1.1rem"} onChange={setValue} />
        </div>
        <div className="col-auto">
          <Button type={"submit"} color={Colors.accent} size={"1.1rem"}>
            Посчитать
          </Button>
        </div>
      </div>
    </form>
  );
};
