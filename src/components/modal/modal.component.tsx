import React, { useCallback, useEffect } from "react";
import styles from "./modal.module.scss";
import { Overlay } from "../overlay";
import classNames from "classnames";

const Modal: React.FC<{
  onClose: () => void;
  splash?: boolean;
}> = (props) => {
  const onModalClick = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        props.onClose();
      }
    };

    const event = "keydown";
    document.addEventListener(event, close);

    return () => document.removeEventListener(event, close);
  });

  return (
    <Overlay onClose={props.onClose}>
      <div className={classNames(styles.modal, { [styles.splash]: props.splash })} onClick={onModalClick}>
        {props.children}
      </div>
    </Overlay>
  );
};

export { Modal };
