import React from "react";
import styles from "./modal.module.scss";

interface IProps {
  onClose: () => void;
}

export const Modal: React.FC<IProps> = (props) => {
  return (
    <React.Fragment>
      <div className={`${styles.overlay}`} onClick={props.onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};
