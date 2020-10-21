import React, { CSSProperties } from "react";
import styles from "./input-text.module.scss";

interface IProps {
  onChange: (val: string) => void;
  val?: string;
  label: string;
  size?: string | number;
  style?: CSSProperties;
}

export const InputText: React.FC<IProps> = (props) => {
  return (
    <input
      className={styles.input}
      type="text"
      value={props.val}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.label}
      style={{ ...props.style, fontSize: props.size }}
    />
  );
};
