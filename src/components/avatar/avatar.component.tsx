import type { FC, ImgHTMLAttributes } from "react";
import React from "react";
import styles from "./avatar.module.scss";
import classNames from "classnames";

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

interface IProps extends ImageProps {
  size?: string | number;
}

const Avatar: FC<IProps> = (props) => (
  <img
    src={props.src}
    alt={props.alt}
    height={props.size}
    width={props.size}
    className={classNames(styles.root, props.className)}
  />
);

export { Avatar };
