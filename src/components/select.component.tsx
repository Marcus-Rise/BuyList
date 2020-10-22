import React, { CSSProperties } from "react";
import styles from "./select.module.scss";

export interface SelectOption<T> {
  title: string;
  val: T;
}

interface IProps<T> {
  items: SelectOption<T>[];
  label: string;
  val?: T;
  onChange: (val: T) => void;
  styles?: CSSProperties;
}

export const Select: React.FC<IProps<string>> = (props) => {
  return (
    <div style={{ ...props.styles }}>
      <label className={styles.label} htmlFor={props.label}>
        {props.label}
      </label>
      <div className={styles.select}>
        <select id={props.label} value={props.val} onChange={(e) => props.onChange(e.target.value)}>
          <option disabled>{props.label}</option>

          {props.items.map((i) => (
            <option key={i.title} value={i.val}>
              {i.title}
            </option>
          ))}
        </select>
        <span className="focus" />
      </div>
    </div>
  );
};
