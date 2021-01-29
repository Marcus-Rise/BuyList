import type { ButtonHTMLAttributes, CSSProperties, FC } from "react";
import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

enum ButtonColors {
  primary,
  accent,
  danger,
}

const Button: FC<{
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: ButtonColors;
  rounded?: boolean;
  className?: string;
  size?: string | number;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  styles?: CSSProperties;
  flat?: boolean;
}> = (props) => {
  return (
    <button
      type={props.type ?? "button"}
      className={classNames(props.className, styles.button, {
        [styles.primary]: props.color === ButtonColors.primary,
        [styles.accent]: props.color === ButtonColors.accent,
        [styles.danger]: props.color === ButtonColors.danger,
        [styles.flat]: props.flat,
        [styles.rounded]: props.rounded,
      })}
      onClick={props.onClick}
      style={{ ...props.styles, fontSize: props.size }}
    >
      {props.children}
    </button>
  );
};

export { Button, ButtonColors };
