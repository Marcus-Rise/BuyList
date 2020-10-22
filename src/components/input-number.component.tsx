import React, { CSSProperties } from "react";
import styles from "./input-number.module.scss";

interface IProps {
  onChange: (val: number) => void;
  val?: number;
  label: string;
  size?: string | number;
  styles?: CSSProperties;
  noLabel?: boolean;
}

export const InputNumber: React.FC<IProps> = (props) => {
  return (
    <div className={styles.input}>
      {!props.noLabel && <label htmlFor={props.label}>{props.label}</label>}
      <input
        id={props.label}
        type="number"
        value={props.val}
        onChange={(e) => props.onChange(Number(e.target.value))}
        placeholder={props.label}
        style={{ ...props.styles, fontSize: props.size }}
      />
    </div>
  );
};
