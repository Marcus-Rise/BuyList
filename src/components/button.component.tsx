import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

export enum Colors {
  primary,
  accent,
}

interface IProps {
  onClick?: () => void;
  color?: Colors;
  rounded?: boolean;
  className?: string;
  size?: string | number;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const Button: React.FC<IProps> = (props) => {
  const classList: string[] = [props.className ?? "", styles.button];

  switch (props.color) {
    case Colors.primary:
      classList.push(styles.primary);
      break;
    case Colors.accent:
      classList.push(styles.accent);
  }

  if (props.rounded) {
    classList.push(styles.rounded);
  }

  return (
    <button
      type={props.type ?? "button"}
      className={classList.join(" ")}
      onClick={props.onClick}
      style={{ fontSize: props.size }}
    >
      {props.children}
    </button>
  );
};
