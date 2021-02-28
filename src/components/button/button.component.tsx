import type { ButtonHTMLAttributes, CSSProperties, FC } from "react";
import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

enum ButtonColors {
  primary,
  accent,
  danger,
}

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface IProps {
  color?: ButtonColors;
  rounded?: boolean;
  flat?: boolean;
  size?: string | number;
  styles?: CSSProperties;
}

const Button: FC<IButtonProps & IProps> = (props) => {
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
      title={props.title}
    >
      {props.children}
    </button>
  );
};

export { Button, ButtonColors };
