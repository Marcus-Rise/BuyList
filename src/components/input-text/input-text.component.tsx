import type { CSSProperties } from "react";
import React from "react";
import styles from "./input-text.module.scss";

interface IProps {
  onChange: (val: string) => void;
  val?: string;
  label: string;
  size?: string | number;
  styles?: CSSProperties;
  required?: boolean;
  min?: number;
}

export const InputText: React.FC<IProps> = (props) => {
  return (
    <div className={styles.input} style={{ ...props.styles, fontSize: props.size }}>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        id={props.label}
        className={styles.input}
        type="text"
        value={props.val}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.label}
        required={props.required}
        minLength={props.min}
        autoComplete={"off"}
      />
    </div>
  );
};
