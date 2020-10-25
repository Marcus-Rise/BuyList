import type { CSSProperties } from "react";
import React from "react";
import styles from "./input-number.module.scss";
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
        onChange={(val) => props.onChange(Number(val))}
        min={props.min}
        max={props.max}
        required={props.required}
      />
    </div>
  );
};