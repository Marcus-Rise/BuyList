import React from "react";
import { ProductPriorityEnum } from "./product-priority.enum";
import styles from "./product-priority-icon.module.scss";

interface IProps {
  priority: ProductPriorityEnum | string;
  className?: string;
}

const ProductPriorityIcon: React.FC<IProps> = (props) => {
  const classList: string[] = [styles.div, props.className ?? ""];

  switch (props.priority) {
    case ProductPriorityEnum.high:
      classList.push(styles.danger);
      break;
    case ProductPriorityEnum.low:
      classList.push(styles.secondary);
      break;
    default:
      classList.push(styles.primary);
      break;
  }

  return <div className={classList.join(" ")} />;
};

export { ProductPriorityIcon };
