import type { FC } from "react";
import styles from "./product-list-page-title.module.scss";

const ProductListPageTitle: FC = (props) => {
  return <h2 className={styles.title}>{props.children}</h2>;
};

export { ProductListPageTitle };
