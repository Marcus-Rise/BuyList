import React from "react";
import styles from "./product-list-item-toggle-button.module.scss";
import InActiveIcon from "../assets/icons/in_active.svg";
import { Button } from "../components/button.component";

interface IProps {
  active: boolean;
  onClick: () => void;
}

export const ProductListItemToggleButton: React.FC<IProps> = (props) => {
  return (
    <Button
      className={`${styles.toggleButton} ${!props.active ? styles.inActive : styles.active}`}
      styles={{ padding: ".5rem" }}
      rounded
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
    >
      {props.active && <img alt={"in_active"} className={styles.img} src={InActiveIcon} />}
    </Button>
  );
};
