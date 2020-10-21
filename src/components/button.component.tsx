import React, { ButtonHTMLAttributes, CSSProperties } from "react";
import styles from "./button.module.scss";

export enum ButtonColors {
  primary,
  accent,
}

interface IProps {
  onClick?: () => void;
  color?: ButtonColors;
  rounded?: boolean;
  className?: string;
  size?: string | number;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  styles?: CSSProperties;
}

export const Button: React.FC<IProps> = (props) => {
  const classList: string[] = [props.className ?? "", styles.button];

  switch (props.color) {
    case ButtonColors.primary:
      classList.push(styles.primary);
      break;
    case ButtonColors.accent:
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
      style={{ ...props.styles, fontSize: props.size }}
    >
      {props.children}
    </button>
  );
};
