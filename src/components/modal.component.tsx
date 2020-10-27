import React, { useCallback, useEffect } from "react";
import styles from "./modal.module.scss";

interface IProps {
  onClose: () => void;
}

const Modal: React.FC<IProps> = (props) => {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    body.classList.add(styles.body);

    return () => {
      body.classList.remove(styles.body);
    };
  }, []);

  const onModalClick = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  return (
    <React.Fragment>
      <div className={`${styles.overlay}`} onClick={props.onClose}>
        <div className={styles.modal} onClick={onModalClick}>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export { Modal };
export default Modal;
