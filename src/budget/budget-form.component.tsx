import type { FormEvent } from "react";
import React, { useMemo, useState } from "react";
import { Button, ButtonColors } from "../components";
import { InputPrice } from "../components/input-price.component";

interface IProps {
  value: number;
  onSubmit: (val: number) => void;
}

const BudgetForm: React.FC<IProps> = (props) => {
  const [value, setValue] = useState<number>(props.value);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const number = Number(value);

    if (number > 0) {
      props.onSubmit(number);
    }
  };

  const SubmitButton = useMemo(
    () => (
      <Button type={"submit"} color={ButtonColors.primary}>
        Посчитать
      </Button>
    ),
    [],
  );

  const InputPriceWrapper = useMemo(
    () => (
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
    ),
    [value],
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="row justify-content-between align-items-center">
        <div className="col-7">{InputPriceWrapper}</div>
        <div className="col-auto">{SubmitButton}</div>
      </div>
    </form>
  );
};

export { BudgetForm };
export default BudgetForm;
