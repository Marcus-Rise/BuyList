import type { ButtonHTMLAttributes, CSSProperties, FC } from "react";
import React from "react";
import styles from "./button.module.scss";

export enum ButtonColors {
  primary,
  accent,
  danger,
}

interface IProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: ButtonColors;
  rounded?: boolean;
  className?: string;
  size?: string | number;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  styles?: CSSProperties;
}

export const Button: FC<IProps> = (props) => {
  const classList: string[] = [props.className ?? "", styles.button];

  switch (props.color) {
    case ButtonColors.primary:
      classList.push(styles.primary);
      break;
    case ButtonColors.accent:
      classList.push(styles.accent);
      break;
    case ButtonColors.danger:
      classList.push(styles.danger);
      break;
  }

  if (props.rounded) {
    classList.push(styles.rounded);
  }

  return (
    <button
      type={props.type ?? "button"}
      className={classList.join(" ")}
      onClick={props.onClick}
      style={{ ...props.styles, fontSize: props.size }}
    >
      {props.children}
    </button>
  );
};
