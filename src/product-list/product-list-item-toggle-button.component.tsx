import React from "react";
import styles from "./product-list-item-toggle-button.module.scss";
import InActiveIcon from "../assets/icons/in_active.svg";
import { Button } from "../components";

interface IProps {
  active: boolean;
  onClick: () => void;
}

const ProductListItemToggleButton: React.FC<IProps> = (props) => {
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onClick();
  };

  return (
    <Button
      className={`${styles.toggleButton} ${props.active ? styles.inActive : styles.active}`}
      styles={{ padding: ".5rem" }}
      rounded
      onClick={onClick}
    >
      {!props.active && <img alt={"in_active"} className={styles.img} src={InActiveIcon} />}
    </Button>
  );
};

export { ProductListItemToggleButton };
export default ProductListItemToggleButton;
