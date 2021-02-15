import type { CSSProperties } from "react";
import React from "react";
import styles from "./input-price.module.scss";
import CurrencyInput from "react-currency-input-field";

interface IProps {
  onChange: (val: number) => void;
  val?: number;
  label: string;
  size?: string | number;
  styles?: CSSProperties;
  noLabel?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
}

export const InputPrice: React.FC<IProps> = (props) => {
  const onChange = (val?: string) => props.onChange(Number(val));

  return (
    <div className={styles.input} style={{ ...props.styles, fontSize: props.size }}>
      {!props.noLabel && <label htmlFor={props.label}>{props.label}</label>}
      <CurrencyInput
        id={props.label}
        name={props.label}
        placeholder={`${props.label}, ₽`}
        prefix={"₽ "}
        value={props.val || ""}
        defaultValue={1000}
        allowDecimals={true}
        decimalsLimit={2}
        onChange={onChange}
        min={props.min}
        max={props.max}
        required={props.required}
      />
    </div>
  );
};
