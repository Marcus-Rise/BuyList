import React from "react";
import styles from "./input-number.module.scss";

interface IProps {
  onChange: (val: number) => void;
  val?: number;
  label: string;
  size?: string | number;
}

export const InputNumber: React.FC<IProps> = (props) => {
  return (
    <input
      className={styles.input}
      type="number"
      value={props.val}
      onChange={(e) => props.onChange(Number(e.target.value))}
      placeholder={props.label}
      style={{ fontSize: props.size }}
    />
  );
};
