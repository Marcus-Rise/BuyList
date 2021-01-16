import type { FC } from "react";
import React from "react";
import styles from "./avatar.module.scss";

const Avatar: FC<{ alt: string; src: string; size?: string | number }> = (props) => {
  return <img src={props.src} alt={props.alt} height={props.size} width={props.size} className={styles.root} />;
};

export { Avatar };
