import React from "react";
import styles from "./product-list-item-toggle-button.module.scss";
import { FaCheck } from "react-icons/fa";
import { Button } from "../components/button.component";

interface IProps {
  active: boolean;
  onClick: () => void;
}

export const ProductListItemToggleButton: React.FC<IProps> = (props) => {
  return (
    <Button
      className={`${styles.toggleButton}`}
      styles={{ padding: ".5rem" }}
      rounded
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
    >
      <FaCheck style={props.active ? { color: "white" } : {}} />
    </Button>
  );
};
