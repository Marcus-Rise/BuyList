import React from "react";
import { Button, ButtonColors } from "./button";
import PlusIcon from "../assets/icons/plus_icon.svg";
import styles from "./button-add.module.scss";

interface IProps {
  onClick: () => void;
  className?: string;
}

const ButtonAdd: React.FC<IProps> = (props) => {
  return (
    <Button
      className={`${props.className} ${styles.button}`}
      rounded
      color={ButtonColors.primary}
      onClick={props.onClick}
    >
      <img alt={"add"} src={PlusIcon} />
    </Button>
  );
};

export { ButtonAdd };
export default ButtonAdd;
