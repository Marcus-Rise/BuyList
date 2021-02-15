import React from "react";
import { ProductPriorityEnum } from "./product-priority.enum";
import styles from "./product-priority-icon.module.scss";
import classNames from "classnames";

interface IProps {
  priority: ProductPriorityEnum | string;
  className?: string;
}

const ProductPriorityIcon: React.FC<IProps> = (props) => (
  <span
    className={classNames(styles.div, props.className, {
      [styles.danger]: props.priority === ProductPriorityEnum.high,
      [styles.secondary]: props.priority === ProductPriorityEnum.low,
      [styles.primary]: props.priority === ProductPriorityEnum.middle,
    })}
  />
);

export { ProductPriorityIcon };
