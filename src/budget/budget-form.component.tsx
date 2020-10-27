import type { FormEvent } from "react";
import React, { useCallback, useState } from "react";
import { Button, ButtonColors } from "../components/button.component";
import { InputPrice } from "../components/input-price.component";

interface IProps {
  value: number;
  onSubmit: (val: number) => void;
}

const BudgetForm: React.FC<IProps> = (props) => {
  const [value, setValue] = useState<number>(props.value);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const number = Number(value);

      if (number > 0) {
        props.onSubmit(number);
      }
    },
    [value, props],
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="row justify-content-between align-items-center">
        <div className="col-7">
          <InputPrice
            val={value}
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
          <Button type={"submit"} color={ButtonColors.primary}>
            Посчитать
          </Button>
        </div>
      </div>
    </form>
  );
};

export { BudgetForm };
export default BudgetForm;
